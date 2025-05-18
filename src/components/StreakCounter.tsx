import React from 'react';

interface StreakCounterProps {
  streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-gray-800 dark:text-white">{streak}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {streak === 1 ? 'Day' : 'Days'}
      </div>
    </div>
  );
};

export default StreakCounter;