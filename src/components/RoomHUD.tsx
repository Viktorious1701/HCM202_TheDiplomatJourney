import { useGameStore } from '@/stores/gameStore';
import { LeaderboardHUD } from './LeaderboardHUD';
import { ChatHUD } from './ChatHUD';

export function RoomHUD() {
  const roomId = useGameStore(s => s.roomId);

  // Do not render the HUD container if the player is not in a room.
  if (!roomId) return null;

  return (
    // This container positions the separate HUD components on the screen.
    <div className="fixed top-4 right-4 w-80 z-50 flex flex-col gap-4">
      <LeaderboardHUD />
      <ChatHUD />
    </div>
  );
}
