import { useState } from 'react';
import HeroSection from './components/hero-section';
import { GamePage } from './pages/GamePage';

function App() {
  // We introduce a state to track which view is active.
  const [currentView, setCurrentView] = useState('hero');

  const handleBeginJourney = () => {
    // This function will be called by the button to switch the view.
    setCurrentView('game');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'hero' && (
        <HeroSection onBeginJourney={handleBeginJourney} />
      )}
      
      {currentView === 'game' && (
        <GamePage />
      )}
    </div>
  );
}

export default App;