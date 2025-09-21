import { useGameStore } from '../stores/gameStore';

export const StartScreen = () => {
  const makeChoice = useGameStore((state) => state.makeChoice);
  const currentNode = useGameStore((state) => state.currentStoryNode());

  // The StartScreen will have the first "choice" to begin the game,
  // which is defined in the `batDau` node of story.json.
  const startGameChoice = currentNode.luaChon?.[0];

  if (!startGameChoice) {
    // This can happen if the story.json is not loaded correctly
    return <div>Error: Could not find starting choice.</div>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '48px' }}>
      <h1>{currentNode.tieuDe}</h1>
      <p style={{ whiteSpace: 'pre-wrap' }}>{currentNode.vanBan}</p>
      
      <button 
        onClick={() => makeChoice(startGameChoice.nutTiepTheo)}
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          cursor: 'pointer',
          fontSize: '18px'
        }}
      >
        {startGameChoice.vanBan}
      </button>
    </div>
  );
};