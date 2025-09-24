import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiveSessionRanking } from './LiveSessionRanking';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

// This is the new intermediate screen component.
export function ScoreUpdateScreen() {
  const confirmScoreUpdate = useGameStore(s => s.confirmScoreUpdate);
  const lastChoiceEffects = useGameStore(s => s.lastChoiceEffects);
  const globalSupport = useGameStore(s => s.globalSupport);
  const reputation = useGameStore(s => s.reputation);

  const { support = 0, reputation: rep = 0 } = lastChoiceEffects || {};

  const StatChange = ({ label, value }: { label: string, value: number }) => {
    const Icon = value > 0 ? TrendingUp : value < 0 ? TrendingDown : Minus;
    const color = value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-muted-foreground';

    return (
      <div className={cn("flex items-center justify-center gap-2 p-1 rounded", color)}>
        <Icon className="h-4 w-4" />
        <span className="font-mono">{label}: {value > 0 ? `+${value}` : value}</span>
      </div>
    );
  };

  return (
    // This screen is an overlay, allowing the mission view to remain visible underneath.
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg text-center animate-in fade-in zoom-in-95">
        <CardHeader>
          <CardTitle>Decision Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-2 rounded-lg text-sm">
            <p className="text-muted-foreground mb-2">Score Changes from Last Choice:</p>
            <div className="flex justify-center gap-4">
              <StatChange label="Support" value={support} />
              <StatChange label="Reputation" value={rep} />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">New Totals</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Global Support</p>
                <p className="text-2xl font-bold">{globalSupport}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reputation</p>
                <p className="text-2xl font-bold">{reputation}</p>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Updated Live Ranking</p>
            <LiveSessionRanking />
          </div>

        </CardContent>
        <div className="p-6 pt-0">
          <Button onClick={confirmScoreUpdate} className="w-full">
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}