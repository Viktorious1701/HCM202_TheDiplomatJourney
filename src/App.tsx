// the-diplomats-journey/src/App.tsx
// path: the-diplomats-journey/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/hero-section';
import { GamePage } from './pages/GamePage';
import TimelinePage from './pages/TimelinePage';
import PresentationPage from './pages/PresentationPage';
import LeaderboardPage from './pages/LeaderboardPage'; // Import the new page

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/presentations" element={<PresentationPage />} />
          {/* Add the route for the leaderboard */}
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;