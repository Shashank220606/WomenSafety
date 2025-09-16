import React from 'react';
import { Shield, Bell, User, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Women Safety Analytics</h1>
            <p className="text-gray-400 text-sm">Real-time Surveillance & Threat Detection</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">System Active</span>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              3
            </div>
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2 pl-4 border-l border-gray-700">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">Security Officer</p>
              <p className="text-gray-400">Control Center</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;