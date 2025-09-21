import { useGameStore } from '../stores/gameStore';

// For Story 1.2, this is a very basic, unstyled implementation.
// Styling and features like images will be added in subsequent stories.
export const MissionView = () => {
  // Connect to the Zustand store to get the current state and actions
  const currentNode = useGameStore((state) => state.currentStoryNode());
  const makeChoice = useGameStore((state) => state.makeChoice);

  if (!currentNode) {
    return <div>Loading story or story ended...</div>;
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'serif', maxWidth: '800px', margin: 'auto' }}>
      {/* This section will become the NarrativeBox component */}
      <div style={{ border: '1px solid #3D3522', padding: '16px' }}>
        <h2>{currentNode.tieuDe}</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{currentNode.vanBan}</p>
        {/* The image will be added in Story 1.4 */}
      </div>

      <hr style={{ margin: '24px 0' }} />

      {/* This section renders the choice buttons */}
      <div>
        {currentNode.luaChon?.map((choice, index) => (
          <button
            key={index}
            onClick={() => {
              // The `diemSo` and `diemDanhVong` are part of the choice object in story.json
              // We pass them to the makeChoice function here.
              // Scoring logic will be implemented in the store in Story 1.3
              makeChoice(choice.nutTiepTheo);
            }}
            style={{ 
              display: 'block', 
              width: '100%',
              margin: '8px 0', 
              padding: '12px',
              cursor: 'pointer',
              textAlign: 'left',
              border: '1px solid #856A4A',
              background: 'transparent',
              color: '#3D3522',
              fontFamily: 'sans-serif'
            }}
          >
            {choice.vanBan}
          </button>
        ))}
      </div>
    </div>
  );
};