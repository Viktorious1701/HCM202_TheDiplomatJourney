import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { BookText, Lock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const WorldMapHub = () => {
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const makeChoice = useGameStore((state) => state.makeChoice);
  const completedMissions = useGameStore((state) => state.completedMissions);

  const currentNode = currentStoryNode();

  const handleKnowledgeHubClick = () => {
    alert("This would open the Notebook panel.");
  };

  const missionSequence = [
    { id: 'paris', name: 'Paris', nodeKey: 'nhiemVuParis', requires: [], style: { top: '38%', left: '49%' } },
    { id: 'moscow', name: 'Moscow', nodeKey: 'nhiemVuMoscowA', requires: ['paris'], style: { top: '34%', left: '56%' } },
    { id: 'guangzhou', name: 'Guangzhou', nodeKey: 'nhiemVuQuangChauA', requires: ['paris', 'moscow'], style: { top: '53%', left: '78%' } },
    { id: 'pacBo', name: 'Pác Bó', nodeKey: 'nhiemVuPacBo', requires: ['paris', 'moscow', 'guangzhou'], style: { top: '55%', left: '74%' } }
  ];

  return (
    // Added top padding to account for the new fixed navbar.
    <div
      className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center p-4 pt-20"
      style={{ backgroundImage: `url(${currentNode.hinhAnh})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-0" />

      <div className="relative z-10 text-white bg-black/40 backdrop-blur-sm p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-heading drop-shadow-md">
          {currentNode.tieuDe}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
          {currentNode.vanBan}
        </p>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-10">
        {missionSequence.map((mission) => {
          const isCompleted = completedMissions.includes(mission.id);
          const isUnlocked = mission.requires.every(req => completedMissions.includes(req));

          return (
            <Button
              key={mission.id}
              variant={isCompleted ? 'secondary' : 'outline'}
              className={cn(
                "absolute bg-background/80 hover:bg-background transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-110",
                {
                  "opacity-50 cursor-not-allowed": !isUnlocked,
                  "ring-2 ring-green-500": isCompleted,
                  "animate-pulse": isUnlocked && !isCompleted
                }
              )}
              style={mission.style}
              onClick={() => isUnlocked && !isCompleted && makeChoice(mission.nodeKey)}
              disabled={!isUnlocked || isCompleted}
              aria-label={`Mission: ${mission.name}. Status: ${isCompleted ? 'Completed' : isUnlocked ? 'Available' : 'Locked'}`}
            >
              {isCompleted && <Check className="mr-2 h-4 w-4" />}
              {mission.name}
              {!isUnlocked && <Lock className="ml-2 h-4 w-4" />}
            </Button>
          );
        })}
      </div>

      {/* This button is now redundant as its function is in the main navbar, but is kept for logical consistency. */}
      {/* In a real project, this might be removed or repurposed. */}
      <div className="absolute bottom-6 right-6 z-20 opacity-0 pointer-events-none">
        <Button size="icon" variant="secondary" onClick={handleKnowledgeHubClick}>
          <BookText />
        </Button>
      </div>
    </div>
  );
};
