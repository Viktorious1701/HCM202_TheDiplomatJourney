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