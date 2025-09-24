import { useGameStore } from '@/stores/gameStore';
import { useRoomChannel } from '@/hooks/useRoomChannel';
import clsx from 'clsx';

// This new, reusable component encapsulates the logic for displaying the live session ranking.
export function LiveSessionRanking() {
  const roomId = useGameStore(s => s.roomId);
  const playerId = useGameStore(s => s.playerId);
  const playerName = useGameStore(s => s.playerName);
  const { progress } = useRoomChannel({ roomId: roomId || undefined, playerId, playerName });

  const liveLeaderboard = [...progress]
    .map(p => ({
      ...p,
      finalScore: p.globalSupport + (p.reputation * 3),
    }))
    .sort((a, b) => b.finalScore - a.finalScore || a.elapsed - b.elapsed);

  return (
    <div className="max-h-40 overflow-auto rounded border border-border/60 bg-muted/30 text-[11px] divide-y divide-border/40">
      {liveLeaderboard.length === 0 && <div className="p-2 text-muted-foreground">Waiting for players...</div>}
      {liveLeaderboard.map((p, i) => {
        const self = p.playerId === playerId;
        return (
          <div key={p.playerId} className={clsx('grid grid-cols-12 items-center px-2 py-1 gap-1', self && 'bg-primary/15 font-medium')}>
            <span className="col-span-1 text-right font-mono text-[10px] opacity-60">{i + 1}</span>
            <span className="col-span-5 truncate" title={p.playerName}>{p.playerName}</span>
            <span className="col-span-3 text-right tabular-nums">{p.finalScore}</span>
            <span className="col-span-3 text-right tabular-nums" title={`${p.elapsed.toFixed(2)}s`}>{p.elapsed.toFixed(0)}s</span>
          </div>
        );
      })}
    </div>
  );
}