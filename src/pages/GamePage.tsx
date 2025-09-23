import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { MissionView } from '../views/MissionView';
import { StartScreen } from '../views/StartScreen';
import { WorldMapHub } from '../views/WorldMapHub';
import { GameCompleteScreen } from '@/components/GameCompleteScreen';
import { RoomHUD } from '@/components/RoomHUD';

export function GamePage() {
  // CORRECTED: Select each piece of state individually. This is the standard way to prevent infinite loops with Zustand.
  const currentNodeKey = useGameStore((state) => state.currentNodeKey);
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const endGame = useGameStore((state) => state.endGame);
  const finalScore = useGameStore((state) => state.finalScore);
  const completionTime = useGameStore((state) => state.completionTime);

  useEffect(() => {
    if (currentNodeKey === 'ketThucGame') {
      endGame();
    }
  }, [currentNodeKey, endGame]);

  // Now, call the selected function inside the component.
  const currentNode = currentStoryNode();

  if (!currentNode) {
    console.error("STORY ERROR: Could not find story node for key:", currentNodeKey);
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="text-center p-8 bg-destructive text-destructive-foreground rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Story Error</h1>
          <p>Could not load the story node for key: <strong>{currentNodeKey}</strong></p>
          <p className="mt-4">Please check `src/data/story.json` to ensure this key exists and the file is valid.</p>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentNodeKey) {
      case 'batDau':
        return <StartScreen />;
      case 'banDoTheGioi':
        return <WorldMapHub />;
      case 'ketThucGame':
        return <GameCompleteScreen score={finalScore()} time={completionTime()} />;
      default:
        return <MissionView />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
      <RoomHUD />
    </div>
  );
}
