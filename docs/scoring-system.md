### **New Scoring System: "The Alliance Multiplier"**

**Concept:**
Your `Reputation` score will no longer just add a flat bonus to your final score. Instead, it will act as a **multiplier** on the `Global Support` you earn in the final act of the game. This perfectly simulates the idea that a strong reputation makes your support far more effective.

### **How the Mechanic Works (Step-by-Step)**

1.  **Act 1 & 2 (Building the Foundation):**
    *   Throughout the Paris, Moscow, and Guangzhou missions, the player makes choices.
    *   Each choice affects their two scores as before:
        *   `Global Support`: A running total of immediate support gained.
        *   `Reputation`: A running total of their diplomatic integrity.
    *   The player can *see* their `Global Support` score rising, but the true value of their `Reputation` remains hidden and its importance is not yet obvious.

2.  **Act 3 (The Final Act - Pác Bó):**
    *   The player now faces the final set of challenges, applying their international gains to the revolution at home.
    *   The choices in this act will award a final, large chunk of "Victory Points."
    *   **This is where the multiplier kicks in.**

### **The New Final Score Calculation**

The formula in our PRD needs to be updated. Here is the new, more powerful calculation for the leaderboard:

**Final Score = `Global Support` (from Acts 1 & 2) + (Victory Points (from Act 3) * Reputation Multiplier)**

The **Reputation Multiplier** is calculated based on your final `Reputation` score. Here's a sample model:

| Final Reputation Score | Reputation Multiplier | Diplomatic Status |
| :--- | :--- | :--- |
| > 75 | **x 3.0** | Legendary Diplomat |
| 50 to 74 | **x 2.0** | Respected Strategist |
| 25 to 49 | **x 1.5** | Trustworthy Ally |
| 0 to 24 | **x 1.0** | Neutral Figure |
| -25 to -1 | **x 0.5** | Unreliable Partner |
| < -25 | **x 0.1** | Known Opportunist |

### **Example Scenario (Illustrating the Power of the Multiplier)**

Let's imagine two players enter Act 3.
*   **Player A (Principled):** `Global Support` = 100, `Reputation` = 80 (Legendary)
*   **Player B (Opportunistic):** `Global Support` = 150 (higher!), `Reputation` = -30 (Opportunist)

Now, in Act 3, they both make the exact same correct choices and earn **50 Victory Points**.

*   **Player A's Final Score:** 100 + (50 * **3.0**) = 100 + 150 = **250**
*   **Player B's Final Score:** 150 + (50 * **0.1**) = 150 + 5 = **155**

**The result is perfect:**
Even though Player B had more `Global Support` points going into the final act, their terrible reputation made that support ineffective. Player A, who sacrificed short-term gains to build a high reputation, sees their efforts pay off exponentially at the end.
