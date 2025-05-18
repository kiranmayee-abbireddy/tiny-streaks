import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface HabitFormProps {
  onSubmit: (habit: string) => void;
  initialValue?: string;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit, initialValue = '' }) => {
  const [habitText, setHabitText] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedHabit = habitText.trim();
    
    if (!trimmedHabit) {
      setError('Please enter a habit');
      return;
    }
    
    if (trimmedHabit.length > 50) {
      setError('Habit must be 50 characters or less');
      return;
    }
    
    setError('');
    onSubmit(trimmedHabit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label 
          htmlFor="habit" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          What one habit do you want to build?
        </label>
        
        <input
          type="text"
          id="habit"
          placeholder="e.g., Drink 2L of water"
          value={habitText}
          onChange={(e) => setHabitText(e.target.value)}
          className={`w-full px-4 py-2 rounded-md border ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
        />
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
      
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200 shadow-sm"
      >
        <span>Set My Habit</span>
        <ArrowRight className="ml-2 w-4 h-4" />
      </button>
    </form>
  );
};

export default HabitForm;