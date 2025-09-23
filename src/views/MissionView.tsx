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
                "w-full justify-start text-left h-auto py-3 px-4 whitespace-normal bg-background/60 backdrop-blur-sm text-foreground border-foreground/30 hover:bg-accent hover:text-accent-foreground",
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
    // The main container provides the parchment-colored letterbox background.
    <div className="relative w-full h-screen bg-background overflow-hidden">
      
      {/* Layer 1: Blurred Background. This covers the entire screen to provide color and atmosphere. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${currentNode.hinhAnh})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(16px) brightness(0.8)', // Heavy blur and slight dimming.
          transform: 'scale(1.1)', // Scale up to hide blurred edges.
        }}
      />
      
      {/* Layer 2: Sharp, Contained Image. This is the main focus, guaranteed to be uncropped. */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${currentNode.hinhAnh})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Choice feedback flash sits on top of the images but below the UI. */}
      <div
        className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-500"
        style={{ backgroundColor: flashColor || 'transparent', opacity: flashColor ? 1 : 0 }}
      />
        
      {/* Atmospheric tint for Hard Mode, sits on top of everything so far. */}
      <div className={cn(
        "absolute inset-0 bg-black/10 z-30 transition-colors duration-500 pointer-events-none",
        isHardMode && "bg-black/30"
      )} />

      {/* The UI layer is positioned absolutely at the bottom with the highest z-index. */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-40">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          {isTextVisible && (
              <>
                <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-foreground/20 shadow-md">
                    <h1 className="text-3xl font-bold mb-4 text-foreground drop-shadow-lg">{currentNode.tieuDe}</h1>
                    <p 
                        className="text-xl text-foreground/90 leading-relaxed min-h-[100px] drop-shadow-md"
                        dangerouslySetInnerHTML={{ __html: (currentNode.vanBan || '').replace(/\n/g, '<br />') }} 
                    />
                </div>

                {renderMissionContent()}

                {currentNode.hint && (
                  <div className="text-center">
                    <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => setShowHint(!showHint)}>
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
    </div>
  );
};