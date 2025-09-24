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
      <div className="fixed top-4 right-4 z-[100]">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close notebook" : "Open notebook"}
        >
          {isSidebarOpen ? <X /> : <BookText />}
        </Button>
      </div>

      <aside
        className={cn(
          "fixed top-0 right-0 h-full bg-background/90 backdrop-blur-sm border-l border-border/50 z-50 transition-transform duration-300 ease-in-out",
          "w-80 p-4 overflow-y-auto",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Tabs defaultValue="notebook" className="w-full">
          {/* The custom themed classes are applied here. */}
          <TabsList className="grid w-full grid-cols-3 themed-tabs-list">
            <TabsTrigger value="notebook" className="themed-tabs-trigger">Notebook</TabsTrigger>
            <TabsTrigger value="leaderboard" className="themed-tabs-trigger">Scores</TabsTrigger>
            <TabsTrigger value="chat" className="themed-tabs-trigger">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="notebook" className="mt-4">
            <KnowledgeHub />
          </TabsContent>
          <TabsContent value="leaderboard" className="mt-4">
            <LeaderboardHUD />
          </TabsContent>
          <TabsContent value="chat" className="mt-4">
            <ChatHUD />
          </TabsContent>
        </Tabs>
      </aside>
    </>
  );
}
