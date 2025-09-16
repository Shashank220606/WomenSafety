import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Clock, MapPin, Calendar, BarChart3 } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [data, setData] = useState({
    totalIncidents: 0,
    resolvedIncidents: 0,
    averageResponseTime: 0,
    mostActiveHours: [],
    topLocations: [],
    genderDistribution: { women: 0, men: 0 },
    weeklyTrend: []
  });

  useEffect(() => {
    // Simulate analytics data
    setData({
      totalIncidents: Math.floor(Math.random() * 50) + 20,
      resolvedIncidents: Math.floor(Math.random() * 40) + 15,
      averageResponseTime: Math.floor(Math.random() * 5) + 2,
      mostActiveHours: [
        { hour: '18:00', count: 8 },
        { hour: '20:00', count: 12 },
        { hour: '22:00', count: 15 },
        { hour: '00:00', count: 6 }
      ],
      topLocations: [
        { name: 'Park Entrance', incidents: 12, trend: '+15%' },
        { name: 'Bus Stop', incidents: 8, trend: '-5%' },
        { name: 'Underground Parking', incidents: 6, trend: '+25%' },
        { name: 'Campus Gate', incidents: 4, trend: '0%' }
      ],
      genderDistribution: {
        women: Math.floor(Math.random() * 40) + 30,
        men: Math.floor(Math.random() * 60) + 40
      },
      weeklyTrend: [
        { day: 'Mon', incidents: 5, alerts: 2 },
        { day: 'Tue', incidents: 3, alerts: 1 },
        { day: 'Wed', incidents: 8, alerts: 3 },
        { day: 'Thu', incidents: 6, alerts: 2 },
        { day: 'Fri', incidents: 12, alerts: 5 },
        { day: 'Sat', incidents: 15, alerts: 7 },
        { day: 'Sun', incidents: 9, alerts: 3 }
      ]
    });
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <BarChart3 className="h-6 w-6 mr-3 text-green-400" />
            Safety Analytics
          </h1>
          <p className="text-gray-400 mt-1">Comprehensive insights and trends analysis</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Incidents</p>
              <p className="text-2xl font-bold text-white mt-1">{data.totalIncidents}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+12%</span>
              </div>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Users className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Resolved</p>
              <p className="text-2xl font-bold text-white mt-1">{data.resolvedIncidents}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+8%</span>
              </div>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Users className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Avg Response Time</p>
              <p className="text-2xl font-bold text-white mt-1">{data.averageResponseTime}m</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-red-400 mr-1" />
                <span className="text-sm text-red-400">+2%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Resolution Rate</p>
              <p className="text-2xl font-bold text-white mt-1">
                {Math.floor((data.resolvedIncidents / data.totalIncidents) * 100)}%
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">+5%</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Chart */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            Weekly Incident Trend
          </h3>
          <div className="space-y-4">
            {data.weeklyTrend.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm w-8">{day.day}</span>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(day.incidents / 15) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm w-8">{day.incidents}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-red-400" />
            High-Risk Locations
          </h3>
          <div className="space-y-4">
            {data.topLocations.map((location, index) => (
              <div key={location.name} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-red-500 text-white' :
                    index === 1 ? 'bg-yellow-500 text-white' :
                    index === 2 ? 'bg-blue-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{location.name}</p>
                    <p className="text-gray-400 text-sm">{location.incidents} incidents</p>
                  </div>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  location.trend.startsWith('+') ? 'bg-red-500/20 text-red-400' :
                  location.trend.startsWith('-') ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {location.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time-based Analysis */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-400" />
            Peak Activity Hours
          </h3>
          <div className="space-y-3">
            {data.mostActiveHours.map((hour) => (
              <div key={hour.hour} className="flex items-center justify-between">
                <span className="text-gray-400">{hour.hour}</span>
                <div className="flex items-center space-x-2 flex-1 mx-4">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(hour.count / 15) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm">{hour.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-400" />
            Gender Distribution in Incidents
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-pink-400">Women</span>
                <span className="text-white">{data.genderDistribution.women}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-pink-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${data.genderDistribution.women}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-400">Men</span>
                <span className="text-white">{data.genderDistribution.men}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${data.genderDistribution.men}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-sm">
                Analysis shows higher incident rates among women during late evening hours, 
                particularly in isolated areas. Increased security presence recommended.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;