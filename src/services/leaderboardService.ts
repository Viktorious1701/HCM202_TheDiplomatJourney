// path: the-diplomats-journey/src/services/leaderboardService.ts
import { createClient } from '@supabase/supabase-js';
import type { LeaderboardEntry } from '../types';

// These credentials are now read securely from your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LEADERBOARD_TABLE = 'leaderboard';

// Function to get the top 10 scores from the Supabase table
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const { data, error } = await supabase
    .from(LEADERBOARD_TABLE)
    .select('name, score, time')
    .order('score', { ascending: false }) // Primary sort: score descending
    .order('time', { ascending: true })   // Secondary sort: time ascending
    .limit(10);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
  return data || [];
};

// Function to add a new score to the Supabase table
export const addScore = async (newEntry: LeaderboardEntry): Promise<LeaderboardEntry[] | null> => {
  const { error } = await supabase
    .from(LEADERBOARD_TABLE)
    .insert([newEntry]);

  if (error) {
    console.error('Error adding score:', error);
    return null;
  }
  
  // After adding, return the new top 10 list
  return await getLeaderboard();
};