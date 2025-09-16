import React from 'react';
import { Camera, Settings, Maximize2, Volume2 } from 'lucide-react';
import LiveFeed from './LiveFeed';

const CameraFeed: React.FC = () => {
  const cameras = [
    { id: 'CAM-001', location: 'Main Bus Stop', status: 'active' as const, detections: { women: 3, men: 7, alerts: 0 } },
    { id: 'CAM-002', location: 'Shopping Mall Entrance', status: 'active' as const, detections: { women: 8, men: 12, alerts: 0 } },
    { id: 'CAM-003', location: 'Park Entrance', status: 'alert' as const, detections: { women: 1, men: 0, alerts: 1 } },
    { id: 'CAM-004', location: 'Metro Station Platform', status: 'active' as const, detections: { women: 6, men: 14, alerts: 0 } },
    { id: 'CAM-005', location: 'Underground Parking', status: 'active' as const, detections: { women: 2, men: 5, alerts: 0 } },
    { id: 'CAM-006', location: 'University Campus Gate', status: 'active' as const, detections: { women: 15, men: 18, alerts: 0 } },
    { id: 'CAM-007', location: 'Hospital Main Entrance', status: 'active' as const, detections: { women: 12, men: 8, alerts: 0 } },
    { id: 'CAM-008', location: 'Office Complex Lobby', status: 'active' as const, detections: { women: 4, men: 6, alerts: 0 } },
    { id: 'CAM-009', location: 'Residential Area Street', status: 'active' as const, detections: { women: 2, men: 3, alerts: 0 } },
    { id: 'CAM-010', location: 'ATM Center', status: 'active' as const, detections: { women: 1, men: 2, alerts: 0 } },
    { id: 'CAM-011', location: 'Food Court', status: 'active' as const, detections: { women: 9, men: 11, alerts: 0 } },
    { id: 'CAM-012', location: 'Library Study Area', status: 'active' as const, detections: { women: 7, men: 5, alerts: 0 } }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Camera className="h-6 w-6 mr-3 text-blue-400" />
            Live Camera Feeds
          </h1>
          <p className="text-gray-400 mt-1">Real-time surveillance across all monitoring zones</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Settings className="h-4 w-4" />
            <span>Configure</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Maximize2 className="h-4 w-4" />
            <span>Full Screen</span>
          </button>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <div key={camera.id} className="relative group">
            <LiveFeed
              cameraId={camera.id}
              location={camera.location}
              status={camera.status}
              detections={camera.detections}
            />
            
            {/* Hover Controls */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                <Maximize2 className="h-4 w-4" />
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors">
                <Volume2 className="h-4 w-4" />
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Camera Network Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{cameras.filter(c => c.status === 'active').length}</div>
            <div className="text-gray-400 text-sm">Active Cameras</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{cameras.filter(c => c.status === 'alert').length}</div>
            <div className="text-gray-400 text-sm">Alert Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {cameras.reduce((sum, c) => sum + c.detections.women, 0)}
            </div>
            <div className="text-gray-400 text-sm">Women Detected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">
              {cameras.reduce((sum, c) => sum + c.detections.men, 0)}
            </div>
            <div className="text-gray-400 text-sm">Men Detected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;