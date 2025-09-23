// the-diplomats-journey/src/stores/gameStore.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import storyData from '../data/story.json';
import type { StoryNode, DebateQuestion } from '../types';

// Define feedback types for visual effects.
type ChoiceFeedback = 'good' | 'neutral' | 'bad' | null;

interface GameState {
  currentNodeKey: string;
  globalSupport: number;
  reputation: number;
  startTime: number | null;
  endTime: number | null;
  history: string[];
  playerName: string;
  completedMissions: string[]; // To track completed missions
  lastChoiceFeedback: ChoiceFeedback; // State to trigger visual feedback
  playerId: string; // persistent unique id per browser
  roomId: string | null; // current joined room (ephemeral)
  isHost: boolean; // whether this client created the room
}

interface GameActions {
  startGame: (playerName: string) => void;
  makeChoice: (nextNodeKey: string) => void;
  answerDebateQuestion: (question: DebateQuestion, wasCorrect: boolean) => void;
  endGame: () => void;
  resetGame: () => void;
  clearChoiceFeedback: () => void; // Action to reset feedback state
  joinRoom: (roomId: string, isHost?: boolean) => void;
  leaveRoom: () => void;
}

interface GameComputed {
  currentStoryNode: () => StoryNode;
  completionTime: () => number;
  finalScore: () => number;
}

// Create a fallback node for when we can't find the requested node
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
  lastChoiceFeedback: null, // Initialize feedback state to null.
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

    // If the next node doesn't exist, log error and don't navigate
    if (!nextNode) {
      console.error(`Story node "${nextNodeKey}" not found`);
      return;
    }

    if (nextNode.completedMissionId) {
      set(state => ({
        completedMissions: [...new Set([...state.completedMissions, nextNode.completedMissionId])]
      }));
    }
    
    const supportValue = nextNode.diemSo || 0;
    const repValue = nextNode.diemDanhVong || 0;
    const totalChange = supportValue + repValue;

    // Determine the feedback type based on the total point change from the choice.
    let feedback: ChoiceFeedback = 'neutral'; // Default to yellow for neutral or minor positive choices.
    if (totalChange >= 30) {
      feedback = 'good'; // Green for significantly positive choices.
    } else if (totalChange < 0) {
      feedback = 'bad'; // Red for any choice with a negative outcome.
    }

    set((state) => ({
      globalSupport: state.globalSupport + supportValue,
      reputation: state.reputation + repValue,
      currentNodeKey: nextNodeKey,
      history: [...state.history, nextNodeKey],
      lastChoiceFeedback: feedback, // Set the feedback for the UI to consume.
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
    });
  },
  // Action to reset the feedback state after the UI effect has been shown.
  clearChoiceFeedback: () => {
    set({ lastChoiceFeedback: null });
  },
  joinRoom: (roomId: string, isHost = false) => {
    set({ roomId, isHost });
  },
  leaveRoom: () => set({ roomId: null }),

  // Computed Properties (Getters)
  currentStoryNode: () => {
    const currentKey = get().currentNodeKey;
    const story = storyData as any;
    const node = story[currentKey];
    
    // Return the found node or a fallback if not found
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