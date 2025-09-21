/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HintNotebook } from '@/components/HintNotebook';
import { BookOpen } from 'lucide-react';

export const MissionView = () => {
  const currentNode = useGameStore((state) => state.currentStoryNode());
  const makeChoice = useGameStore((state) => state.makeChoice);
  const [showHint, setShowHint] = useState(false);

  if (!currentNode) {
    return <div>Loading...</div>;
  }

  // Determine the score/rep values from the JSON
  const getChoiceValues = (choice: any) => {
    let support = 0;
    let reputation = 0;
    
    // This logic handles the different scoring formats we designed
    if (typeof choice.diemSo === 'number') {
      support = choice.diemSo;
    } else if (choice.diemSo && typeof choice.diemSo.dung === 'number') {
      // This is for debate questions, not used here but good practice
    }

    if (typeof choice.diemDanhVong === 'number') {
      reputation = choice.diemDanhVong;
    }

    return { support, reputation };
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* Left side: Image */}
        <div className="flex justify-center items-center">
          <img 
            src={currentNode.hinhAnh} 
            alt={currentNode.tieuDe} 
            className="rounded-lg shadow-lg max-h-[80vh] object-contain"
          />
        </div>

        {/* Right side: Narrative and Choices */}
        <div className="flex flex-col">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{currentNode.tieuDe}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/80 whitespace-pre-wrap mb-6">
                {currentNode.vanBan}
              </p>
              
              <div className="space-y-3">
                {currentNode.luaChon?.map((choice, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => {
                      const values = getChoiceValues(choice);
                      makeChoice(choice.nutTiepTheo, values.support, values.reputation);
                      setShowHint(false); // Hide hint on next choice
                    }}
                  >
                    {choice.vanBan}
                  </Button>
                ))}
              </div>

            </CardContent>
          </Card>

          {/* Hint Section */}
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