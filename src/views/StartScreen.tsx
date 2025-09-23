import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const StartScreen = () => {
  // CORRECTED: Select the action and the computed function separately.
  const startGame = useGameStore((state) => state.startGame);
  const joinRoom = useGameStore((s) => s.joinRoom);
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);

  // Call the selected function here.
  const currentNode = currentStoryNode();

  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [mode, setMode] = useState<'create' | 'join'>('create');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name to begin.');
      return;
    }
    let finalRoom = roomCode.trim();
    if (mode === 'create') {
      if (!finalRoom) finalRoom = Math.random().toString(36).slice(2, 8);
      joinRoom(finalRoom, true);
    } else {
      if (!finalRoom) {
        alert('Enter a room code to join.');
        return;
      }
      joinRoom(finalRoom, false);
    }
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
            <div className="space-y-4">
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
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="room" className="text-lg">{mode === 'create' ? 'Room Code (optional)' : 'Room Code (required)'}</Label>
                  <div className="flex gap-2 text-sm">
                    <button type="button" className={`px-2 py-1 rounded border ${mode==='create'?'bg-primary text-primary-foreground':'bg-muted'}`} onClick={() => setMode('create')}>Create</button>
                    <button type="button" className={`px-2 py-1 rounded border ${mode==='join'?'bg-primary text-primary-foreground':'bg-muted'}`} onClick={() => setMode('join')}>Join</button>
                  </div>
                </div>
                <Input
                  id="room"
                  type="text"
                  placeholder={mode === 'create' ? 'Leave blank to auto-generate' : 'Enter room code to join'}
                  value={roomCode}
                  onChange={(e) => { setRoomCode(e.target.value); }}
                  maxLength={16}
                  className="text-base"
                />
                {mode === 'create' && <p className="text-xs text-muted-foreground">Blank = random code. You will be host.</p>}
              </div>
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
