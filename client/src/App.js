import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CareerSelector from './components/CareerSelector';
import SkillGap from './components/SkillGap';
import LearningPath from './components/LearningPath';
import ProgressTracker from './components/ProgressTracker';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('careers');
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [userId] = useState('user1');

  const renderView = () => {
    switch (activeView) {
      case 'careers': return <CareerSelector onSelect={(id) => { setSelectedCareerId(id); setActiveView('gap'); }} />;
      case 'gap': return <SkillGap careerId={selectedCareerId} userId={userId} onContinue={() => setActiveView('path')} />;
      case 'path': return <LearningPath careerId={selectedCareerId} userId={userId} />;
      case 'progress': return <ProgressTracker userId={userId} />;
      default: return <CareerSelector onSelect={(id) => { setSelectedCareerId(id); setActiveView('gap'); }} />;
    }
  };

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
