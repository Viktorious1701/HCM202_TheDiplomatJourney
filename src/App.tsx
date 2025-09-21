import { useGameStore } from './stores/gameStore';
import { MissionView } from './views/MissionView';
import { StartScreen } from './views/StartScreen';
import { WorldMapHub } from './views/WorldMapHub'; // Import the new component

function App() {
  const currentNodeKey = useGameStore((state) => state.currentNodeKey);
  const currentNode = useGameStore((state) => state.currentStoryNode());

  // UPDATED: More specific rendering logic
  const renderCurrentView = () => {
    switch (currentNodeKey) {
      case 'batDau':
        return <StartScreen />;
      case 'banDoTheGioi':
        return <WorldMapHub />;
      default:
        // If the node has choices, it's a mission view.
        if (currentNode?.luaChon) {
          return <MissionView />;
        }
        // Fallback for the end of the game.
        return <div>Journey Complete! (For now)</div>;
    }
  };

  return <div>{renderCurrentView()}</div>;
}

export default App;