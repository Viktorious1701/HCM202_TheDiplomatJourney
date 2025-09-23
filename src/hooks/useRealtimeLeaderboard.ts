import { useEffect, useState } from 'react';
import type { LeaderboardEntry } from '@/types';
import { getLeaderboard, subscribeLeaderboard, supabase, BROADCAST_CHANNEL } from '@/services/leaderboardService';

export function useRealtimeLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeTable = () => {};
    let broadcastChan: ReturnType<typeof supabase.channel> | null = null;

    (async () => {
      // Fetch the initial state of the leaderboard when the component mounts.
      const initial = await getLeaderboard();
      setEntries(initial);
      setLoading(false);

      // Subscribe to database changes. This is the reliable, eventually-consistent channel.
      // Any insert, update, or delete on the leaderboard table will trigger this.
      unsubscribeTable = subscribeLeaderboard(setEntries);

      // Subscribe to the broadcast channel for instant, optimistic updates.
      // This listens for the 'new-score' event sent by the addScore function.
      broadcastChan = supabase
        .channel(BROADCAST_CHANNEL)
        .on('broadcast', { event: 'new-score' }, (payload) => {
          const newEntry = payload.payload as LeaderboardEntry;
          // Add the new score to the list, sort, and trim to the top 10.
          setEntries(prev => {
            const exists = prev.some(e => e.name === newEntry.name && e.score === newEntry.score && e.time === newEntry.time);
            if (exists) return prev; // Avoid duplicates if both events arrive close together.
            return [...prev, newEntry]
              .sort((a, b) => b.score - a.score || a.time - b.time)
              .slice(0, 10);
          });
        })
        .subscribe();
    })();

    // Clean up subscriptions when the component unmounts.
    return () => {
      unsubscribeTable();
      if (broadcastChan) supabase.removeChannel(broadcastChan);
    };
  }, []);

  return { entries, loading };
}
