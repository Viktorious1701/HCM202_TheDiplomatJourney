import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Button } from './ui/button';
import { BookText, X } from 'lucide-react';
import { LeaderboardHUD } from './LeaderboardHUD';
import { ChatHUD } from './ChatHUD';
import { KnowledgeHub } from './KnowledgeHub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

export function InGameHUD() {
  const roomId = useGameStore(s => s.roomId);
  // State now controls the visibility of the full-screen panel.
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  if (!roomId) return null;

  return (
    <>
      {/* This is the new persistent top navigation bar. */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">The Diplomat's Journey</h1>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsPanelOpen(true)}
          aria-label="Open notebook"
        >
          <BookText />
        </Button>
      </header>

      {/* This is the full-screen panel that slides down from the top. */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-50 transition-transform duration-500 ease-in-out flex flex-col p-4",
          isPanelOpen ? "translate-y-0" : "-translate-y-full" // Animation controls.
        )}
      >
        {/* The panel has its own header with a title and close button. */}
        <div className="flex items-center justify-between flex-shrink-0 border-b border-border/50 pb-2 mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Diplomat's Notebook</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsPanelOpen(false)}
            aria-label="Close notebook"
          >
            <X className="h-8 w-8" />
          </Button>
        </div>

        {/* The tabs are placed inside a centrally aligned, max-width container for readability. */}
        <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col min-h-0">
          <Tabs defaultValue="notebook" className="w-full flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-3 themed-tabs-list flex-shrink-0">
              <TabsTrigger value="notebook" className="themed-tabs-trigger">Notebook</TabsTrigger>
              <TabsTrigger value="leaderboard" className="themed-tabs-trigger">Scores</TabsTrigger>
              <TabsTrigger value="chat" className="themed-tabs-trigger">Chat</TabsTrigger>
            </TabsList>
            <div className="mt-4 flex-grow overflow-y-auto min-h-0">
              <TabsContent value="notebook">
                <KnowledgeHub />
              </TabsContent>
              <TabsContent value="leaderboard">
                <LeaderboardHUD />
              </TabsContent>
              <TabsContent value="chat" className="h-full">
                <ChatHUD />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}
