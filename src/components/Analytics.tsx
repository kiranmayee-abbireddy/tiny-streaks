import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Award } from 'lucide-react';

interface AnalyticsProps {
  streak: number;
  completionHistory: { date: string; completed: boolean }[];
}

const Analytics: React.FC<AnalyticsProps> = ({ streak, completionHistory }) => {
  // Calculate completion rate
  const completionRate = completionHistory.length > 0
    ? (completionHistory.filter(day => day.completed).length / completionHistory.length * 100).toFixed(1)
    : '0.0';

  // Prepare data for weekly chart
  const last7Days = completionHistory.slice(-7).map(day => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    completed: day.completed ? 1 : 0,
  }));

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-gray-700 dark:text-gray-200">Completion Rate</h3>
          </div>
          <p className="text-2xl font-bold text-primary mt-2">{completionRate}%</p>
        </div>
        
        <div className="bg-secondary/10 dark:bg-secondary/20 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <h3 className="font-medium text-gray-700 dark:text-gray-200">Current Streak</h3>
          </div>
          <p className="text-2xl font-bold text-secondary mt-2">{streak} days</p>
        </div>
        
        <div className="bg-accent/10 dark:bg-accent/20 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="font-medium text-gray-700 dark:text-gray-200">Total Days</h3>
          </div>
          <p className="text-2xl font-bold text-accent mt-2">{completionHistory.length}</p>
        </div>
      </div>

      <div className="h-64 mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Last 7 Days</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last7Days}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(99, 102, 241, 0.1)"
            />
            <XAxis 
              dataKey="date" 
              stroke="currentColor" 
              className="text-gray-600 dark:text-gray-300" 
            />
            <YAxis 
              domain={[0, 1]} 
              ticks={[0, 1]} 
              stroke="currentColor"
              className="text-gray-600 dark:text-gray-300"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgb(31, 41, 55)',
                border: 'none',
                borderRadius: '0.375rem',
                color: 'rgb(229, 231, 235)'
              }}
            />
            <Bar 
              dataKey="completed" 
              fill="rgb(99, 102, 241)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;