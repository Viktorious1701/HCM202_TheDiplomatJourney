/* eslint-disable @typescript-eslint/no-unused-vars */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/hero-section';
import TimelinePage from './pages/TimelinePage';
import { useState } from 'react';

function App() {
  // We introduce a state to track which view is active.
  const [currentView, setCurrentView] = useState('hero');

  const handleBeginJourney = () => {
    // This function will be called by the button to switch the view.
    setCurrentView('game');
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;