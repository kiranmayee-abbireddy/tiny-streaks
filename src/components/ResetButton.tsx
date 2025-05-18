import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleReset = () => {
    if (showConfirm) {
      onReset();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };
  
  const handleCancel = () => {
    setShowConfirm(false);
  };
  
  return (
    <div className="pt-4">
      {!showConfirm ? (
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          <span>Reset Habit</span>
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            This will reset your current habit and streak. Are you sure?
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetButton;