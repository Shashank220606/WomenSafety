import React, { useState, useEffect } from 'react';
import { Camera, Users, AlertTriangle } from 'lucide-react';

interface LiveFeedProps {
  cameraId: string;
  location: string;
  status: 'active' | 'alert' | 'offline';
  detections: {
    women: number;
    men: number;
    alerts: number;
  };
}

const LiveFeed: React.FC<LiveFeedProps> = ({ cameraId, location, status, detections }) => {
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'alert': return 'bg-red-500';
      case 'active': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden">
      {/* Video Feed Simulation */}
      <div className="aspect-video bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
          {/* Simulated detection boxes */}
          <div className="absolute top-4 left-4 w-12 h-16 border-2 border-pink-400 rounded">
            <div className="absolute -top-6 left-0 text-xs text-pink-400 bg-gray-900 px-1 rounded">
              Woman
            </div>
          </div>
          <div className="absolute top-8 right-8 w-12 h-16 border-2 border-blue-400 rounded">
            <div className="absolute -top-6 left-0 text-xs text-blue-400 bg-gray-900 px-1 rounded">
              Man
            </div>
          </div>
          {status === 'alert' && (
            <div className="absolute top-16 left-20 w-12 h-16 border-2 border-red-400 rounded animate-pulse">
              <div className="absolute -top-6 left-0 text-xs text-red-400 bg-gray-900 px-1 rounded">
                Alert!
              </div>
            </div>
          )}
        </div>
        
        {/* Status Indicator */}
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          {status === 'alert' && (
            <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
          )}
          <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${isLive ? 'animate-pulse' : ''}`}></div>
        </div>
      </div>
      
      {/* Feed Info */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Camera className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-white">{cameraId}</span>
          </div>
          <span className="text-xs text-gray-400">{location}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-pink-400">♀ {detections.women}</span>
            <span className="text-blue-400">♂ {detections.men}</span>
          </div>
          {detections.alerts > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full">
              {detections.alerts} Alert{detections.alerts > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;