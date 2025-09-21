/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import storyData from '../data/story.json';
import type { StoryNode } from '../types'; // CORRECTED: Using 'import type'

interface GameState {
  currentNodeKey: string;
  globalSupport: number;
  reputation: number;
  startTime: number | null;
  endTime: number | null;
  history: string[];
}

interface GameActions {
  makeChoice: (nextNodeKey: string, supportValue?: number, repValue?: number) => void;
  // Other actions will be added in later stories
}

interface GameComputed {
  currentStoryNode: () => StoryNode;
}

// NOTE: This is a partial implementation for Story 1.2.
// Timer, scoring, and other actions will be added in Story 1.3.
export const useGameStore = create<GameState & GameActions & GameComputed>((set, get) => ({
  // Initial State
  currentNodeKey: 'batDau', // Start at the beginning node
  globalSupport: 0,
  reputation: 0,
  startTime: null,
  endTime: null,
  history: ['batDau'],

  // Actions
  makeChoice: (nextNodeKey) => {
    // Scoring logic will be added in Story 1.3
    set((state) => ({
      currentNodeKey: nextNodeKey,
      history: [...state.history, nextNodeKey],
    }));
  },

  // Computed Properties (Getters)
  currentStoryNode: () => {
    // The 'as any' is a temporary workaround until we properly type the story.json import
    return (storyData as any)[get().currentNodeKey] as StoryNode;
  },
}));