import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

interface CompletionButtonProps {
  onComplete: () => void;
  disabled: boolean;
  lastCompleted: string | null;
}

const CompletionButton: React.FC<CompletionButtonProps> = ({ 
  onComplete, 
  disabled, 
  lastCompleted 
}) => {
  const handleClick = () => {
    if (!disabled) {
      onComplete();
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="text-center text-lg font-medium text-gray-800 dark:text-white">
        Did you do it today?
      </div>
      
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center px-4 py-3 rounded-md font-medium transition-all duration-200 ${
          disabled
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 text-white shadow-sm'
        }`}
      >
        {disabled ? (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>
              Completed {lastCompleted ? `on ${formatDate(lastCompleted)}` : 'today'}
            </span>
          </>
        ) : (
          <>
            <span>Yes, I did it!</span>
          </>
        )}
      </button>
      
      {disabled && (
        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>You can mark it again tomorrow</span>
        </div>
      )}
    </div>
  );
};

export default CompletionButton;