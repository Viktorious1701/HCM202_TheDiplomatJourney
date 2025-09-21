/* eslint-disable @typescript-eslint/no-unused-vars */
// path: the-diplomats-journey/src/views/MissionView.tsx
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HintNotebook } from '@/components/HintNotebook';
import { BookOpen, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Choice } from '@/types';

export const MissionView = () => {
  const currentNode = useGameStore((state) => state.currentStoryNode());
  const makeChoice = useGameStore((state) => state.makeChoice);
  const [showHint, setShowHint] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  if (!currentNode) {
    return <div>Loading...</div>;
  }

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoice(choice);
    // Use a timeout to show the outcome before transitioning
    setTimeout(() => {
      // The actual score values are now in the *outcome* node (e.g., ketQuaPhanTichParisA)
      // The gameStore will need to be updated to handle this, but for now we proceed.
      makeChoice(choice.nutTiepTheo);
      setSelectedChoice(null);
      setShowHint(false); // Hide hint on next choice
    }, 1500); // Wait 1.5 seconds to show the result
  };

  // This component now renders the outcome of a choice
  const OutcomeDisplay = ({ choice }: { choice: Choice }) => {
    // In a real implementation, we'd find the outcome node and get the scores.
    // For this example, we'll just show a placeholder. A future story would add the logic.
    return (
        <div className="text-center p-4">
            <p className="font-bold">Processing outcome...</p>
        </div>
    );
  };
  
  // This is the new Choice Card component
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
              <p className="text-lg text-foreground/80 whitespace-pre-wrap mb-6">
                {currentNode.vanBan}
              </p>
              
              <div className="space-y-4">
                {selectedChoice ? (
                  <OutcomeDisplay choice={selectedChoice} />
                ) : (
                  currentNode.luaChon?.map((choice, index) => (
                    <ChoiceCard
                      key={index}
                      choice={choice}
                      isSelected={selectedChoice === choice}
                      onClick={() => handleChoiceClick(choice)}
                    />
                  ))
                )}
              </div>

            </CardContent>
          </Card>

          {currentNode.hint && !selectedChoice && (
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