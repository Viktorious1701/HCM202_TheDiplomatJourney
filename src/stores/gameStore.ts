/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import storyData from '../data/story.json';
import type { StoryNode, DebateQuestion } from '../types';

type ChoiceFeedback = 'good' | 'neutral' | 'bad' | null;

interface GameState {
  currentNodeKey: string;
  globalSupport: number;
  reputation: number;
  startTime: number | null;
  endTime: number | null;
  history: string[];
  playerName: string;
  completedMissions: string[];
  lastChoiceFeedback: ChoiceFeedback;
  playerId: string;
  roomId: string | null;
  isHost: boolean;
  // State for the intermediate score update screen
  viewingScoreUpdate: boolean;
  pendingNextNodeKey: string | null;
  lastChoiceEffects: { support: number; reputation: number } | null;
}

interface GameActions {
  startGame: (playerName: string) => void;
  makeChoice: (nextNodeKey: string) => void;
  // New action to proceed from the score update screen to the next node.
  confirmScoreUpdate: () => void;
  answerDebateQuestion: (question: DebateQuestion, wasCorrect: boolean) => void;
  endGame: () => void;
  resetGame: () => void;
  clearChoiceFeedback: () => void;
  joinRoom: (roomId: string, isHost?: boolean) => void;
  leaveRoom: () => void;
}

interface GameComputed {
  currentStoryNode: () => StoryNode;
  completionTime: () => number;
  finalScore: () => number;
}

const createFallbackNode = (nodeKey: string): StoryNode => ({
  tieuDe: 'Error: Story Node Not Found',
  vanBan: `The story node "${nodeKey}" could not be found. This might be a navigation error.`,
  hinhAnh: '',
  luaChon: [
    {
      vanBan: 'Return to World Map',
      nutTiepTheo: 'banDoTheGioi'
    }
  ]
});

export const useGameStore = create<GameState & GameActions & GameComputed>((set, get) => ({
  // Initial State
  currentNodeKey: 'batDau',
  globalSupport: 0,
  reputation: 0,
  startTime: null,
  endTime: null,
  history: ['batDau'],
  playerName: '',
  completedMissions: [],
  lastChoiceFeedback: null,
  playerId: ((): string => {
    if (typeof window === 'undefined') return 'server';
    const existing = localStorage.getItem('playerId');
    if (existing) return existing;
    const id = (crypto?.randomUUID?.() || Math.random().toString(36).slice(2, 10));
    localStorage.setItem('playerId', id);
    return id;
  })(),
  roomId: null,
  isHost: false,
  // Initial state for score update view
  viewingScoreUpdate: false,
  pendingNextNodeKey: null,
  lastChoiceEffects: null,

  // Actions
  startGame: (playerName: string) => {
    set({
      playerName,
      startTime: Date.now(),
      endTime: null,
      globalSupport: 0,
      reputation: 0,
      currentNodeKey: 'banDoTheGioi', 
      history: ['batDau', 'banDoTheGioi'],
      completedMissions: [],
    });
  },
  makeChoice: (nextNodeKey) => {
    const story = storyData as any;
    const nextNode = story[nextNodeKey];

    if (!nextNode) {
      console.error(`Story node "${nextNodeKey}" not found`);
      return;
    }

    const supportValue = nextNode.diemSo || 0;
    const repValue = nextNode.diemDanhVong || 0;

    // Update scores immediately so they are current for the update screen.
    set((state) => ({
      globalSupport: state.globalSupport + supportValue,
      reputation: state.reputation + repValue,
    }));

    // If the choice has score implications, pause the story flow
    // and trigger the intermediate score update screen.
    if (supportValue !== 0 || repValue !== 0) {
      set({
        viewingScoreUpdate: true,
        pendingNextNodeKey: nextNodeKey,
        lastChoiceEffects: { support: supportValue, reputation: repValue },
      });
    } else {
      // If there's no score change, navigate directly to the next node.
      if (nextNode.completedMissionId) {
        set(state => ({
          completedMissions: [...new Set([...state.completedMissions, nextNode.completedMissionId])]
        }));
      }
      set((state) => ({
        currentNodeKey: nextNodeKey,
        history: [...state.history, nextNodeKey],
        lastChoiceFeedback: 'neutral',
      }));
    }
  },
  // This action is called by the "Continue" button on the score update screen.
  confirmScoreUpdate: () => {
    const nextNodeKey = get().pendingNextNodeKey;
    if (!nextNodeKey) return;

    const story = storyData as any;
    const nextNode = story[nextNodeKey];

    if (nextNode.completedMissionId) {
      set(state => ({
        completedMissions: [...new Set([...state.completedMissions, nextNode.completedMissionId])]
      }));
    }

    // Determine feedback for the screen flash effect.
    const { support, reputation } = get().lastChoiceEffects || { support: 0, reputation: 0 };
    const totalChange = support + reputation;
    let feedback: ChoiceFeedback = 'neutral';
    if (totalChange >= 30) {
      feedback = 'good';
    } else if (totalChange < 0) {
      feedback = 'bad';
    }

    // Resume the story flow by navigating to the pending node.
    set((state) => ({
      currentNodeKey: nextNodeKey,
      history: [...state.history, nextNodeKey],
      lastChoiceFeedback: feedback,
      viewingScoreUpdate: false,
      pendingNextNodeKey: null,
      lastChoiceEffects: null,
    }));
  },
  answerDebateQuestion: (question, wasCorrect) => {
    const scoreEffect = (question as any).diemSo;
    const repEffect = (question as any).diemDanhVong;
    if (!scoreEffect || !repEffect) return;
    const supportChange = wasCorrect ? scoreEffect.dung : scoreEffect.sai;
    const repChange = wasCorrect ? repEffect.dung : repEffect.sai;
    set((state) => ({
      globalSupport: state.globalSupport + supportChange,
      reputation: state.reputation + repChange,
    }));
  },
  endGame: () => {
    if (get().endTime === null) {
      set({ endTime: Date.now() });
    }
  },
  resetGame: () => {
    set({
      currentNodeKey: 'batDau',
      globalSupport: 0,
      reputation: 0,
      startTime: null,
      endTime: null,
      history: ['batDau'],
      playerName: '',
      completedMissions: [],
      roomId: null,
      isHost: false,
      viewingScoreUpdate: false,
      pendingNextNodeKey: null,
      lastChoiceEffects: null,
    });
  },
  clearChoiceFeedback: () => {
    set({ lastChoiceFeedback: null });
  },
  joinRoom: (roomId: string, isHost = false) => {
    set({ roomId, isHost });
  },
  leaveRoom: () => set({ roomId: null }),

  currentStoryNode: () => {
    const currentKey = get().currentNodeKey;
    const story = storyData as any;
    const node = story[currentKey];
    
    if (node) {
      return node as StoryNode;
    } else {
      console.error(`Story node "${currentKey}" not found, using fallback`);
      return createFallbackNode(currentKey);
    }
  },
  completionTime: () => {
    const { startTime, endTime } = get();
    if (startTime === null) return 0;
    const effectiveEnd = endTime ?? Date.now();
    return (effectiveEnd - startTime) / 1000;
  },
  finalScore: () => {
    const { globalSupport, reputation } = get();
    return globalSupport + (reputation * 3);
  },
}));
