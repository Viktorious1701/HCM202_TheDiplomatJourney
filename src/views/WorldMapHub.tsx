import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { BookText, Lock, Check } from 'lucide-react';

export const WorldMapHub = () => {
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const makeChoice = useGameStore((state) => state.makeChoice);
  const completedMissions = useGameStore((state) => state.completedMissions);

  const currentNode = currentStoryNode();

  const handleKnowledgeHubClick = () => {
    alert("Knowledge Hub / Presentation Slides would open here.");
  };

  // Define the mission sequence and their unlock requirements
  const missionSequence = [
    { id: 'paris', name: 'Paris', nodeKey: 'nhiemVuParis', requires: [], style: { top: '38%', left: '49%' } },
    { id: 'moscow', name: 'Moscow', nodeKey: 'nhiemVuMoscowA', requires: ['paris'], style: { top: '34%', left: '56%' } },
    { id: 'guangzhou', name: 'Guangzhou', nodeKey: 'nhiemVuQuangChauA', requires: ['paris', 'moscow'], style: { top: '53%', left: '78%' } },
    { id: 'pacBo', name: 'Pác Bó', nodeKey: 'nhiemVuPacBo', requires: ['paris', 'moscow', 'guangzhou'], style: { top: '55%', left: '74%' } }
  ];

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
        {missionSequence.map((mission) => {
          const isCompleted = completedMissions.includes(mission.id);
          // A mission is unlocked if all its required prerequisite missions are in the completed list.
          const isUnlocked = mission.requires.every(req => completedMissions.includes(req));

          return (
            <Button
              key={mission.id}
              variant={isCompleted ? 'secondary' : 'outline'}
              className="absolute bg-background/80 hover:bg-background transition-all duration-300"
              style={{ ...mission.style, transform: 'translate(-50%, -50%)' }}
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

      <div className="absolute bottom-6 right-6 z-20">
        <Button size="icon" variant="secondary" onClick={handleKnowledgeHubClick}>
          <BookText />
        </Button>
      </div>
    </div>
  );
};
