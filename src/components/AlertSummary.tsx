import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

interface Alert {
  id: number;
  type: string;
  message: string;
  timestamp: Date;
  location: string;
  camera: string;
}

interface AlertSummaryProps {
  alerts: Alert[];
}

const AlertSummary: React.FC<AlertSummaryProps> = ({ alerts }) => {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
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

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
          Recent Alerts
        </h3>
        <span className="text-sm text-gray-400">{alerts.length} total</span>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${getAlertColor(alert.type)}`}></div>
                <div>
                  <p className="text-white text-sm font-medium">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {alert.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {getTimeAgo(alert.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                alert.type === 'high' ? 'bg-red-500/20 text-red-400' :
                alert.type === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {alert.type.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {alerts.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No recent alerts</p>
        </div>
      )}
    </div>
  );
};

export default AlertSummary;