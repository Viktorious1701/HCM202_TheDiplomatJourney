import { useGameStore } from '@/stores/gameStore';
import { useRoomChannel } from '@/hooks/useRoomChannel';
import { useRealtimeLeaderboard } from '@/hooks/useRealtimeLeaderboard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import clsx from 'clsx';

// This component is responsible for displaying all score-related information.
export function LeaderboardHUD() {
  const roomId = useGameStore(s => s.roomId);
  const playerId = useGameStore(s => s.playerId);
  const playerName = useGameStore(s => s.playerName);
  const globalSupport = useGameStore(s => s.globalSupport);
  const reputation = useGameStore(s => s.reputation);
  
  // These hooks provide the real-time data needed for the leaderboards.
  const { progress } = useRoomChannel({ roomId: roomId || undefined, playerId, playerName });
  const { entries: leaderboard } = useRealtimeLeaderboard();

  // Calculate the live leaderboard based on in-progress scores.
  const liveLeaderboard = [...progress]
    .map(p => ({
      ...p,
      finalScore: p.globalSupport + (p.reputation * 3),
    }))
    .sort((a, b) => b.finalScore - a.finalScore || a.elapsed - b.elapsed);

  return (
    <Card className="shadow-lg border-border/70 bg-background/85 backdrop-blur-sm">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm font-semibold">Live Game Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <section>
          <h4 className="font-semibold text-xs mb-1 tracking-wide text-muted-foreground">Your Current Score</h4>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded border border-border/60 bg-muted/30 text-center">
              <span className="text-muted-foreground block">Global Support</span>
              <span className="font-bold text-lg">{globalSupport}</span>
            </div>
            <div className="p-2 rounded border border-border/60 bg-muted/30 text-center">
              <span className="text-muted-foreground block">Reputation</span>
              <span className="font-bold text-lg">{reputation}</span>
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-semibold text-xs mb-1 tracking-wide text-muted-foreground">Live Session Ranking</h4>
          <div className="max-h-36 overflow-auto rounded border border-border/60 bg-muted/30 text-[11px] divide-y divide-border/40">
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
        </section>

        <section>
          <h4 className="font-semibold text-xs mb-1 tracking-wide text-muted-foreground">All-Time Top 10</h4>
          <div className="max-h-36 overflow-auto rounded border border-border/60 bg-muted/30 text-[11px] divide-y divide-border/40">
            {leaderboard.length === 0 && <div className="p-2 text-muted-foreground">No scores</div>}
            {leaderboard.map((e, i) => {
              const self = e.name === playerName;
              return (
                <div key={`${e.name}-${e.score}-${e.time}`} className={clsx('grid grid-cols-12 items-center px-2 py-1 gap-1', self && 'bg-primary/15 font-medium')}>
                  <span className="col-span-1 text-right font-mono text-[10px] opacity-60">{i + 1}</span>
                  <span className="col-span-5 truncate" title={e.name}>{e.name}</span>
                  <span className="col-span-3 text-right tabular-nums">{e.score}</span>
                  <span className="col-span-3 text-right tabular-nums" title={`${e.time.toFixed(2)}s`}>{e.time.toFixed(0)}s</span>
                </div>
              );
            })}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}