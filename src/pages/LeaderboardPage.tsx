import { Link } from 'react-router-dom';
import { useRealtimeLeaderboard } from '@/hooks/useRealtimeLeaderboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HeroHeader } from '@/components/header';

export default function LeaderboardPage() {
  const { entries: scores, loading, error } = useRealtimeLeaderboard();

  return (
    <>
      <HeroHeader />
      <main className="flex justify-center items-center min-h-screen pt-20">
        <Card className="w-full max-w-2xl mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Leaderboard</CardTitle>
            <CardDescription>Top 10 Diplomats</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-center text-muted-foreground">Loading scores...</p>}

            {/* If an error occurs, display a helpful diagnostic message. */}
            {error && (
              <div className="my-4 text-center text-destructive bg-destructive/10 p-4 rounded-md border border-destructive/20">
                <p className="font-semibold">Failed to Load Leaderboard</p>
                <p className="text-sm mt-1 font-mono bg-destructive/10 p-2 rounded">{error}</p>
                <p className="text-xs mt-3 text-muted-foreground">
                  <strong>Troubleshooting Tips:</strong><br />
                  1. Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your Netlify Environment Variables.<br />
                  2. Check that your `leaderboard` table in Supabase has Row Level Security (RLS) enabled with a policy that allows public read (`SELECT`) access.
                </p>
              </div>
            )}

            {!loading && !error && (
              scores.length === 0 ? (
                <p className="text-center">No scores yet. Be the first!</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Rank</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="text-right">Time (s)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scores.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell className="text-right">{entry.score}</TableCell>
                        <TableCell className="text-right">{entry.time.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            )}
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to="/">Play Again</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
