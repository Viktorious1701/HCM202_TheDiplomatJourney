// the-diplomats-journey/src/components/SubmitScoreForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addScore } from '@/services/leaderboardService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SubmitScoreFormProps {
  score: number;
  time: number;
}

export function SubmitScoreForm({ score, time }: SubmitScoreFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name.');
      return;
    }

    setIsSubmitting(true);
    const newEntry = { name: name.trim(), score, time };
    
    // Call the service function to add the score to Supabase
    const result = await addScore(newEntry);

    if (result) {
      // On success, navigate to the leaderboard page
      navigate('/leaderboard');
    } else {
      // Handle potential submission error
      alert('Failed to submit score. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Journey Complete</CardTitle>
          <CardDescription>Your diplomatic mission has concluded. Enter your name to save your score to the leaderboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Final Score</p>
                <p className="text-2xl font-bold">{score}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time</p>
                <p className="text-2xl font-bold">{time.toFixed(2)}s</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Diplomat's Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit to Leaderboard'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}