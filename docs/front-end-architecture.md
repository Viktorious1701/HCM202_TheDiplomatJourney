# The Diplomat's Journey Frontend Architecture Document

## Section 1: Frontend Tech Stack

This is the single source of truth for all development.

* **Framework:** React (`v18.x`)
* **Language:** TypeScript (`v5.x`)
* **Build Tool:** Vite
* **Styling:** CSS Modules with a global stylesheet for the theme.
* **State Management:** Zustand
* **Routing:** React Router (`v6.x`)
* **Testing:** Vitest and React Testing Library.
* **Linting/Formatting:** ESLint and Prettier.

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
│   │       ├── _variables.css  # CSS custom properties for theme
│   │       ├── global.css      # Global styles, font imports
│   │       └── reset.css       # CSS reset
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.css
│   │   │   └── Header/
│   │   │       ├── Header.tsx
│   │   │       └── Header.module.css
│   │   └── game/               # Game-specific components
│   │       ├── MapMarker/
│   │       ├── NarrativeBox/
│   │       └── LeaderboardRow/
│   ├── data/
│   │   └── story.json          # The core narrative script
│   ├── hooks/
│   │   └── useGameTimer.ts     # Custom hook for the timer logic
│   ├── services/
│   │   └── leaderboardService.ts # Logic for Local Storage interaction
│   ├── stores/
│   │   └── gameStore.ts        # Zustand store for game state
│   ├── types/
│   │   └── index.ts            # TypeScript types and interfaces
│   ├── views/                  # Top-level page components
│   │   ├── StartScreen.tsx
│   │   ├── WorldMapHub.tsx
│   │   ├── MissionView.tsx
│   │   └── LeaderboardView.tsx
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts           # Vite TypeScript environment types
├── tests/
│   ├── components/
│   │   └── Button.test.tsx
│   └── services/
│       └── leaderboardService.test.ts
├── .eslintrc.cjs
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Section 3: Component Standards

#### Component Template

**File:** `src/components/common/ExampleComponent/ExampleComponent.tsx`

```typescript
import styles from './ExampleComponent.module.css';

// 1. Define component props with TypeScript
interface ExampleComponentProps {
  title: string;
  onClick: () => void;
}

// 2. Use functional component syntax with props typing
export const ExampleComponent = ({ title, onClick }: ExampleComponentProps) => {
  // 3. Component logic here

  return (
    // 4. Use the `styles` object for CSS class names
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <button type="button" onClick={onClick} className={styles.button}>
        Click Me
      </button>
    </div>
  );
};
```

**File:** `src/components/common/ExampleComponent/ExampleComponent.module.css`

```css
/* 5. All styles are scoped to the component */
.wrapper {
  padding: 16px;
  border: 1px solid var(--ink-color);
  background-color: var(--parchment-color);
}

.title {
  color: var(--ink-color);
  font-family: var(--font-primary);
}

.button {
  /* Use theme variables defined in global.css */
  background-color: var(--accent-color);
  color: var(--parchment-color);
  font-family: var(--font-secondary);
  cursor: pointer;
}

.button:hover {
  background-color: var(--highlight-color);
}
```

#### Naming Conventions

* **Component Folders:** `PascalCase` (e.g., `Button`)
* **Component Files:** `PascalCase.tsx` (e.g., `Button.tsx`)
* **CSS Module Files:** `PascalCase.module.css` (e.g., `Button.module.css`)
* **Test Files:** `PascalCase.test.tsx` (e.g., `Button.test.tsx`)
* **Hooks:** `camelCase` prefixed with `use` (e.g., `useGameTimer.ts`)
* **Services & Stores:** `camelCase` (e.g., `leaderboardService.ts`, `gameStore.ts`)

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
  score: number;
  startTime: number | null;
  endTime: number | null;
  history: string[];
}

interface GameActions {
  startGame: () => void;
  makeChoice: (nextNodeKey: string, scoreValue?: number) => void;
  endGame: () => void;
  resetGame: () => void;
}

interface GameComputed {
  currentStoryNode: () => StoryNode;
  completionTime: () => number;
}

export const useGameStore = create<GameState & GameActions & GameComputed>((set, get) => ({
  // Initial State
  currentNodeKey: 'start',
  score: 0,
  startTime: null,
  endTime: null,
  history: [],

  // Actions
  startGame: () => {
    set({
      startTime: Date.now(),
      endTime: null,
      score: 0,
      currentNodeKey: 'start',
      history: ['start'],
    });
  },
  makeChoice: (nextNodeKey, scoreValue = 0) => {
    set((state) => ({
      score: state.score + scoreValue,
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
      currentNodeKey: 'start',
      score: 0,
      startTime: null,
      endTime: null,
      history: [],
    });
  },

  // Computed Properties (Getters)
  currentStoryNode: () => {
    return storyData[get().currentNodeKey] as StoryNode;
  },
  completionTime: () => {
    const { startTime, endTime } = get();
    if (startTime && endTime) {
      return (endTime - startTime) / 1000; // Return time in seconds
    }
    return 0;
  },
}));
```

## Section 5: API Integration (Local Storage Service)

#### Service Template

**File:** `src/services/leaderboardService.ts`

```typescript
import { LeaderboardEntry } from '../types';

const LEADERBOARD_KEY = 'hoChiMinhGameLeaderboard';
const MAX_ENTRIES = 10;

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const rawData = localStorage.getItem(LEADERBOARD_KEY);
    if (!rawData) {
      return [];
    }
    const entries: LeaderboardEntry[] = JSON.parse(rawData);
    return entries;
  } catch (error) {
    console.error("Failed to parse leaderboard data:", error);
    return [];
  }
};

export const addScore = (newEntry: LeaderboardEntry): LeaderboardEntry[] => {
  const currentLeaderboard = getLeaderboard();
  const updatedLeaderboard = [...currentLeaderboard, newEntry];

  updatedLeaderboard.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return a.time - b.time;
  });

  const finalLeaderboard = updatedLeaderboard.slice(0, MAX_ENTRIES);

  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(finalLeaderboard));
  } catch (error) {
    console.error("Failed to save leaderboard data:", error);
  }
  
  return finalLeaderboard;
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

* **Rule 1: Isolate Local Storage.** All interaction with `localStorage` **must** go through the `leaderboardService`.
* **Rule 2: Centralized State.** All shared game state **must** be managed within the Zustand `gameStore`.
* **Rule 3: Use Theme Variables.** All CSS values for colors, fonts, and spacing **must** use the `var(--variable-name)` syntax.
* **Rule 4: Type Everything.** All component props, function arguments, and state variables **must** have explicit TypeScript types.
* **Rule 5: Static Content in JSON.** All narrative text, choices, and image paths **must** reside in `story.json`.
