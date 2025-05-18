import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { getMotivationalQuote } from '../utils/quotes';

interface MotivationalQuoteProps {
  streak: number;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ streak }) => {
  const [quote, setQuote] = useState('');
  
  useEffect(() => {
    setQuote(getMotivationalQuote(streak));
  }, [streak]);

  return (
    <div className="flex items-start p-4 bg-secondary/5 dark:bg-secondary/10 rounded-md text-sm text-gray-800 dark:text-gray-200 border border-secondary/10 dark:border-secondary/20">
      <Lightbulb className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-secondary" />
      <p>{quote}</p>
    </div>
  );
};

export default MotivationalQuote;