import React, { useState } from 'react';
import { AppProvider, useApp } from './AppContext';
import { Navbar, Footer } from './components/Layout';
import { Home } from './components/Home';
import { LearningPath } from './components/LearningPath';
import { PathSelection } from './components/PathSelection';
import { LessonView } from './components/LessonView';
import { MiniTest } from './components/MiniTest';
import { Dashboard } from './components/Dashboard';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const renderContent = () => {
    if (isTesting && selectedUnit) {
      return (
        <MiniTest 
          unitId={selectedUnit} 
          onComplete={() => {
            setIsTesting(false);
            setActiveTab('path');
          }} 
          onCancel={() => setIsTesting(false)} 
        />
      );
    }

    if (selectedUnit) {
      return (
        <LessonView 
          unitId={selectedUnit} 
          onStartTest={() => setIsTesting(true)} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home onStart={() => setActiveTab('path')} />;
      case 'path':
        if (!selectedPathId) {
          return (
            <PathSelection 
              onSelectPath={(id) => setSelectedPathId(id)} 
              onSelectUnit={(id) => setSelectedUnit(id)}
              onShowDashboard={() => setActiveTab('dashboard')} 
            />
          );
        }
        return <LearningPath pathId={selectedPathId} onSelectUnit={(id) => setSelectedUnit(id)} onBack={() => setSelectedPathId(null)} />;
      case 'dashboard':
        return <Dashboard onResume={(id) => setSelectedUnit(id)} />;
      default:
        return <Home onStart={() => setActiveTab('path')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!isTesting && (
        <Navbar 
          activeTab={selectedUnit || selectedPathId ? 'path' : activeTab} 
          setActiveTab={(tab) => {
            setSelectedUnit(null);
            setSelectedPathId(null);
            setActiveTab(tab);
          }} 
        />
      )}
      <main className="flex-1">
        {renderContent()}
      </main>
      {!isTesting && !selectedUnit && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
