import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/hero-section';
import { GamePage } from './pages/GamePage';
import TimelinePage from './pages/TimelinePage';
import PresentationPage from './pages/PresentationPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AiDisclosurePage from './pages/AiDisclosurePage'; // Import the AI disclosure page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/presentations" element={<PresentationPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          {/* Add the route for the AI disclosure page */}
          <Route path="/ai-disclosure" element={<AiDisclosurePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
