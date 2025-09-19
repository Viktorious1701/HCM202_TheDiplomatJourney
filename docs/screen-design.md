# UI Component and Screen Layout Specification

This document provides a detailed visual blueprint for the user interface of "The Diplomat's Journey." It is based on the core design principle of an "interactive historical document" and serves as the primary guide for frontend development.

## 1. Overall Visual Theme

*   **Aesthetic:** The game should feel like an authentic, interactive historical artifact. The design is minimalist, focusing on immersion and narrative content.
*   **Background:** A consistent, high-quality texture of aged parchment or old paper will be used for all screens.
*   **Imagery:** All historical images will be styled with a consistent sepia tone and a subtle grainy film texture to ensure visual cohesion.
*   **Interactivity:** Interactive elements will have clear but understated hover and focus states (e.g., color changes, subtle underlines) that fit the historical theme.

## 2. Core Style Guide

#### **Color Palette**
*   **Parchment (Background):** `#FBF5E5`
*   **Ink (Primary Text):** `#3D3522`
*   **Faded Ink (Secondary Text):** `#856A4A`
*   **Accent (Buttons & Links):** `#A52A2A` (Brown Rust)
*   **Highlight (Hover):** `#D2B48C` (Soft Tan)

#### **Typography**
*   **Primary Font (Narrative & Headers):** 'Playfair Display', serif
*   **Secondary Font (UI Elements):** 'Lato', sans-serif

## 3. Screen Layouts and Components

### **Screen 1: Start Screen**

*   **Layout:** A single, vertically centered column.
*   **Components:**
    1.  **Game Title:** "The Diplomat's Journey" in a large, stylized 'Playfair Display' font.
    2.  **Primary Image:** A single, powerful AI-generated historical image representing the game's theme.
    3.  **Introduction Text:** 2-3 sentences of introductory text in 'Playfair Display'.
    4.  **"Begin Journey" Button:** A prominent button styled with the accent color.

```
+----------------------------------------+
|                                        |
|        THE DIPLOMAT'S JOURNEY          |
|                                        |
| +------------------------------------+ |
| |      <AI-Generated Image>        | |
| +------------------------------------+ |
|                                        |
|   "The year is 1930. Your mission..."  |
|                                        |
|           [ Begin Journey ]            |
|                                        |
+----------------------------------------+
```

### **Screen 2: World Map Hub**

*   **Layout:** Full-screen map with a persistent header.
*   **Components:**
    1.  **Header:** A thin, dark bar (`--ink-color`) across the top.
        *   **Left:** "Home" icon (Phosphor Icons, thin weight).
        *   **Right:** "Global Support Score: [Score]" in 'Lato' font.
    2.  **World Map:** A vintage-style world map image.
    3.  **Map Markers:** 2-3 interactive markers on the map.
        *   **Default State:** A simple, thematic marker (e.g., a small red pin).
        *   **Hover State:** Marker glows slightly, and a tooltip with the location name (e.g., "Paris") appears.
        *   **Completed State:** Marker color changes to faded ink to show the mission is done.

### **Screen 3: Mission View**

*   **Layout:** Two-column on desktop; stacks to a single column on mobile.
*   **Components:**
    1.  **Header:** The persistent header remains visible.
    2.  **Image Column:** A dedicated space showing the AI-generated historical image for the current scenario.
    3.  **Narrative Column:**
        *   **Narrative Box:** A container with a subtle border to resemble a separate piece of paper.
        *   **Scenario Text:** The main story text in 'Playfair Display'.
        *   **Choice Buttons:** 2-3 buttons displayed vertically, using the 'Lato' font.

```
+----------------------------------------+
| [Home Icon]      Score: [##]           |
+----------------------------------------+
|                  |                     |
| +--------------+ |  "You are at a..   |
| |              | |   ..meeting in     |
| |  <Historic  | |   Paris. What do   |
| |   Image>   | |   you do?"         |
| |              | |                    |
| +--------------+ |  [ Choice A ]      |
|                  |  [ Choice B ]      |
|                  |                     |
+----------------------------------------+
```

### **Screen 4: Game Complete & Submit Score Screen**

*   **Layout:** A single, centered column, similar to the Start Screen.
*   **Components:**
    1.  **Title:** "Journey Complete" in H2 style.
    2.  **Final Results Display:**
        *   "Final Score: [Score]"
        *   "Completion Time: [Time]"
    3.  **Name Input Form:**
        *   A simple text label: "Enter Your Name:"
        *   A text input field, styled to match the historical theme (e.g., an underlined input area).
    4.  **"Save to Leaderboard" Button:** The primary action button.

### **Screen 5: Leaderboard View**

*   **Layout:** A single, centered list with a clear title.
*   **Components:**
    1.  **Header:** The persistent header remains visible.
    2.  **Title:** "Leaderboard" in H2 style.
    3.  **Leaderboard List:** A formatted list or simple table.
        *   **Columns:** Rank | Name | Score | Time
        *   Each row will be a `LeaderboardRow` component.
    4.  **"Play Again" Button:** A button to navigate the user back to the Start Screen.