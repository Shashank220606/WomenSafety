import React, { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

const GenderChart: React.FC = () => {
  const [data, setData] = useState({
    women: 35,
    men: 65,
    total: 100
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        women: Math.floor(Math.random() * 40) + 20,
        men: Math.floor(Math.random() * 60) + 30,
        total: Math.floor(Math.random() * 100) + 50
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const womenPercentage = (data.women / data.total) * 100;
  const menPercentage = (data.men / data.total) * 100;

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2 text-green-400" />
        Gender Distribution
      </h3>
      
      {/* Progress Bars */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-pink-400">Women</span>
            <span className="text-white">{data.women} ({womenPercentage.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${womenPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-400">Men</span>
            <span className="text-white">{data.men} ({menPercentage.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${menPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Total Count */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Total Detected</span>
          <span className="text-white font-semibold">{data.total}</span>
        </div>
      </div>
    </div>
  );
};

export default GenderChart;