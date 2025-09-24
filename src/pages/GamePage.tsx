import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { MissionView } from '../views/MissionView';
import { StartScreen } from '../views/StartScreen';
import { WorldMapHub } from '../views/WorldMapHub';
import { GameCompleteScreen } from '@/components/GameCompleteScreen';
import { InGameHUD } from '@/components/InGameHUD';
import { ScoreUpdateScreen } from '@/components/ScoreUpdateScreen'; // Import the new screen.

export function GamePage() {
  const currentNodeKey = useGameStore((state) => state.currentNodeKey);
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const endGame = useGameStore((state) => state.endGame);
  const finalScore = useGameStore((state) => state.finalScore);
  const completionTime = useGameStore((state) => state.completionTime);
  // Get the state that controls the visibility of the intermediate score screen.
  const viewingScoreUpdate = useGameStore((state) => state.viewingScoreUpdate);

  useEffect(() => {
    if (currentNodeKey === 'ketThucGame') {
      endGame();
    }
  }, [currentNodeKey, endGame]);

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
      {/* Conditionally render the ScoreUpdateScreen as an overlay. */}
      {viewingScoreUpdate && <ScoreUpdateScreen />}
      <InGameHUD />
    </div>
  );
}
