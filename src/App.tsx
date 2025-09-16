import React, { useState, useEffect } from 'react';
import { Camera, Users, AlertTriangle, MapPin, Activity, Settings, Shield, Eye, Clock, TrendingUp } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CameraFeed from './components/CameraFeed';
import AlertPanel from './components/AlertPanel';
import Analytics from './components/Analytics';
import HotspotMap from './components/HotspotMap';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'high',
      message: 'Lone woman detected at Camera 3 - Park Area',
      timestamp: new Date(),
      location: 'Park Entrance',
      camera: 'CAM-003'
    },
    {
      id: 2,
      type: 'medium',
      message: 'SOS gesture detected at Camera 1 - Bus Stop',
      timestamp: new Date(Date.now() - 300000),
      location: 'Main Bus Stop',
      camera: 'CAM-001'
    },
    {
      id: 3,
      type: 'low',
      message: 'Gender imbalance detected - 1 woman, 5 men',
      timestamp: new Date(Date.now() - 600000),
      location: 'Underground Parking',
      camera: 'CAM-005'
    }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'cameras', label: 'Live Cameras', icon: Camera },
    { id: 'alerts', label: 'Alert Management', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'hotspots', label: 'Hotspot Map', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const alertTypes = ['high', 'medium', 'low'];
      const messages = [
        'Lone woman detected in isolated area',
        'Woman surrounded by multiple men',
        'SOS gesture recognition activated',
        'Unusual crowd behavior detected',
        'Late night activity in unsafe zone',
        'Gender imbalance threshold exceeded'
      ];
      const locations = ['Park Area', 'Bus Stop', 'Underground Parking', 'Campus Gate', 'Metro Station', 'Shopping Complex'];
      
      const newAlert = {
        id: Date.now(),
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        location: locations[Math.floor(Math.random() * locations.length)],
        camera: `CAM-${String(Math.floor(Math.random() * 10) + 1).padStart(3, '0')}`
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 19)]); // Keep last 20 alerts
    }, 15000); // New alert every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard alerts={alerts} />;
      case 'cameras':
        return <CameraFeed />;
      case 'alerts':
        return <AlertPanel alerts={alerts} setAlerts={setAlerts} />;
      case 'analytics':
        return <Analytics />;
      case 'hotspots':
        return <HotspotMap />;
      default:
        return <Dashboard alerts={alerts} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="flex">
        <Sidebar 
          menuItems={menuItems}
          activeView={activeView}
          setActiveView={setActiveView}
          alertCount={alerts.filter(alert => alert.type === 'high').length}
        />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;