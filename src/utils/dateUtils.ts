// Get today's date as a string in ISO format (YYYY-MM-DD)
export const getTodayStr = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Format date for display (e.g., "May 15, 2025")
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Check if a date is yesterday
export const isYesterday = (date: Date): boolean => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  return (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  );
};

// Check if a date is within the last 24 hours
export const isWithin24Hours = (date: Date): boolean => {
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  
  return hoursDiff < 24;
};