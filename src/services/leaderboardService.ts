// path: the-diplomats-journey/src/services/leaderboardService.ts
import { createClient, type RealtimeChannel } from '@supabase/supabase-js';
import type { LeaderboardEntry, ProgressUpdate, ChatMessage, TypingEvent } from '../types';

// Environment variables (must start with VITE_ for Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LEADERBOARD_TABLE = 'leaderboard';
const BROADCAST_CHANNEL = 'leaderboard-broadcast';

// Lazy singleton broadcast channel (for low latency optimistic updates)
let broadcastChannel: RealtimeChannel | null = null;
function getBroadcastChannel() {
  if (!broadcastChannel) {
    broadcastChannel = supabase
      .channel(BROADCAST_CHANNEL)
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') console.warn('[Supabase] Broadcast channel error');
      });
  }
  return broadcastChannel;
}

// Fetch top 10 (score desc, time asc)
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const { data, error } = await supabase
    .from(LEADERBOARD_TABLE)
    .select('name, score, time')
    .order('score', { ascending: false })
    .order('time', { ascending: true })
    .limit(10);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
  return data || [];
};

// Subscribe to realtime table changes (insert/update/delete)
export const subscribeLeaderboard = (onChange: (entries: LeaderboardEntry[]) => void): (() => void) => {
  const channel = supabase
    .channel('public:leaderboard')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: LEADERBOARD_TABLE },
      async () => {
        const data = await getLeaderboard();
        onChange(data);
      }
    )
    .subscribe((status) => {
      if (status === 'CHANNEL_ERROR') console.warn('[Supabase] Table realtime channel error');
    });

  return () => {
    supabase.removeChannel(channel);
  };
};

// Insert a score and broadcast for optimistic UI updates
export const addScore = async (newEntry: LeaderboardEntry): Promise<LeaderboardEntry[] | null> => {
  const { error } = await supabase
    .from(LEADERBOARD_TABLE)
    .insert([newEntry]);

  if (error) {
    console.error('Error adding score:', error);
    return null;
  }

  // Fire a broadcast so listeners can merge without waiting for DB echo
  getBroadcastChannel().send({
    type: 'broadcast',
    event: 'new-score',
    payload: newEntry,
  });

  return await getLeaderboard();
};

// Presence channel: track currently online player IDs
export const initPresence = (
  playerId: string,
  onSync: (onlineIds: string[]) => void
): (() => void) => {
  const presenceChannel = supabase.channel('online-players', {
    config: { presence: { key: playerId } },
  });

  presenceChannel.on('presence', { event: 'sync' }, () => {
    const state = presenceChannel.presenceState();
    onSync(Object.keys(state));
  });

  presenceChannel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await presenceChannel.track({ joinedAt: Date.now() });
    } else if (status === 'CHANNEL_ERROR') {
      console.warn('[Supabase] Presence channel error');
    }
  });

  return () => {
    supabase.removeChannel(presenceChannel);
  };
};

export { supabase, BROADCAST_CHANNEL };

// ---------------- Multiplayer Extensions ----------------

// Room channel pattern: room:<roomId>
// We will use broadcast events: progress-update, chat-message, system

export function getRoomChannel(roomId: string) {
  return supabase.channel(`room:${roomId}`, { config: { presence: { key: 'anonymous' } } });
}

// Cache for active room channels so that sendChat/sendProgress use the subscribed channel
const roomChannelCache: Record<string, RealtimeChannel> = {};

// Join a room with presence (playerId & name)
export function joinRoom(
  roomId: string,
  playerId: string,
  playerName: string,
  handlers: {
    onProgress?: (p: ProgressUpdate) => void;
    onChat?: (m: ChatMessage) => void;
    onSystem?: (text: string) => void;
    onPresence?: (online: string[]) => void;
    onTyping?: (t: TypingEvent) => void;
  } = {}
) {
  const channel = supabase.channel(`room:${roomId}`, {
    config: { presence: { key: playerId } },
  });
  roomChannelCache[roomId] = channel;

  channel
    .on('broadcast', { event: 'progress-update' }, (payload) => {
      handlers.onProgress?.(payload.payload as ProgressUpdate);
    })
    .on('broadcast', { event: 'chat-message' }, (payload) => {
      handlers.onChat?.(payload.payload as ChatMessage);
    })
    .on('broadcast', { event: 'system' }, (payload) => {
      handlers.onSystem?.(payload.payload as string);
    })
    .on('broadcast', { event: 'typing' }, (payload) => {
      handlers.onTyping?.(payload.payload as TypingEvent);
    })
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const displayList = Object.entries(state).map(([id, metas]: any) => {
        const meta = Array.isArray(metas) ? metas[0] : undefined;
        return meta?.name || id;
      });
      handlers.onPresence?.(displayList);
    });

  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
  await channel.track({ name: playerName, joinedAt: Date.now() });
      channel.send({ type: 'broadcast', event: 'system', payload: `${playerName} joined` });
    }
  });

  return () => supabase.removeChannel(channel);
}

export function sendProgress(roomId: string, update: ProgressUpdate) {
  const chan = roomChannelCache[roomId];
  if (!chan) return; // not joined
  chan.send({
    type: 'broadcast',
    event: 'progress-update',
    payload: update,
  });
}

export function sendChat(roomId: string, message: ChatMessage) {
  const chan = roomChannelCache[roomId];
  if (!chan) return; // not joined
  chan.send({
    type: 'broadcast',
    event: 'chat-message',
    payload: message,
  });
}

export function sendSystem(roomId: string, text: string) {
  const chan = roomChannelCache[roomId];
  if (!chan) return; // not joined
  chan.send({
    type: 'broadcast',
    event: 'system',
    payload: text,
  });
}

export function sendTyping(roomId: string, event: TypingEvent) {
  const chan = roomChannelCache[roomId];
  if (!chan) return;
  chan.send({
    type: 'broadcast',
    event: 'typing',
    payload: event,
  });
}