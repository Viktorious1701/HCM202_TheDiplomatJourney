import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const StartScreen = () => {
  const startGame = useGameStore((state) => state.startGame);
  const currentNode = useGameStore((state) => state.currentStoryNode());
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name to begin.');
      return;
    }
    // Call the startGame action with the player's name
    startGame(name.trim());
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-background/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">{currentNode.tieuDe}</CardTitle>
          <CardDescription className="pt-2 text-base">{currentNode.vanBan}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">Enter Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name of the Diplomat..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
                className="text-base"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-lg py-6">
              Begin Journey
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
