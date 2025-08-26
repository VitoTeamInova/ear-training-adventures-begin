
import { useState } from 'react';
import Header from '@/components/Header';
import Landing from '@/components/Landing';
import EarTrainingExercise from '@/components/EarTrainingExercise';
import ResultsSummary from '@/components/ResultsSummary';
import YourProgress from '@/components/YourProgress';
import TabContent from '@/components/TabContent';
import Footer from '@/components/Footer';
import ConfigurationPanel from '@/components/ConfigurationPanel';
import useProgress from '@/hooks/useProgress';

const Index = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [isExerciseActive, setIsExerciseActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [exerciseStats, setExerciseStats] = useState({ exercises: 0, attempts: 0 });
  const { results, saveResult } = useProgress();

  const handleStartClick = () => {
    setIsExerciseActive(true);
  };

  const handleExerciseComplete = (exercises: number, attempts: number) => {
    setExerciseStats({ exercises, attempts });
    setShowResults(true);
    setIsExerciseActive(false);
    saveResult(exercises, attempts);
  };

  const handleReturnHome = () => {
    setShowResults(false);
    setActiveTab('landing');
  };

  // Determine which content to show
  const renderContent = () => {
    // For results page after exercise
    if (showResults) {
      return (
        <ResultsSummary 
          exercises={exerciseStats.exercises} 
          attempts={exerciseStats.attempts}
          onReturn={handleReturnHome}
        />
      );
    }

    // For exercise page
    if (isExerciseActive) {
      return <EarTrainingExercise onComplete={handleExerciseComplete} />;
    }

    // For regular tabs
    if (activeTab === 'landing') {
      return <Landing onStartClick={handleStartClick} />;
    } else if (activeTab === 'your-progress') {
      return <YourProgress results={results} />;
    } else {
      return <TabContent tabId={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-accent/30">
      <Header activeTab={isExerciseActive ? 'landing' : activeTab} setActiveTab={(tab) => {
        if (!isExerciseActive && !showResults) {
          setActiveTab(tab);
        }
      }} />
      {renderContent()}
    </div>
  );
};

export default Index;
