import { useEffect, useRef, useState } from 'react';
import { joinRoom, sendProgress, sendChat, sendTyping } from '@/services/leaderboardService';
import type { ProgressUpdate, ChatMessage, TypingEvent } from '@/types';
import { useGameStore } from '@/stores/gameStore';

interface UseRoomOptions {
  roomId: string | undefined;
  playerId: string | undefined;
  playerName: string | undefined;
}

export function useRoomChannel({ roomId, playerId, playerName }: UseRoomOptions) {
  const [online, setOnline] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, ProgressUpdate>>({});
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [typingMap, setTypingMap] = useState<Record<string, { name?: string; ts: number }>>({});
  const disposeRef = useRef<(() => void) | undefined>(undefined);

  const game = useGameStore();

  // Periodically broadcast progress (every 2s while playing)
  useEffect(() => {
    if (!roomId || !playerId || !playerName) return;
    const interval = setInterval(() => {
      if (!game.startTime) return;
      const update: ProgressUpdate = {
        playerId,
        playerName,
        node: game.currentNodeKey,
        globalSupport: game.globalSupport,
        reputation: game.reputation,
        completedMissions: game.completedMissions.length,
        elapsed: game.startTime ? (Date.now() - game.startTime) / 1000 : 0,
        ts: Date.now(),
      };
      sendProgress(roomId, update);
    }, 2000);
    return () => clearInterval(interval);
  }, [roomId, playerId, playerName, game]);

  // Join room channel
  useEffect(() => {
    if (!roomId || !playerId || !playerName) return;
    disposeRef.current?.();
    disposeRef.current = joinRoom(roomId, playerId, playerName, {
  onPresence: (ids) => setOnline(ids),
      onProgress: (p) => setProgress(prev => ({ ...prev, [p.playerId]: p })),
      onChat: (m) => setChat(prev => [...prev.slice(-199), m]),
      onSystem: (text) => setChat(prev => [...prev.slice(-199), { roomId, playerId: 'system', content: text, ts: Date.now(), system: true }]),
      onTyping: (t: TypingEvent) => {
        if (t.playerId === playerId) return; // ignore own echoed typing
        setTypingMap(prev => ({ ...prev, [t.playerId]: { name: t.playerName, ts: Date.now() } }));
      }
    });
    return () => disposeRef.current?.();
  }, [roomId, playerId, playerName]);

  const postChat = (content: string) => {
    if (!roomId || !playerId) return;
    const message: ChatMessage = { roomId, playerId, playerName, content, ts: Date.now() };
    // Optimistic echo
    setChat(prev => [...prev.slice(-199), message]);
    sendChat(roomId, message);
    // Stop typing indicator after send
    sendTyping(roomId, { playerId, playerName, typing: false, ts: Date.now() });
  };

  // Public method to signal typing start/stop
  const setTyping = (typing: boolean) => {
    if (!roomId || !playerId) return;
    sendTyping(roomId, { playerId, playerName, typing, ts: Date.now() });
  };

  // Derive active typing users (expire after 4s)
  const typingDetails = Object.entries(typingMap)
    .filter(([, v]) => Date.now() - v.ts < 4000)
    .map(([id, v]) => ({ playerId: id, playerName: v.name || id }));
  const typingUsers = typingDetails.map(t => t.playerName);

  return { online, progress: Object.values(progress), chat, postChat, setTyping, typingUsers, typingDetails };
}
