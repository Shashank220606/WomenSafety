import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<any>;
  trend?: number;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'pink';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    pink: 'bg-pink-500'
  };

  const bgColorClasses = {
    blue: 'bg-blue-500/10',
    green: 'bg-green-500/10',
    red: 'bg-red-500/10',
    yellow: 'bg-yellow-500/10',
    pink: 'bg-pink-500/10'
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${bgColorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center mt-2">
              {trend > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : trend < 0 ? (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              ) : null}
              <span className={`text-sm ${trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;