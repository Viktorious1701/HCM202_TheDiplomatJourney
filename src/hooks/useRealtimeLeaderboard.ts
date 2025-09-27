import { useEffect, useState } from 'react';
import type { LeaderboardEntry } from '@/types';
import { getLeaderboard, subscribeLeaderboard, supabase, BROADCAST_CHANNEL } from '@/services/leaderboardService';

export function useRealtimeLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribeTable = () => {};
    let broadcastChan: ReturnType<typeof supabase.channel> | null = null;

    (async () => {
      setLoading(true);
      // Call the updated service function and handle the new error state.
      const { data: initialData, error: initialError } = await getLeaderboard();
      
      if (initialError) {
        setError(initialError.message);
        setEntries([]);
      } else {
        setEntries(initialData);
        setError(null);
      }
      setLoading(false);

      // The subscription now triggers a refetch that also handles errors.
      unsubscribeTable = subscribeLeaderboard(async () => {
        const { data, error: refetchError } = await getLeaderboard();
        if (refetchError) {
          setError(refetchError.message);
        } else if (data) {
          setEntries(data);
          setError(null); // Clear previous errors on a successful fetch.
        }
      });

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

  return { entries, loading, error };
}
