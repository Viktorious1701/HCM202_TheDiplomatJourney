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
    5.  **"View Leaderboard" Link:** A smaller, less prominent link below the main button.

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
|         < View Leaderboard >           |
+----------------------------------------+
```

### **Screen 2: World Map Hub**

*   **Layout:** Full-screen map with a persistent header.
*   **Components:**
    1.  **Header:** A thin, dark bar (`--ink-color`) across the top.
        *   **Left:** "Leaderboard" icon/link.
        *   **Right:** "Global Support: [Score]" in 'Lato' font. **Note:** The `Reputation` score is hidden from the player.
    2.  **World Map:** A vintage-style world map image.
    3.  **Map Markers:** Interactive markers on the map.
        *   **Default State:** A simple, thematic marker.
        *   **Hover State:** Marker glows, and a tooltip with the location name appears.
        *   **Completed State:** Marker is visually altered (e.g., greyed out) to show the mission is done.
    4.  **"Knowledge Hub" Icon:** A persistent icon (e.g., a book) in a corner of the screen to open the presentation slides.

### **Screen 3: Mission View**

*   **Layout:** Two-column on desktop; stacks to a single column on mobile.
*   **Components:**
    1.  **Header:** The persistent header remains visible, showing the updated `Global Support` score.
    2.  **Image Column:** A dedicated space showing the AI-generated historical image for the current scenario.
    3.  **Narrative Column:**
        *   **Narrative Box:** A container with a subtle border.
        *   **Scenario Text:** The main story text.
        *   **Choice Buttons:** 2-3 buttons displayed vertically. Choices are prefixed with a strategic hint (e.g., `(Chiến lược)`, `(Cơ hội)`) to guide the player's thinking without revealing the outcome.

```
+----------------------------------------+
| [Leaderboard]  Global Support: [##]    |
+----------------------------------------+
|                  |                     |
| +--------------+ |  "Jean, nhà xã hội |
| |              | |   chủ nghĩa Pháp,  |
| |  <Historic  | |   tiếp cận bạn..." |
| |   Image>   | |                    |
| |              | |                    |
| +--------------+ |  [ (Chiến lược) Lập luận... ] |
|                  |  [ (Cơ hội) Hứa hẹn...    ] |
|                  |                     |
+----------------------------------------+
```

### **Screen 4: Game Complete & Submit Score Screen**

*   **Layout:** A single, centered column.
*   **Components:**
    1.  **Title:** "Journey Complete"
    2.  **Final Results Display:**
        *   "Final Global Support: [Score]"
        *   "Completion Time: [Time]"
        *   **Note:** The final calculated score for the leaderboard is **not** shown here to maintain the mystery of the formula.
    3.  **Name Input Form:** "Enter Your Name:" and a text input field.
    4.  **"Submit to Leaderboard" Button:** The primary action button.

### **Screen 5: Leaderboard View**

*   **Layout:** A single, centered list.
*   **Components:**
    1.  **Header:** A simplified header, perhaps just a "Back to Start" button.
    2.  **Title:** "Leaderboard"
    3.  **Leaderboard List:** A formatted list or simple table.
        *   **Columns:** Rank | Name | Final Score
        *   **Note:** Only the final, calculated score is shown. The `Global Support`, `Reputation`, and `Time` components are hidden to make the ranking feel more impactful.
    4.  **"Play Again" Button:** A button to navigate the user back to the Start Screen.

### **Screen 6: Knowledge Hub (Presentation Slides)**

*   **Layout:** An overlay modal or a separate view that appears on top of the map.
*   **Components:**
    1.  **Title:** "Knowledge Hub: The Necessity of International Solidarity"
    2.  **Content Area:** A scrollable or paginated area that displays the text and images for each "slide."
    3.  **Navigation:** "Previous" and "Next" buttons to navigate between slides.
    4.  **"Close" Button:** To return the player to the World Map Hub.