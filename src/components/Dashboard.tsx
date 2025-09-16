import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, Camera, MapPin, TrendingUp, Clock, Shield, Eye } from 'lucide-react';
import StatCard from './StatCard';
import AlertSummary from './AlertSummary';
import LiveFeed from './LiveFeed';
import GenderChart from './GenderChart';

interface Alert {
  id: number;
  type: string;
  message: string;
  timestamp: Date;
  location: string;
  camera: string;
}

interface DashboardProps {
  alerts: Alert[];
}

const Dashboard: React.FC<DashboardProps> = ({ alerts }) => {
  const [stats, setStats] = useState({
    totalCameras: 12,
    activeCameras: 12,
    totalPersons: 0,
    womenCount: 0,
    menCount: 0,
    alertsToday: 0,
    highPriorityAlerts: 0
  });

  useEffect(() => {
    // Simulate real-time statistics updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalPersons: Math.floor(Math.random() * 50) + 20,
        womenCount: Math.floor(Math.random() * 25) + 5,
        menCount: Math.floor(Math.random() * 35) + 15,
        alertsToday: alerts.length,
        highPriorityAlerts: alerts.filter(alert => alert.type === 'high').length
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [alerts]);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Persons Detected"
          value={stats.totalPersons}
          icon={Users}
          trend={+2.3}
          color="blue"
        />
        <StatCard
          title="Women Count"
          value={stats.womenCount}
          icon={Users}
          trend={+1.8}
          color="pink"
        />
        <StatCard
          title="Active Alerts"
          value={stats.highPriorityAlerts}
          icon={AlertTriangle}
          trend={-12.5}
          color="red"
        />
        <StatCard
          title="Cameras Online"
          value={`${stats.activeCameras}/${stats.totalCameras}`}
          icon={Camera}
          trend={0}
          color="green"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Feeds */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-400" />
                Live Camera Feeds
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LiveFeed
                cameraId="CAM-001"
                location="Main Bus Stop"
                status="active"
                detections={{ women: 3, men: 7, alerts: 0 }}
              />
              <LiveFeed
                cameraId="CAM-003"
                location="Park Entrance"
                status="alert"
                detections={{ women: 1, men: 0, alerts: 1 }}
              />
              <LiveFeed
                cameraId="CAM-005"
                location="Underground Parking"
                status="active"
                detections={{ women: 2, men: 5, alerts: 0 }}
              />
              <LiveFeed
                cameraId="CAM-007"
                location="Campus Gate"
                status="active"
                detections={{ women: 4, men: 3, alerts: 0 }}
              />
            </div>
          </div>
        </div>

        {/* Alerts & Analytics */}
        <div className="space-y-6">
          <AlertSummary alerts={alerts} />
          <GenderChart />
          
          {/* Threat Level Indicator */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-yellow-400" />
              Current Threat Level
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Overall Safety</span>
                <span className="text-yellow-400 font-medium">MODERATE</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full relative">
                  <div className="absolute right-1/3 top-0 w-1 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 text-xs text-gray-400">
                <span>LOW</span>
                <span className="text-center">MODERATE</span>
                <span className="text-right">HIGH</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                Emergency Alert
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                Deploy Security
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;