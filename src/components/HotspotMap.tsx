import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Users, Filter, Layers } from 'lucide-react';

const HotspotMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [heatmapData, setHeatmapData] = useState([
    { id: 1, x: 20, y: 30, intensity: 8, incidents: 12, location: 'Park Entrance' },
    { id: 2, x: 60, y: 20, intensity: 6, incidents: 8, location: 'Bus Stop' },
    { id: 3, x: 80, y: 70, intensity: 9, incidents: 15, location: 'Underground Parking' },
    { id: 4, x: 40, y: 60, intensity: 4, incidents: 5, location: 'Campus Gate' },
    { id: 5, x: 30, y: 80, intensity: 7, incidents: 10, location: 'Metro Station' },
    { id: 6, x: 70, y: 40, intensity: 5, incidents: 6, location: 'Shopping Complex' }
  ]);

  const [zoneDetails] = useState([
    {
      name: 'Zone A - Downtown',
      riskLevel: 'High',
      incidents: 34,
      cameras: 4,
      lastIncident: '2 hours ago',
      coordinates: { x: 25, y: 35 }
    },
    {
      name: 'Zone B - Campus Area',
      riskLevel: 'Medium',
      incidents: 18,
      cameras: 3,
      lastIncident: '6 hours ago',
      coordinates: { x: 45, y: 65 }
    },
    {
      name: 'Zone C - Transport Hub',
      riskLevel: 'High',
      incidents: 27,
      cameras: 5,
      lastIncident: '1 hour ago',
      coordinates: { x: 75, y: 45 }
    },
    {
      name: 'Zone D - Residential',
      riskLevel: 'Low',
      incidents: 8,
      cameras: 2,
      lastIncident: '1 day ago',
      coordinates: { x: 65, y: 75 }
    }
  ]);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 8) return 'bg-red-500';
    if (intensity >= 6) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <MapPin className="h-6 w-6 mr-3 text-red-400" />
            Hotspot Analysis
          </h1>
          <p className="text-gray-400 mt-1">Interactive heatmap of high-risk areas and incident patterns</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Layers className="h-4 w-4" />
            <span>Layers</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">City Safety Heatmap</h2>
          
          {/* Map Container */}
          <div className="relative bg-gray-900 rounded-lg h-96 overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <div key={`v-${i}`} className="absolute bg-gray-600 w-px h-full" style={{ left: `${i * 10}%` }}></div>
              ))}
              {[...Array(10)].map((_, i) => (
                <div key={`h-${i}`} className="absolute bg-gray-600 h-px w-full" style={{ top: `${i * 10}%` }}></div>
              ))}
            </div>

            {/* Hotspots */}
            {heatmapData.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`absolute w-8 h-8 rounded-full opacity-70 animate-pulse cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform ${getIntensityColor(hotspot.intensity)}`}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                onClick={() => setSelectedZone(hotspot.location)}
              >
                <div className={`w-16 h-16 rounded-full absolute -inset-4 opacity-30 ${getIntensityColor(hotspot.intensity)}`}></div>
              </div>
            ))}

            {/* Zone Markers */}
            {zoneDetails.map((zone) => (
              <div
                key={zone.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                onClick={() => setSelectedZone(zone.name)}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-white ${
                  zone.riskLevel === 'High' ? 'bg-red-500' :
                  zone.riskLevel === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {zone.name}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-gray-800 rounded-lg p-3">
              <h4 className="text-white text-sm font-medium mb-2">Risk Levels</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300 text-xs">High Risk (8+ incidents)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Medium Risk (5-7 incidents)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-xs">Low Risk (1-4 incidents)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Information Panel */}
        <div className="space-y-6">
          {/* Selected Zone Details */}
          {selectedZone && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                Zone Details
              </h3>
              <div className="space-y-3">
                <p className="text-white font-medium">{selectedZone}</p>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Risk Level: <span className="text-red-400">High</span></p>
                  <p>Recent Incidents: <span className="text-white">12</span></p>
                  <p>Active Cameras: <span className="text-white">3</span></p>
                  <p>Last Alert: <span className="text-white">2 hours ago</span></p>
                </div>
              </div>
            </div>
          )}

          {/* Zone Statistics */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-400" />
              Zone Statistics
            </h3>
            <div className="space-y-4">
              {zoneDetails.map((zone) => (
                <div 
                  key={zone.name} 
                  className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                  onClick={() => setSelectedZone(zone.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{zone.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(zone.riskLevel)}`}>
                      {zone.riskLevel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div>Incidents: <span className="text-white">{zone.incidents}</span></div>
                    <div>Cameras: <span className="text-white">{zone.cameras}</span></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last: {zone.lastIncident}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                Deploy Emergency Response
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                Increase Patrol Frequency
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                Generate Detailed Report
              </button>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Overall City Risk</span>
                <span className="text-yellow-400">MODERATE</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full relative">
                  <div className="absolute left-1/2 top-0 w-1 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Based on recent incident patterns, time of day, and location analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotMap;