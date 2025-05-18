import React, { useState, useEffect } from 'react';
import { useHabit } from '../hooks/useHabit';
import HabitForm from './HabitForm';
import StreakCounter from './StreakCounter';
import CompletionButton from './CompletionButton';
import ResetButton from './ResetButton';
import MotivationalQuote from './MotivationalQuote';
import Analytics from './Analytics';
import { Flame, BarChart as ChartBar, Lightbulb } from 'lucide-react';

const HabitTracker: React.FC = () => {
  const { 
    habit, 
    streak, 
    lastCompleted,
    completionHistory,
    canCompleteToday,
    setHabit, 
    completeHabit, 
    resetHabit 
  } = useHabit();
  
  const [showMotivation, setShowMotivation] = useState<boolean>(
    localStorage.getItem('tinystreaks-show-motivation') === 'true'
  );
  
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  
  useEffect(() => {
    localStorage.setItem('tinystreaks-show-motivation', showMotivation.toString());
  }, [showMotivation]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300 p-6">
        {!habit ? (
          <div className="space-y-6">
            <div className="text-center pb-4">
              <h2 className="text-2xl font-bold text-primary mb-2">Welcome to TinyStreaks</h2>
              <p className="text-gray-600 dark:text-gray-300">Build one small habit. One day at a time.</p>
            </div>
            <HabitForm onSubmit={setHabit} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Current Habit</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className={`flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 ${
                    showAnalytics 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  <ChartBar className="w-4 h-4 mr-2" />
                  Analytics
                </button>
                <button
                  onClick={() => setShowMotivation(!showMotivation)}
                  className={`flex-1 sm:flex-none flex items-center justify-center px-4 py-2 rounded-md transition-all duration-200 ${
                    showMotivation 
                      ? 'bg-secondary text-white' 
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Motivation
                </button>
              </div>
            </div>
            
            <div className="bg-primary/5 dark:bg-gray-700 p-4 rounded-lg border border-primary/10 dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white break-words">{habit}</h3>
            </div>
            
            {showMotivation && <MotivationalQuote streak={streak} />}
            
            <CompletionButton 
              onComplete={completeHabit} 
              disabled={!canCompleteToday} 
              lastCompleted={lastCompleted}
            />
            
            <div className="flex items-center justify-center pt-2">
              <Flame className="w-8 h-8 text-accent mr-2" />
              <StreakCounter streak={streak} />
            </div>
            
            <ResetButton onReset={resetHabit} />
          </div>
        )}
      </div>
      
      {showAnalytics && habit && (
        <Analytics streak={streak} completionHistory={completionHistory} />
      )}
    </div>
  );
};

export default HabitTracker;