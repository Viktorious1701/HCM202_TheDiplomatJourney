### **Project Brief: The Diplomat's Journey**

#### **1. Executive Summary**
This project, "The Diplomat's Journey," is a web-based, interactive narrative game designed to teach the core concepts of "Tư tưởng Hồ Chí Minh về đoàn kết quốc tế" (Topic 5.2.1). It replaces a traditional slide-based presentation with an engaging "product" where students make choices as a diplomat, learn the consequences, and see the real-world value of the ideology. The final product will be a React website featuring point-and-click navigation, a scoring system, historical imagery, and a live leaderboard powered by Supabase.

#### **2. Problem Statement**
The primary challenge is to present a complex, abstract ideological subject to a university class in a way that is memorable, engaging, and demonstrates practical value. Standard PowerPoint presentations often fail to capture student interest and make the material feel distant and irrelevant. The assignment explicitly asks for a creative "product" and a connection to modern reality, a bar that a simple lecture cannot meet. The product must be delivered within a 45-minute presentation slot, which includes both the presentation and the interactive activity.

#### **3. Proposed Solution**
We will develop "The Diplomat's Journey," a choice-based narrative game website.

*   **Platform:** React.js frontend, with Supabase for the leaderboard backend.
*   **Core Gameplay:** Players will navigate a world map to different historical locations (e.g., Paris, Moscow). At each location, they face a scenario requiring a diplomatic choice.
*   **Educational Mechanic:** Each choice is directly tied to a principle from section 5.2.1. The outcome of the choice will explain the relevant principle, reinforcing the lesson. A "Global Support" score will track the player's success.
*   **Visuals:** The game will be rich with historical photographs and imagery to create an immersive atmosphere and provide historical context.
*   **Engagement Feature:** A live leaderboard will display top scores, encouraging friendly competition and replayability among the students.

#### **4. Target Users**
The primary users are university students in the "Ho Chi Minh Marxism Lenin ideology" course. They are digitally native, familiar with video games and interactive web experiences, and are more likely to engage with active learning methods than passive lectures.

#### **5. Goals & Success Metrics**
*   **Academic Objective:** To successfully create a product that fulfills the two core assignment requirements: (1) creatively present a topic from Chapter 5, and (2) explain the product's value in a modern context.
*   **User Success Metric:** Students can articulate the core principles of "đoàn kết quốc tế" after playing the game.
*   **Key Performance Indicators (KPIs):**
    *   High level of student participation during the interactive session.
    *   A significant number of entries on the leaderboard.
    *   Positive qualitative feedback from the instructor and peers.

#### **6. MVP Scope (Minimum Viable Product)**
*   **Core Features (Must Have):**
    *   A functional React website, deployable to a public URL.
    *   A main "world map" screen for navigation.
    *   2-3 complete, playable "mission" scenarios based on section 5.2.1.
    *   A scoring system ("Global Support Score").
    *   Integration with Supabase for submitting and displaying a top-10 leaderboard.
    *   Inclusion of relevant historical images for each scenario.
*   **Out of Scope for MVP:**
    *   User accounts or persistent logins.
    *   Complex animations or custom-designed art assets.
    *   Content covering sections outside of 5.2.1.
    *   Mobile-specific app (the website will be responsive).

#### **7. Technical Considerations**
*   **Frontend:** React.js (using `create-react-app` or Vite).
*   **Backend (Leaderboard only):** Supabase (using their free tier).
*   **Hosting:** Vercel or Netlify (free tier).
*   **Game Logic:** A custom, lightweight engine using React's `useState` hook and a `story.json` file to hold the narrative content.

#### **8. Constraints & Assumptions**
*   **Timeline:** Strict 2-week deadline.
*   **Budget:** $0. All tools and assets must be free (e.g., free tiers of Supabase/Vercel, public domain imagery).
*   **Team Skills:** Assumes the team has foundational knowledge of React and can learn the basics of Supabase integration within the timeframe.
*   **Assumption:** An interactive game format is an effective and permissible way to meet the assignment's "creative product" requirement.

#### **9. Risks & Open Questions**
*   **Risk: Scope Creep.** The team may be tempted to add more missions or features than are achievable in two weeks. **Mitigation:** Strictly adhere to the MVP scope.
*   **Risk: Content Quality.** The narrative must be well-researched and educationally sound. **Mitigation:** Dedicate the first week primarily to scriptwriting and research before heavy coding begins.
*   **Risk: Technical Integration.** Connecting React to Supabase for the first time may present unforeseen challenges. **Mitigation:** "Spike" the leaderboard integration early in the second week to identify and solve any issues quickly.

#### **10. Next Steps**
*   **Immediate Action:** Begin research on section 5.2.1 to build the `story.json` script.
*   **PM Handoff:** This brief can be handed to a Product Manager (PM) or Product Owner (PO) to break down the MVP scope into epics and user stories.
*   **Architect Handoff:** This brief can be given to an Architect to create a formal `architecture.md` document detailing the frontend structure and the Supabase integration plan.

---

This document should give you a solid and professional foundation to move forward. You can now use this to guide your team's work or to consult with other specialist agents for the next phases of your project.