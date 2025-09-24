import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addScore } from '@/services/leaderboardService';
import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface GameCompleteScreenProps {
  score: number;
  time: number;
}

export function GameCompleteScreen({ score, time }: GameCompleteScreenProps) {
  const playerName = useGameStore((state) => state.playerName);
  const startTime = useGameStore(s => s.startTime);
  const endTime = useGameStore(s => s.endTime);
  const resetGame = useGameStore((state) => state.resetGame);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const liveElapsed = startTime ? ((endTime ?? Date.now()) - startTime) / 1000 : 0;
  const displayTime = time > 0 ? time : liveElapsed;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const newEntry = { name: playerName, score, time: displayTime };

    const result = await addScore(newEntry);

    if (result) {
      navigate('/leaderboard');
    } else {
      alert('Failed to submit score. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    navigate('/game');
  }

  return (
    // Added top padding to account for the new fixed navbar.
    <div className="flex justify-center items-center min-h-screen p-4 pt-20">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Journey Complete</CardTitle>
          <CardDescription>Well done, Diplomat {playerName}. Your mission has concluded.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Final Score</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Time</p>
              <p className="text-2xl font-bold">{displayTime.toFixed(2)}s</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit to Leaderboard'}
          </Button>
          <Button onClick={handlePlayAgain} variant="ghost" className="w-full">
            Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
