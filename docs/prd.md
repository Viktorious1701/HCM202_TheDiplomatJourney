# The Diplomat's Journey Product Requirements Document (PRD)

## Section 1: Goals and Background Context

**Goals:**

* To create an engaging, interactive web-based game that effectively teaches the principles of "đoàn kết quốc tế" from section 5.2.1.
* To develop a creative "product" that fulfills the core requirements of the university assignment, moving beyond a standard presentation.
* To build a replayable experience with a scoring system and leaderboard to encourage student participation and friendly competition.
* To deliver a fully functional and polished project within a two-week timeframe and a zero-dollar budget.

**Background Context:**
This project addresses the challenge of making complex ideological concepts relevant and engaging for a modern student audience. Traditional lecture formats often fail to achieve deep learning or lasting interest. "The Diplomat's Journey" is designed to solve this by transforming passive learning into an active, decision-based experience. Players will learn the historical necessity and application of international solidarity by stepping into the role of a diplomat, making choices with tangible consequences, and connecting those historical lessons to present-day challenges.

**Change Log**

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-09-18 | 1.0 | Initial PRD creation. | PM Agent |

## Section 2: Requirements (Revised)

#### Functional Requirements

1. **FR1:** The application must display a point-and-click world map with at least three selectable mission locations.
2. **FR2:** Each mission must present the user with a text-based scenario, choices, and relevant historical imagery.
3. **FR3:** A user's choice must navigate them to a corresponding outcome screen that explains the ideological lesson.
4. **FR4:** The application must calculate and display a score based on the correctness of the user's choices.
5. **FR5:** The application must track the time taken for the user to complete the game.
6. **FR6:** At the end of the game, users must be able to enter their name.
7. **FR7:** The application must display a leaderboard of the top 10 scores. This leaderboard will be based on two criteria: **highest score** first, with **fastest completion time** as a tie-breaker.
8. **FR8:** The game's narrative content (scenarios, choices, outcomes) must be loaded from a local `story.json` file packaged with the application.
9. **FR9:** The leaderboard data must be saved to and read from the browser's **Local Storage**.

#### Non-Functional Requirements

1. **NFR1:** The application must be a **frontend-only** responsive website, usable on both desktop and mobile web browsers.
2. **NFR2:** The entire application must be deployable on a free-tier static hosting platform like Vercel or Netlify.
3. **NFR3:** The application **must not** have any external database or backend dependencies for its core functionality.
4. **NFR4:** All project dependencies and assets (images, fonts, etc.) must be free to use, adhering to the $0 budget.
5. **NFR5:** The average playthrough time should be designed to be between 15-20 minutes.

## Section 3: User Interface Design Goals

**Overall UX Vision:**
The user experience should be immersive, intuitive, and respectful of the historical subject matter. The interface will be clean and minimalist, prioritizing readability and ensuring the focus remains on the narrative content and historical imagery. The game should feel less like a complex video game and more like an interactive documentary or a digital museum exhibit.

**Key Interaction Paradigms:**

* **Point-and-Click Navigation:** The primary interaction on the main screen will be clicking on locations on a map.
* **Choice-Based Progression:** Within missions, the user will progress solely by clicking on choice buttons. No keyboard input is required for gameplay.
* **Minimalist UI:** There will be no complex menus or settings. The UI will consist of the map, the scenario/outcome text, choice buttons, and the score display.

**Core Screens and Views:**

* **Start Screen:** A simple screen with the game title, a brief introduction, and a "Begin Journey" button.
* **World Map Hub:** The central navigation screen displaying the world map with clickable mission locations.
* **Mission View:** Displays the scenario text, historical image, and choice buttons.
* **Outcome View:** Displays the result of a choice and the lesson learned.
* **End Game/Submit Score Screen:** Displays the final score and a form to enter a name for the leaderboard.
* **Leaderboard View:** Displays the top 10 scores.

**Accessibility:**

* **Target:** WCAG AA. We will ensure sufficient color contrast and that all interactions are navigable via keyboard as well as mouse.

**Branding:**

* The visual style will evoke a historical feel, possibly using sepia tones, period-appropriate fonts (e.g., serif fonts like 'Times New Roman' or 'Georgia'), and a layout reminiscent of historical documents or telegrams.

**Target Device and Platforms:**

* **Web Responsive:** The design must be fluid and function seamlessly on both desktop and mobile web browsers.

## Section 4: Technical Assumptions (Revised)

**Repository Structure: Single Repository**

* **Decision:** We will use a standard single repository for this project.
* **Rationale:** As a frontend-only application, a simple repository structure is sufficient. There is no need for the complexity of a monorepo, as there is no backend codebase to manage alongside the frontend.

**Service Architecture: Client-Side Application**

* **Decision:** The architecture will be purely "Client-Side." The application will be a static web app where all game logic and data persistence occurs within the user's browser.
* **Rationale:** This is the ultimate cost-effective and simple-to-deploy architecture. It has no external dependencies, making it fast and robust. It perfectly aligns with the frontend-only decision.

**Testing Requirements: Unit + Integration**

* **Decision:** The testing strategy will focus on unit tests for React components and integration tests for the logic that interacts with the browser's **Local Storage**.
* **Rationale:** This ensures the UI components render as expected and that our custom logic for saving and retrieving leaderboard data from the browser works correctly.

## Section 5: Epic List (Revised)

**Epic 1: The Core Narrative Experience**

* **Goal:** Deliver a complete, playable, single-player narrative game from start to finish. This epic focuses entirely on the story, choices, scoring, timing, and visual presentation. The output is a fully functional offline game that runs entirely in the browser.

**Epic 2: Local Leaderboard Implementation**

* **Goal:** Enhance the core game by adding a persistent leaderboard. This epic covers the functionality to save scores and completion times to the user's browser Local Storage and display the sorted results.

## Section 6: Epic 1 Details - The Core Narrative Experience

**Epic Goal:** Deliver a complete, playable, single-player narrative game from start to finish. This epic focuses entirely on the story, choices, scoring, timing, and visual presentation. The output is a fully functional offline game that runs entirely in the browser.

---

### Story 1.1: Project Foundation and Core Game Component

* **As a** developer,
* **I want** to set up a new React TypeScript project with all necessary dependencies,
* **so that** I have a stable foundation to build the game application.

  * **Acceptance Criteria:**
        1. A new React project is created using Vite or Create React App with the TypeScript template.
        2. A main `<Game />` component is created and renders a simple "Hello World" message.
        3. A `story.json` file is created with a placeholder "start" node.
        4. Linters (ESLint) and formatters (Prettier) are configured and operational.

---

### Story 1.2: Implement the Core Narrative Engine

* **As a** player,
* **I want** to read a scenario and click a choice,
* **so that** I can see the outcome and progress through the story.

  * **Acceptance Criteria:**
        1. The `<Game />` component reads and displays the `text` from the current node in `story.json`.
        2. The choices for the current node are rendered as clickable buttons.
        3. Clicking a choice button updates the game's state to the `next` node specified in the choice.
        4. The UI correctly displays the new scenario's text and choices after a selection is made.

---

### Story 1.3: Implement Scoring and Timer Mechanics

* **As a** player,
* **I want** a timer to start when the game begins and a score to be calculated based on my choices,
* **so that** I can measure my performance.

  * **Acceptance Criteria:**
        1. A timer starts when the first mission is selected and stops when the final outcome is reached.
        2. Choices in `story.json` can have an associated `scoreValue` (e.g., 20 points).
        3. Selecting a choice with a `scoreValue` correctly updates the player's total score.
        4. The current score is always visible on the screen.
        5. The final score and total completion time are stored in the game's state upon completion.

---

### Story 1.4: Build the Visual and Navigational Hub

* **As a** player,
* **I want** to see a world map and historical images,
* **so that** the game feels immersive and historically grounded.

  * **Acceptance Criteria:**
        1. The application's initial screen is a World Map Hub.
        2. The map displays clickable points for each mission defined in `story.json`.
        3. Clicking a mission point starts the narrative for that mission.
        4. During a mission, the relevant historical image (path specified in `story.json`) is displayed alongside the text.

---

### Story 1.5: Create the Game Completion Screen

* **As a** player,
* **I want** to see my final results and have the option to save my score after finishing the game,
* **so that** I can complete the gameplay loop.

  * **Acceptance Criteria:**
        1. Upon completing the final mission, a "Game Complete" screen is displayed.
        2. This screen shows the player's final score and their total completion time.
        3. An input field is available for the player to enter their name.
        4. A "Save to Leaderboard" button is present.

## Section 7: Epic 2 Details - Local Leaderboard Implementation

**Epic Goal:** Enhance the core game by adding a persistent leaderboard. This epic covers the functionality to save scores and completion times to the user's browser Local Storage and display the sorted results.

---

### Story 2.1: Save Game Results to Local Storage

* **As a** player,
* **I want** to click the "Save to Leaderboard" button and have my name, score, and time saved,
* **so that** my achievement is recorded for future viewing.

  * **Acceptance Criteria:**
        1. Clicking the "Save to Leaderboard" button on the completion screen triggers the save logic.
        2. A new entry containing the player's name, final score, and completion time is created.
        3. This new entry is added to an array of scores stored in the browser's Local Storage under a specific key (e.g., `hoChiMinhGameLeaderboard`).
        4. If no leaderboard data exists in Local Storage, a new array is created with the current score as the first entry.
        5. After saving, the user is automatically navigated to the Leaderboard screen.

---

### Story 2.2: Display Leaderboard from Local Storage

* **As a** user,
* **I want** to see a leaderboard screen displaying the top scores,
* **so that** I can see how my performance compares to others.

  * **Acceptance Criteria:**
        1. A dedicated Leaderboard screen is created and is accessible from the Start Screen.
        2. On screen load, the application retrieves the array of scores from Local Storage.
        3. The scores are sorted in descending order by `score`.
        4. For entries with the same `score`, they are then sorted in ascending order by `time` (faster time is better).
        5. The top 10 sorted entries are displayed in a clear, ranked list (e.g., #1, #2, etc.).
        6. The list displays the player's name, score, and completion time for each entry.
        7. If no scores are present in Local Storage, a message like "No scores yet. Be the first!" is displayed.

## Section 8: Checklist Results Report

I have validated the PRD against the **Product Manager (PM) Requirements Checklist**. The document has passed with a high degree of confidence.

* **Overall PRD Completeness:** 100%
* **MVP Scope Appropriateness:** Just Right. The scope is well-defined and achievable within the deadline.
* **Readiness for Next Phase:** Ready. The document is prepared for handoff to the UX Expert and Architect.

**Key Strengths:**

* The shift to a frontend-only architecture significantly de-risks the project.
* The two-epic structure provides a clear, prioritized path to completion, ensuring a viable product is ready even if time runs short.
* Acceptance criteria are specific, testable, and directly support the functional requirements.

**Critical Issues Identified:** None.

## Section 9: Next Steps

This PRD is now complete and serves as the official blueprint for "The Diplomat's Journey." The next logical steps involve engaging other specialists to detail the user experience and technical architecture.

**UX Expert Prompt:**
> "Here is the completed PRD for 'The Diplomat's Journey.' Please create a comprehensive **UI/UX Specification** (`front-end-spec.md`) that details the visual design, information architecture, and user flows based on the requirements and UI goals outlined in this document."

**Architect Prompt:**
> "Using the completed PRD and the upcoming UI/UX Specification, please create a detailed **Frontend Architecture Document** (`front-end-architecture.md`). This should include the final tech stack, component structure, state management plan, and the specific implementation pattern for using Local Storage for the leaderboard."
