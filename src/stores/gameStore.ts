/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import storyData from '../data/story.json';
import type { StoryNode } from '../types';

interface GameState {
  currentNodeKey: string;
  globalSupport: number;
  reputation: number;
  startTime: number | null;
  endTime: number | null;
  history: string[];
  playerName: string; // Add playerName to the state
}

interface GameActions {
  startGame: (playerName: string) => void; // Update startGame to accept a name
  makeChoice: (nextNodeKey: string, supportValue?: number, repValue?: number) => void;
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

  // Actions
  startGame: (playerName: string) => {
    set({
      playerName, // Store the player's name
      startTime: Date.now(),
      endTime: null,
      globalSupport: 0,
      reputation: 0,
      // Transition to the first actual game screen
      currentNodeKey: 'banDoTheGioi', 
      history: ['batDau', 'banDoTheGioi'],
    });
  },
  makeChoice: (nextNodeKey, supportValue = 0, repValue = 0) => {
    set((state) => ({
      globalSupport: state.globalSupport + supportValue,
      reputation: state.reputation + repValue,
      currentNodeKey: nextNodeKey,
      history: [...state.history, nextNodeKey],
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
      playerName: '', // Reset player name
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
