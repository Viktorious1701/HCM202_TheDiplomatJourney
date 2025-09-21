import { useGameStore } from '../stores/gameStore';
import { MissionView } from '../views/MissionView';
import { StartScreen } from '../views/StartScreen';
import { WorldMapHub } from '../views/WorldMapHub';

export function GamePage() {
  const currentNodeKey = useGameStore((state) => state.currentNodeKey);
  const currentNode = useGameStore((state) => state.currentStoryNode());

  // This logic determines which full-screen view to render.
  const renderCurrentView = () => {
    switch (currentNodeKey) {
      case 'batDau':
        return <StartScreen />;

      case 'banDoTheGioi':
        return <WorldMapHub />;

      // If the current node has choices, it's a mission scenario.
      default:
        if (currentNode?.luaChon) {
          return <MissionView />;
        }
        
        // This will be the end game screen.
        // We will create a dedicated component for this in a later story.
        if (currentNodeKey === 'ketThucGame') {
           return <div>GAME COMPLETE! Final Score Page.</div>
        }
        
        // Fallback for any other state
        return <div>Loading or unknown state...</div>;
    }
  };

  return (
    <div>
      {/* 
        A Header component will be added in a future story 
        to display persistent info like scores.
      */}
      {renderCurrentView()}
    </div>
  );
}