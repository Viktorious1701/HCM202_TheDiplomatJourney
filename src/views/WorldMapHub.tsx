import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { BookText } from 'lucide-react';

export const WorldMapHub = () => {
  // CORRECTED: Select the node and the action function separately.
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const makeChoice = useGameStore((state) => state.makeChoice);

  // Call the selected function here.
  const currentNode = currentStoryNode();

  const handleKnowledgeHubClick = () => {
    alert("Knowledge Hub / Presentation Slides would open here.");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center p-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${currentNode.hinhAnh})` }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

      <div className="relative z-20 text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-heading drop-shadow-md">
          {currentNode.tieuDe}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
          {currentNode.vanBan}
        </p>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-20">

        <Button
          variant="outline"
          className="absolute bg-background/80 hover:bg-background"
          style={{ top: '38%', left: '49%', transform: 'translate(-50%, -50%)' }}
          onClick={() => makeChoice('nhiemVuParis')}
        >
          Paris
        </Button>

        <Button
          variant="outline"
          className="absolute bg-background/80 hover:bg-background"
          style={{ top: '34%', left: '56%', transform: 'translate(-50%, -50%)' }}
          onClick={() => makeChoice('nhiemVuMoscowA')}
        >
          Moscow
        </Button>

        <Button
          variant="outline"
          className="absolute bg-background/80 hover:bg-background"
          style={{ top: '53%', left: '78%', transform: 'translate(-50%, -50%)' }}
          onClick={() => makeChoice('nhiemVuQuangChauA')}
        >
          Guangzhou
        </Button>

      </div>

      <div className="absolute bottom-6 right-6 z-20">
        <Button size="icon" variant="secondary" onClick={handleKnowledgeHubClick}>
          <BookText />
        </Button>
      </div>
    </div>
  );
};
