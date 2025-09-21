import React from 'react';
import { useGameStore } from '../stores/gameStore';

// For now, this is a basic placeholder. We will make it interactive in a later story.
export const WorldMapHub = () => {
  const currentNode = useGameStore((state) => state.currentStoryNode());
  const makeChoice = useGameStore((state) => state.makeChoice);

  // In a future story, we will make these markers clickable.
  // For now, we will just create a placeholder button for the first mission.
  const parisMissionNodeKey = 'nhiemVuParis';

  return (
    <div style={{ textAlign: 'center', padding: '24px' }}>
      <h1>{currentNode.tieuDe}</h1>
      <p>{currentNode.vanBan}</p>
      {/* Placeholder image for the map */}
      <div style={{ width: '80%', height: '400px', background: '#ccc', margin: '24px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        WORLD MAP IMAGE
      </div>

      <div>
        <h3>Select a Mission:</h3>
        <button 
          onClick={() => makeChoice(parisMissionNodeKey)}
          style={{ padding: '12px 24px', cursor: 'pointer' }}
        >
          Go to Paris (Test)
        </button>
        {/* We will add Moscow and Guangzhou later */}
      </div>
    </div>
  );
};