// the-diplomats-journey/src/pages/LeaderboardPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeaderboard } from '@/services/leaderboardService';
import type { LeaderboardEntry } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HeroHeader } from '@/components/header';

export default function LeaderboardPage() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      // Fetch scores from the Supabase service on component mount
      const fetchedScores = await getLeaderboard();
      setScores(fetchedScores);
      setLoading(false);
    };

    fetchScores();
  }, []); // The empty dependency array ensures this runs only once on mount

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
            {loading ? (
              <p className="text-center">Loading scores...</p>
            ) : scores.length === 0 ? (
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