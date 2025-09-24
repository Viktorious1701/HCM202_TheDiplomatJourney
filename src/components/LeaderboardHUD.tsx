import { useGameStore } from '@/stores/gameStore';
import { useRealtimeLeaderboard } from '@/hooks/useRealtimeLeaderboard';
import clsx from 'clsx';
import { LiveSessionRanking } from './LiveSessionRanking';

export function LeaderboardHUD() {
  const playerName = useGameStore(s => s.playerName);
  const globalSupport = useGameStore(s => s.globalSupport);
  const reputation = useGameStore(s => s.reputation);
  const { entries: leaderboard } = useRealtimeLeaderboard();

  // The outer div and header are simplified as they are now contained within the sidebar tabs.
  return (
    <div className="space-y-4">
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
        <LiveSessionRanking />
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
    </div>
  );
}
