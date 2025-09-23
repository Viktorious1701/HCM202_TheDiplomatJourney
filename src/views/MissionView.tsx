// the-diplomats-journey/src/views/MissionView.tsx
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
    }, 2000);
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
                "w-full justify-start text-left h-auto py-3 px-4 whitespace-normal bg-black/60 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:text-white",
                isSelected && "ring-2 ring-primary",
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
    // Reverted to a full-screen background approach with a solid black fallback.
    <div 
      className="relative w-full h-screen bg-black flex flex-col justify-end p-4 md:p-8"
      // Use inline styles for precise background control.
      style={{ 
        backgroundImage: `url(${currentNode.hinhAnh})`,
        // `contain` ensures the entire image is visible without cropping, letterboxed if necessary.
        backgroundSize: 'contain', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* This div creates the screen flash effect. It has the highest z-index. */}
      <div
        className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-500"
        style={{ backgroundColor: flashColor || 'transparent', opacity: flashColor ? 1 : 0 }}
      />
        
      {/* This overlay dims the scene for atmosphere. It sits just above the background. */}
      <div className={cn(
        "absolute inset-0 bg-black/20 z-0 transition-colors duration-500",
        isHardMode && "bg-black/50"
      )} />

      {/* A gradient at the bottom ensures text is readable over the background. */}
      <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/80 via-black/60 to-transparent pointer-events-none z-10" />

      {/* Main content area for text and choices, positioned at the bottom of the screen. */}
      <div className="relative z-20 w-full max-w-4xl mx-auto space-y-6">
        {/* The text box and choices appear after the 2-second delay. */}
        {isTextVisible && (
            <>
              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                  <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">{currentNode.tieuDe}</h1>
                  <p 
                      className="text-xl text-white/90 leading-relaxed min-h-[120px] drop-shadow-md"
                      dangerouslySetInnerHTML={{ __html: (currentNode.vanBan || '').replace(/\n/g, '<br />') }} 
                  />
              </div>

              {renderMissionContent()}

              {currentNode.hint && (
                <div className="text-center">
                  <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white" onClick={() => setShowHint(!showHint)}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    {showHint ? "Ẩn Gợi Ý" : "Xem Sổ Tay (Gợi Ý)"}
                  </Button>
                  {showHint && <HintNotebook hint={currentNode.hint} />}
                </div>
              )}
            </>
        )}
      </div>
    </div>
  );
};