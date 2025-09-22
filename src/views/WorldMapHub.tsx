import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { BookText } from 'lucide-react';

export const WorldMapHub = () => {
  const currentNode = useGameStore((state) => state.currentStoryNode());
  const makeChoice = useGameStore((state) => state.makeChoice);

  // In a future story, the Knowledge Hub would open a modal.
  const handleKnowledgeHubClick = () => {
    alert("Knowledge Hub / Presentation Slides would open here.");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center p-4">
      {/* Background Map Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${currentNode.hinhAnh})` }}
      />

      {/* Overlay to darken the map slightly and improve text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-white">
        <h1 className="text-4xl md:text-6xl font-bold font-heading drop-shadow-md">
          {currentNode.tieuDe}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
          {currentNode.vanBan}
        </p>
      </div>

      {/* Interactive Mission Markers - using absolute positioning */}
      <div className="absolute top-0 left-0 w-full h-full z-20">

        {/* Paris Marker */}
        <Button
          variant="outline"
          className="absolute bg-background/80 hover:bg-background"
          style={{ top: '38%', left: '49%', transform: 'translate(-50%, -50%)' }}
          onClick={() => makeChoice('nhiemVuParis')}
        >
          Paris
        </Button>

        {/* Moscow Marker */}
        <Button
          variant="outline"
          className="absolute bg-background/80 hover:bg-background"
          style={{ top: '34%', left: '56%', transform: 'translate(-50%, -50%)' }}
          onClick={() => makeChoice('nhiemVuMoscowA')}
        >
          Moscow
        </Button>

        {/* Guangzhou Marker - Now correctly linked to its mission node */}
        <Button
          variant="outline"
          className="absolute bg-background/80 hover:bg-background"
          style={{ top: '53%', left: '78%', transform: 'translate(-50%, -50%)' }}
          onClick={() => makeChoice('nhiemVuQuangChauA')}
        >
          Guangzhou
        </Button>

      </div>

      {/* Knowledge Hub Icon */}
      <div className="absolute bottom-6 right-6 z-20">
        <Button size="icon" variant="secondary" onClick={handleKnowledgeHubClick}>
          <BookText />
        </Button>
      </div>
    </div>
  );
};
