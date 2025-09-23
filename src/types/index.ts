export interface Choice {
  vanBan: string;
  nutTiepTheo: string;
  diemSo?: number;
  diemDanhVong?: number; // This is the 'Reputation' score
}

export interface Hint {
  tieuDe: string;
  vanBan: string;
}

export interface DebateQuestion {
  id: string;
  vanBan: string;
  dapAnDung: 'tanThanh' | 'phanDoi';
}

export interface DebateExplanation {
  id: string;
  giaiThichDung: string;
  giaiThichSai: string;
}

export interface StoryNode {
  tieuDe: string;
  vanBan: string;
  hinhAnh: string;
  hint?: Hint;
  loaiNhiemVu?: 'tranhLuan';
  cauHoiTranhLuan?: DebateQuestion[];
  ketThucTranhLuan?: { nutTiepTheo: string };
  giaiThich?: DebateExplanation[];
  luaChon?: Choice[];
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  time: number; // in seconds
}

// Multiplayer / Rooms
export interface Room {
  id: string; // uuid
  name: string;
  host_id: string;
  created_at?: string;
}

export interface ProgressUpdate {
  playerId: string;
  playerName?: string;
  node: string;
  globalSupport: number;
  reputation: number;
  completedMissions: number;
  elapsed: number; // seconds
  ts: number; // client timestamp
}

export interface ChatMessage {
  id?: string; // optional local uuid
  roomId: string;
  playerId: string;
  playerName?: string;
  content: string;
  ts: number; // epoch ms
  system?: boolean;
}

export interface TypingEvent {
  playerId: string;
  playerName?: string;
  typing: boolean; // true = started typing, false = stopped
  ts: number; // epoch ms when event generated
}