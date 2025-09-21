import { useGameStore } from './stores/gameStore';
import { MissionView } from './views/MissionView';
import { StartScreen } from './views/StartScreen';

function App() {
  const currentNodeKey = useGameStore((state) => state.currentNodeKey);
  const currentNode = useGameStore((state) => state.currentStoryNode());

  // This is a simple, state-based router.
  // Full routing with URLs will be added in a later story.
  const renderCurrentView = () => {
    // Show the StartScreen only when we are on the 'batDau' node.
    if (currentNodeKey === 'batDau') {
      return <StartScreen />;
    }

    // For any other node that has choices, we are in a mission.
    if (currentNode?.luaChon) {
      return <MissionView />;
    }

    // This is a fallback for the end of the game or other states
    // without choices. We'll build the proper End Screen in a later story.
    return <div>Journey Complete! (For now)</div>;
  };

  return (
    <div>
      {renderCurrentView()}
    </div>
  );
}

export default App;