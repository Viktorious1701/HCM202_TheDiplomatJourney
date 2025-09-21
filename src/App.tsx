
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/hero-section';
import TimelinePage from './pages/TimelinePage';

function App() {
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