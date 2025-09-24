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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!roomId) return null;

  return (
    <>
      {!isSidebarOpen && (
        <div className="fixed top-4 right-4 z-[100]">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open notebook"
          >
            <BookText />
          </Button>
        </div>
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 h-full bg-background/90 backdrop-blur-sm border-l border-border/50 z-50 transition-transform duration-300 ease-in-out flex flex-col",
          "w-96 p-4 space-y-4",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between flex-shrink-0 border-b border-border/50 pb-2">
          <h2 className="text-lg font-semibold text-foreground">Diplomat's Notebook</h2>
          {/* The close button is styled to use the 'accent' color, matching the other UI elements. */}
          <Button
            size="icon"
            variant="default"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close notebook"
            className="-mr-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <X />
          </Button>
        </div>

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
      </aside>
    </>
  );
}
