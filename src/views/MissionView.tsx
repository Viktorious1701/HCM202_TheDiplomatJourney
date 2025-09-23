// the-diplomats-journey/src/views/MissionView.tsx
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HintNotebook } from '@/components/HintNotebook';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Choice } from '@/types';
import { DebateMission } from '@/components/DebateMission'; // Import the new component

export const MissionView = () => {
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const makeChoice = useGameStore((state) => state.makeChoice);
  
  const currentNode = currentStoryNode();

  const [showHint, setShowHint] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  if (!currentNode) {
    return <div>Loading...</div>;
  }

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoice(choice);
    setTimeout(() => {
      makeChoice(choice.nutTiepTheo);
      setSelectedChoice(null);
      setShowHint(false); 
    }, 500);
  };
  
  const ChoiceCard = ({ choice, onClick, isSelected }: { choice: Choice, onClick: () => void, isSelected: boolean }) => {
    return (
      <Card 
        className={cn(
          "cursor-pointer hover:bg-accent/50 transition-all duration-200",
          isSelected && "ring-2 ring-primary"
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <p>{choice.vanBan}</p>
        </CardContent>
      </Card>
    );
  };

  // This function conditionally renders the right UI for the mission type
  const renderMissionContent = () => {
    if (currentNode.loaiNhiemVu === 'tranhLuan') {
      return <DebateMission />;
    }

    // Default to the standard choice-based UI
    return (
      <div className="space-y-4">
        {currentNode.luaChon?.map((choice, index) => (
          <ChoiceCard
            key={index}
            choice={choice}
            isSelected={selectedChoice === choice}
            onClick={() => handleChoiceClick(choice)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        
        <div className="flex justify-center items-center">
          <img 
            src={currentNode.hinhAnh} 
            alt={currentNode.tieuDe} 
            className="rounded-lg shadow-lg max-h-[80vh] object-contain"
          />
        </div>

        <div className="flex flex-col">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{currentNode.tieuDe}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/80 whitespace-pre-wrap mb-6" dangerouslySetInnerHTML={{ __html: currentNode.vanBan.replace(/\n/g, '<br />') }} />
              
              {/* Render the appropriate mission UI */}
              {renderMissionContent()}

            </CardContent>
          </Card>

          {currentNode.hint && (
            <div className="mt-4 text-center">
              <Button variant="ghost" onClick={() => setShowHint(!showHint)}>
                <BookOpen className="mr-2 h-4 w-4" />
                {showHint ? "Ẩn Gợi Ý" : "Xem Sổ Tay (Gợi Ý)"}
              </Button>
              {showHint && <HintNotebook hint={currentNode.hint} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};