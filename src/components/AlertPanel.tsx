import React, { useState } from 'react';
import { AlertTriangle, Check, X, Clock, MapPin, Camera, Filter, Search } from 'lucide-react';

interface Alert {
  id: number;
  type: string;
  message: string;
  timestamp: Date;
  location: string;
  camera: string;
}

interface AlertPanelProps {
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, setAlerts }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-blue-500 bg-blue-500/10';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const handleDismissAlert = (alertId: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.type !== filter) return false;
    if (searchTerm && !alert.message.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !alert.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
            Alert Management
          </h1>
          <p className="text-gray-400 mt-1">Monitor and manage security alerts in real-time</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {alerts.filter(a => a.type === 'high').length} High Priority
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Alerts</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          
          <div className="flex-1 relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alerts by message or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>{filteredAlerts.length} of {alerts.length} alerts</span>
          </div>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">High Priority</p>
              <p className="text-2xl font-bold text-white mt-1">
                {alerts.filter(a => a.type === 'high').length}
              </p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Medium Priority</p>
              <p className="text-2xl font-bold text-white mt-1">
                {alerts.filter(a => a.type === 'medium').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Low Priority</p>
              <p className="text-2xl font-bold text-white mt-1">
                {alerts.filter(a => a.type === 'low').length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Active Alerts</h2>
        
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No alerts found matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${getAlertIcon(alert.type)}`} />
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {alert.location}
                        </span>
                        <span className="flex items-center">
                          <Camera className="h-3 w-3 mr-1" />
                          {alert.camera}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {getTimeAgo(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.type === 'high' ? 'bg-red-500/20 text-red-400' :
                      alert.type === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                    
                    <button
                      onClick={() => handleDismissAlert(alert.id)}
                      className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {alert.type === 'high' && (
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <div className="flex items-center space-x-2">
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Deploy Security
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Contact Authorities
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        View Feed
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertPanel;