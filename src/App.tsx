// path: the-diplomats-journey/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/hero-section';
import { GamePage } from './pages/GamePage';
import TimelinePage from './pages/TimelinePage';
import PresentationPage from './pages/PresentationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/presentations" element={<PresentationPage />} />
          {/* Add other main pages like Timeline and Biography here if they become full pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;