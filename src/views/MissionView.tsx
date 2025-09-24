import { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { HintNotebook } from '@/components/HintNotebook';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Choice } from '@/types';
import { DebateMission } from '@/components/DebateMission';

export const MissionView = () => {
  const currentNode = useGameStore((state) => state.currentStoryNode());
  const makeChoice = useGameStore((state) => state.makeChoice);
  const currentNodeKey = useGameStore((state) => state.currentNodeKey);
  const lastChoiceFeedback = useGameStore((state) => state.lastChoiceFeedback);
  const clearChoiceFeedback = useGameStore((state) => state.clearChoiceFeedback);

  const [showHint, setShowHint] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    setIsTextVisible(false);
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentNodeKey]);

  useEffect(() => {
    if (lastChoiceFeedback) {
      let color = '';
      switch (lastChoiceFeedback) {
        case 'good': color = 'rgba(74, 222, 128, 0.3)'; break;
        case 'neutral': color = 'rgba(250, 204, 21, 0.3)'; break;
        case 'bad': color = 'rgba(239, 68, 68, 0.3)'; break;
      }
      setFlashColor(color);

      const timer = setTimeout(() => {
        setFlashColor(null);
        clearChoiceFeedback();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [lastChoiceFeedback, clearChoiceFeedback]);

  if (!currentNode) {
    return <div>Loading...</div>;
  }

  const isHardMode = currentNodeKey.includes('_HardMode');

  const handleChoiceClick = (choice: Choice) => {
    setSelectedChoice(choice);
    setTimeout(() => {
      makeChoice(choice.nutTiepTheo);
      setSelectedChoice(null);
      setShowHint(false);
    }, 500);
  };

  const ChoiceButton = ({ choice, onClick, isSelected }: { choice: Choice, onClick: () => void, isSelected: boolean }) => {
    return (
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left h-auto py-3 px-4 whitespace-normal bg-background/80 border-foreground/30 hover:bg-accent hover:text-accent-foreground",
          isSelected && "ring-2 ring-ring",
          !isTextVisible && "opacity-50 cursor-not-allowed"
        )}
        onClick={onClick}
        disabled={!isTextVisible}
      >
        {choice.vanBan}
      </Button>
    );
  };

  const renderMissionContent = () => {
    if (currentNode.loaiNhiemVu === 'tranhLuan') {
      return <DebateMission />;
    }

    return (
      <div className="space-y-3">
        {currentNode.luaChon?.map((choice, index) => (
          <ChoiceButton
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
    <div className="relative w-full min-h-screen bg-background flex flex-col">
      <div
        className="fixed inset-0 z-[60] pointer-events-none transition-opacity duration-500"
        style={{ backgroundColor: flashColor || 'transparent', opacity: flashColor ? 1 : 0 }}
      />
      <div className={cn(
        "fixed inset-0 bg-black/10 z-40 transition-colors duration-500 pointer-events-none",
        isHardMode && "bg-black/30"
      )} />

      {/* Added top padding to push content below the new fixed navbar. Removed side margin. */}
      <main className="flex-grow flex flex-col md:flex-row p-4 md:p-8 gap-8 z-10 pt-20">
        <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-auto md:max-h-[calc(100vh-6.5rem)]">
          <img
            src={`/${currentNode.hinhAnh}`}
            alt={currentNode.tieuDe}
            className="w-full h-full object-contain rounded-lg shadow-lg border-4 border-foreground/20"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <div className="w-full max-w-2xl space-y-6">
            <div
              className={cn(
                "transition-opacity duration-1000 delay-500",
                isTextVisible ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="bg-background/80 p-6 rounded-lg border border-foreground/20 shadow-md mb-6">
                <h1 className="text-3xl font-bold mb-4 text-foreground drop-shadow-lg">{currentNode.tieuDe}</h1>
                <p
                  className="text-xl text-foreground/90 leading-relaxed min-h-[100px] drop-shadow-md"
                  dangerouslySetInnerHTML={{ __html: (currentNode.vanBan || '').replace(/\n/g, '<br />') }}
                />
              </div>

              {renderMissionContent()}

              {currentNode.hint && (
                <div className="text-center mt-4">
                  <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => setShowHint(!showHint)}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    {showHint ? "Ẩn Gợi Ý" : "Xem Sổ Tay (Gợi Ý)"}
                  </Button>
                  {showHint && <HintNotebook hint={currentNode.hint} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
