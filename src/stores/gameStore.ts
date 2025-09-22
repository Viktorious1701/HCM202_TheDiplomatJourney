/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import storyData from '../data/story.json';
import type { StoryNode, DebateQuestion } from '../types';

interface GameState {
  currentNodeKey: string;
  globalSupport: number;
  reputation: number;
  startTime: number | null;
  endTime: number | null;
  history: string[];
  playerName: string;
  completedMissions: string[]; // To track completed missions
}

interface GameActions {
  startGame: (playerName: string) => void;
  makeChoice: (nextNodeKey: string) => void;
  answerDebateQuestion: (question: DebateQuestion, wasCorrect: boolean) => void;
  endGame: () => void;
  resetGame: () => void;
}

interface GameComputed {
  currentStoryNode: () => StoryNode;
  completionTime: () => number;
  finalScore: () => number;
}

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
      completedMissions: [], // Reset progress on new game
    });
  },
  makeChoice: (nextNodeKey) => {
    const story = storyData as any;
    const nextNode = story[nextNodeKey];

    // Check if the destination node completes a mission and update state
    if (nextNode.completedMissionId) {
      set(state => ({
        completedMissions: [...new Set([...state.completedMissions, nextNode.completedMissionId])]
      }));
    }
    
    const supportValue = nextNode.diemSo || 0;
    const repValue = nextNode.diemDanhVong || 0;

    set((state) => ({
      globalSupport: state.globalSupport + supportValue,
      reputation: state.reputation + repValue,
      currentNodeKey: nextNodeKey,
      history: [...state.history, nextNodeKey],
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
      completedMissions: [], // Also reset completed missions
    });
  },

  // Computed Properties (Getters)
  currentStoryNode: () => {
    return (storyData as any)[get().currentNodeKey] as StoryNode;
  },
  completionTime: () => {
    const { startTime, endTime } = get();
    if (startTime === null || endTime === null) {
      return 0;
    }
    return (endTime - startTime) / 1000;
  },
  finalScore: () => {
    const { globalSupport, reputation } = get();
    return globalSupport + (reputation * 3);
  },
}));
