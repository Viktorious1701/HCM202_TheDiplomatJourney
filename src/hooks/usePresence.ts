import { useEffect, useState } from 'react';
import { initPresence } from '@/services/leaderboardService';

export function usePresence(playerId: string | undefined) {
  const [online, setOnline] = useState<string[]>([]);

  useEffect(() => {
    if (!playerId) return;
    const dispose = initPresence(playerId, setOnline);
    return dispose;
  }, [playerId]);

  return online;
}
