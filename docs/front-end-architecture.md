# The Diplomat's Journey Frontend Architecture Document

## Section 1: Frontend Tech Stack

This is the single source of truth for all development.

*   **Framework:** React (`v18.x`)
*   **Language:** TypeScript (`v5.x`)
*   **Build Tool:** Vite
*   **Backend as a Service:** Supabase
*   **Styling:** CSS Modules with a global stylesheet for the theme.
*   **State Management:** Zustand
*   **Routing:** React Router (`v6.x`)
*   **Testing:** Vitest and React Testing Library.
*   **Linting/Formatting:** ESLint and Prettier.

## Section 2: Project Structure

```plaintext
/the-diplomats-journey
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── world-map.png
│   │   │   └── missions/
│   │   │       ├── paris-mission.jpg
│   │   │       └── ...
│   │   └── fonts/
│   │       ├── PlayfairDisplay.ttf
│   │       └── Lato.ttf
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── _variables.css
│   │       ├── global.css
│   │       └── reset.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   └── Header/
│   │   └── game/
│   │       ├── MapMarker/
│   │       ├── NarrativeBox/
│   │       └── LeaderboardRow/
│   ├── data/
│   │   └── story.json
│   ├── hooks/
│   │   └── useGameTimer.ts
│   ├── services/
│   │   └── leaderboardService.ts # Logic for Supabase interaction
│   ├── stores/
│   │   └── gameStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── views/
│   │   ├── StartScreen.tsx
│   │   ├── WorldMapHub.tsx
│   │   ├── MissionView.tsx
│   │   └── LeaderboardView.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── components/
│   │   └── Button.test.tsx
│   └── services/
│       └── leaderboardService.test.ts
├── .env.local                  # Supabase credentials
├── .eslintrc.cjs
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Section 3: Component Standards

#### Component Template
(No changes to this section)

#### Naming Conventions
(No changes to this section)

## Section 4: State Management

#### Store Structure
**File:** `src/stores/gameStore.ts`

#### State Management Template (Zustand Store)
```typescript
import { create } from 'zustand';
import storyData from '../data/story.json';
import { StoryNode } from '../types';

interface GameState {
  currentNodeKey: string;
  globalSupport: number; // UPDATED
  reputation: number;      // UPDATED
  startTime: number | null;
  endTime: number | null;
  history: string[];
}

interface GameActions {
  startGame: () => void;
  makeChoice: (nextNodeKey: string, supportValue?: number, repValue?: number) => void; // UPDATED
  endGame: () => void;
  resetGame: () => void;
}

interface GameComputed {
  currentStoryNode: () => StoryNode;
  completionTime: () => number;
  finalScore: () => number; // UPDATED
}

export const useGameStore = create<GameState & GameActions & GameComputed>((set, get) => ({
  // Initial State
  currentNodeKey: 'start',
  globalSupport: 0,
  reputation: 0,
  startTime: null,
  endTime: null,
  history: [],

  // Actions
  startGame: () => {
    set({
      startTime: Date.now(),
      endTime: null,
      globalSupport: 0,
      reputation: 0,
      currentNodeKey: 'start',
      history: ['start'],
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
  resetGame: () => { /* ... */ },

  // Computed Properties (Getters)
  currentStoryNode: () => {
    return storyData[get().currentNodeKey] as StoryNode;
  },
  completionTime: () => { /* ... */ },
  finalScore: () => {
    const { globalSupport, reputation } = get();
    // Final Score = Global Support + (Reputation * 3)
    return globalSupport + (reputation * 3);
  },
}));
```

## Section 5: API Integration (Supabase Service)

#### Service Template
**File:** `src/services/leaderboardService.ts`
```typescript
import { createClient } from '@supabase/supabase-js';
import { LeaderboardEntry } from '../types';

// These credentials must be stored in environment variables (.env.local file)
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
```

## Section 6: Routing

#### Route Configuration

**File:** `src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartScreen } from './views/StartScreen';
import { WorldMapHub } from './views/WorldMapHub';
import { MissionView } from './views/MissionView';
import { LeaderboardView } from './views/LeaderboardView';
import { Header } from './components/common/Header/Header';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/map" element={<WorldMapHub />} />
          <Route path="/mission/:missionId" element={<MissionView />} />
          <Route path="/leaderboard" element={<LeaderboardView />} />
          <Route path="*" element={<StartScreen />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
```

## Section 7: Styling Guidelines

#### Global Theme Variables

**File:** `src/assets/styles/_variables.css`

```css
:root {
  /* Color Palette */
  --parchment-color: #FBF5E5;
  --ink-color: #3D3522;
  --faded-ink-color: #856A4A;
  --accent-color: #A52A2A;
  --highlight-color: #D2B48C;

  /* Typography */
  --font-primary: 'Playfair Display', serif;
  --font-secondary: 'Lato', sans-serif;

  /* Font Sizes */
  --font-size-h1: 48px;
  --font-size-h2: 32px;
  --font-size-body: 18px;
  --font-size-ui: 16px;

  /* Spacing (8-point grid system) */
  --space-xs: 8px;
  --space-s: 16px;
  --space-m: 24px;
  --space-l: 32px;
  --space-xl: 48px;
}
```

## Section 8: Testing Requirements

#### Component Test Template

**File:** `tests/components/Button.test.tsx`

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../src/components/common/Button/Button';

describe('Button Component', () => {
  it('should render with the correct text', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should call the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Section 9: Frontend Developer Standards

*   **Rule 1: Isolate Supabase.** All interaction with the Supabase client **must** go through the `leaderboardService`.
*   **Rule 2: Centralized State.** All shared game state **must** be managed within the Zustand `gameStore`.
*   **Rule 3: Use Theme Variables.** All CSS values **must** use the `var(--variable-name)` syntax.
*   **Rule 4: Type Everything.** All component props, function arguments, and state variables **must** have explicit TypeScript types.
*   **Rule 5: Static Content in JSON.** All narrative text, choices, and image paths **must** reside in `story.json`.
*   **Rule 6: Secure Credentials.** Supabase URL and anon key **must** be stored in a `.env.local` file and accessed via `import.meta.env`. They must never be hardcoded in the source code.