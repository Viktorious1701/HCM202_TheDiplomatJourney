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
      const initial = await getLeaderboard();
      setEntries(initial);
      setLoading(false);

      unsubscribeTable = subscribeLeaderboard(setEntries);

      broadcastChan = supabase
        .channel(BROADCAST_CHANNEL)
        .on('broadcast', { event: 'new-score' }, (payload) => {
          const newEntry = payload.payload as LeaderboardEntry;
          setEntries(prev => {
            const exists = prev.some(e => e.name === newEntry.name && e.score === newEntry.score && e.time === newEntry.time);
            if (exists) return prev;
            return [...prev, newEntry]
              .sort((a, b) => b.score - a.score || a.time - b.time)
              .slice(0, 10);
          });
        })
        .subscribe();
    })();

    return () => {
      unsubscribeTable();
      if (broadcastChan) supabase.removeChannel(broadcastChan);
    };
  }, []);

  return { entries, loading };
}
