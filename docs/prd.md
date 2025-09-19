# The Diplomat's Journey Product Requirements Document (PRD)

## Section 1: Goals and Background Context

**Goals:**

*   To create an engaging, interactive web-based game that effectively teaches the principles of "đoàn kết quốc tế" from section 5.2.1.
*   To develop a creative "product" that fulfills the core requirements of the university assignment, moving beyond a standard presentation.
*   To build a replayable experience with a scoring system and a shared, competitive leaderboard to encourage student participation.
*   To deliver a fully functional and polished project within a two-week timeframe.

**Background Context:**
This project addresses the challenge of making complex ideological concepts relevant and engaging for a modern student audience. Traditional lecture formats often fail to achieve deep learning or lasting interest. "The Diplomat's Journey" is designed to solve this by transforming passive learning into an active, decision-based experience. Players will learn the historical necessity and application of international solidarity by stepping into the role of a diplomat, making choices with tangible consequences, and connecting those historical lessons to present-day challenges.

**Change Log**

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2025-09-18 | 1.0 | Initial PRD creation. | PM Agent |
| 2025-09-18 | 2.0 | Re-introduced Supabase backend for shared leaderboard. | PM Agent |

## Section 2: Requirements (Revised V2)

#### Functional Requirements

1.  **FR1:** The application must display a point-and-click world map with at least three selectable mission locations.
2.  **FR2:** Each mission must present the user with a text-based scenario, choices, and relevant historical imagery.
3.  **FR3:** A user's choice must navigate them to a corresponding outcome screen that explains the ideological lesson.
4.  **FR4:** The application must calculate and display a `Global Support` score and a hidden `Reputation` score based on the user's choices.
5.  **FR5:** The application must track the time taken for the user to complete the game.
6.  **FR6:** At the end of the game, users must be able to enter their name.
7.  **FR7:** The application must display a shared, real-time leaderboard of the top 10 scores, retrieved from a central database.
8.  **FR8:** The game's narrative content (scenarios, choices, outcomes) must be loaded from a local `story.json` file.
9.  **FR9:** Leaderboard data must be saved to and read from a central **Supabase database** via its API.
10. **FR10:** The final score for the leaderboard will be calculated using a formula: `Final Score = Global Support +
 (Reputation * 3)`.
11. **FR11:**: In certain scenarios, the user must be able to click on interactive objects or icons in the environment (e.g., a notebook, a lightbulb) to reveal hints or relevant theoretical knowledge.

#### Non-Functional Requirements

1.  **NFR1:** The application must be a responsive website with a static frontend and a **Backend-as-a-Service (BaaS)** for its leaderboard functionality.
2.  **NFR2:** The entire application must be deployable on a free-tier static hosting platform (e.g., Vercel, Netlify).
3.  **NFR3:** The application will have a single external database dependency: the **Supabase free tier** for the leaderboard.
4.  **NFR4:** All project dependencies and assets (images, fonts, etc.) must be free to use.
5.  **NFR5:** The average playthrough time should be designed to be between 15-20 minutes.

## Section 3: User Interface Design Goals

**Overall UX Vision:**
The user experience should be immersive, intuitive, and respectful of the historical subject matter. The interface will be clean and minimalist, prioritizing readability and ensuring the focus remains on the narrative content and historical imagery. The game should feel less like a complex video game and more like an interactive documentary or a digital museum exhibit.

**Key Interaction Paradigms:**

*   **Point-and-Click Navigation:** The primary interaction on the main screen will be clicking on locations on a map.
*   **Choice-Based Progression:** Within missions, the user will progress solely by clicking on choice buttons.
*   **Minimalist UI:** There will be no complex menus or settings.

**Core Screens and Views:**

*   Start Screen
*   World Map Hub
*   Mission View
*   Outcome View
*   End Game/Submit Score Screen
*   Leaderboard View

**Accessibility:** Target WCAG AA.

**Branding:** The visual style will evoke a historical feel (sepia tones, period-appropriate fonts).

**Target Device and Platforms:** Web Responsive.

## Section 4: Technical Assumptions (Revised)

**Repository Structure: Single Repository**

*   **Rationale:** A simple repository structure is sufficient for a project with a React frontend and light BaaS integration.

**Service Architecture: Static Frontend + BaaS**

*   **Decision:** The architecture will be a static React web app with serverless functions and a database provided by Supabase for the leaderboard.
*   **Rationale:** This is a modern, cost-effective, and scalable architecture (the Jamstack model) that is ideal for this project's needs.

**Testing Requirements: Unit + Integration**

*   **Decision:** The testing strategy will focus on unit tests for React components and integration tests for the service that connects to the **Supabase API**.
*   **Rationale:** This ensures UI components render correctly and that the application can successfully communicate with the live backend.

## Section 5: Epic List (Revised)

**Epic 1: The Core Narrative Experience**

*   **Goal:** Deliver a complete, playable, single-player narrative game from start to finish, including the dual-score (`Global Support` and `Reputation`) system.

**Epic 2: Supabase Leaderboard Integration**

*   **Goal:** Enhance the core game by adding a shared, competitive leaderboard. This epic covers all functionality for saving scores to and retrieving scores from the central Supabase database.

## Section 6: Epic 1 Details - The Core Narrative Experience

(Story details remain largely the same, but the implementation of Story 1.3 will now include tracking the hidden `Reputation` score in the state.)

---

### Story 1.1: Project Foundation and Core Game Component
*   **Acceptance Criteria:**
    1.  New React project created (Vite, TypeScript).
    2.  `<Game />` component created.
    3.  `story.json` file created.
    4.  Linters and formatters configured.

---

### Story 1.2: Implement the Core Narrative Engine
*   **Acceptance Criteria:**
    1.  Component displays text from `story.json`.
    2.  Choices are rendered as buttons.
    3.  Clicking a choice updates the game state to the next node.
    4.  UI correctly re-renders with new content.

---

### Story 1.3: Implement Scoring and Timer Mechanics
*   **Acceptance Criteria:**
    1.  A timer starts and stops correctly.
    2.  Choices in `story.json` can have `scoreValue` and `reputationValue`.
    3.  Selecting a choice correctly updates both the `Global Support` and `Reputation` scores in the state.
    4.  The `Global Support` score is always visible on screen.
    5.  The final scores and time are stored in the game's state upon completion.

---

### Story 1.4: Build the Visual and Navigational Hub
*   **Acceptance Criteria:**
    1.  Initial screen is a World Map Hub.
    2.  Map displays clickable mission points.
    3.  Clicking a point starts the mission narrative.
    4.  Relevant historical images are displayed during missions.

---

### Story 1.5: Create the Game Completion Screen
*   **Acceptance Criteria:**
    1.  A "Game Complete" screen is displayed at the end.
    2.  Screen shows the player's final `Global Support` score and completion time.
    3.  An input field is available for the player to enter their name.
    4.  A "Save to Leaderboard" button is present.

## Section 7: Epic 2 Details - Supabase Leaderboard Integration

**Epic Goal:** Enhance the core game by adding a shared, competitive leaderboard. This epic covers all functionality for saving scores to and retrieving scores from the central Supabase database.

---

### Story 2.1: Save Game Results to Supabase
*   **Acceptance Criteria:**
    1.  Clicking the "Save to Leaderboard" button triggers the save logic.
    2.  A new entry is created containing the player's name and their **calculated final score** (`Global Support + (Reputation * 3)`).
    3.  The entry is sent to the `leaderboard` table in the Supabase database via the API.
    4.  After a successful save, the user is automatically navigated to the Leaderboard screen.

---

### Story 2.2: Display Leaderboard from Supabase
*   **Acceptance Criteria:**
    1.  A dedicated Leaderboard screen is created.
    2.  On screen load, the application fetches the top 10 scores from the Supabase database.
    3.  The Supabase query is configured to sort the data correctly (by score, then time).
    4.  The top 10 entries are displayed in a clear, ranked list.
    5.  If no scores are present, a "No scores yet" message is displayed.

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
