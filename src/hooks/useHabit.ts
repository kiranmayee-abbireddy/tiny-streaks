import { useState, useEffect } from 'react';
import { isSameDay, isYesterday, getTodayStr } from '../utils/dateUtils';
import { toast } from '../components/Toast';

interface HabitState {
  habit: string | null;
  streak: number;
  lastCompleted: string | null;
  completionHistory: { date: string; completed: boolean }[];
}

const STORAGE_KEY = 'tinystreaks-data';

const loadHabitData = (): HabitState => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('Error parsing saved habit data', e);
    }
  }
  
  return {
    habit: null,
    streak: 0,
    lastCompleted: null,
    completionHistory: []
  };
};

const saveHabitData = (data: HabitState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const useHabit = () => {
  const [habitData, setHabitData] = useState<HabitState>(loadHabitData);
  const [canCompleteToday, setCanCompleteToday] = useState(false);
  
  const { habit, streak, lastCompleted, completionHistory } = habitData;
  
  useEffect(() => {
    if (!lastCompleted) {
      setCanCompleteToday(true);
      return;
    }
    
    if (isSameDay(new Date(lastCompleted), new Date())) {
      setCanCompleteToday(false);
      return;
    }
    
    setCanCompleteToday(true);
  }, [lastCompleted]);
  
  useEffect(() => {
    if (!habit || !lastCompleted || streak === 0) {
      return;
    }
    
    const lastCompletedDate = new Date(lastCompleted);
    const today = new Date();
    
    if (isYesterday(lastCompletedDate)) {
      return;
    }
    
    if (isSameDay(lastCompletedDate, today)) {
      return;
    }
    
    if (streak > 0) {
      toast.warning(`You missed a day! Your streak of ${streak} days was reset.`);
      
      setHabitData(prev => {
        const updated = { 
          ...prev, 
          streak: 0,
          completionHistory: [
            ...prev.completionHistory,
            { date: getTodayStr(), completed: false }
          ]
        };
        saveHabitData(updated);
        return updated;
      });
    }
  }, [habit, lastCompleted, streak]);
  
  const setHabit = (newHabit: string) => {
    setHabitData(prev => {
      const updated = { 
        ...prev, 
        habit: newHabit,
        streak: prev.habit === newHabit ? prev.streak : 0,
        lastCompleted: prev.habit === newHabit ? prev.lastCompleted : null,
        completionHistory: prev.habit === newHabit ? prev.completionHistory : []
      };
      
      saveHabitData(updated);
      return updated;
    });
    
    toast.success('Habit set successfully!');
  };
  
  const completeHabit = () => {
    if (!canCompleteToday) {
      return;
    }
    
    setHabitData(prev => {
      const newStreak = prev.lastCompleted && isYesterday(new Date(prev.lastCompleted))
        ? prev.streak + 1
        : 1;
      
      const today = getTodayStr();
      
      const updated = {
        ...prev,
        streak: newStreak,
        lastCompleted: today,
        completionHistory: [
          ...prev.completionHistory,
          { date: today, completed: true }
        ]
      };
      
      saveHabitData(updated);
      return updated;
    });
    
    toast.success('Great job completing your habit today!');
    setCanCompleteToday(false);
  };
  
  const resetHabit = () => {
    setHabitData({
      habit: null,
      streak: 0,
      lastCompleted: null,
      completionHistory: []
    });
    
    saveHabitData({
      habit: null,
      streak: 0,
      lastCompleted: null,
      completionHistory: []
    });
    
    toast.info('Habit and streak have been reset');
  };
  
  return {
    habit,
    streak,
    lastCompleted,
    completionHistory,
    canCompleteToday,
    setHabit,
    completeHabit,
    resetHabit
  };
};