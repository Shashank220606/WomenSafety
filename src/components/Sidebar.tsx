import React from 'react';

interface SidebarProps {
  menuItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<any>;
  }>;
  activeView: string;
  setActiveView: (view: string) => void;
  alertCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeView, setActiveView, alertCount }) => {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'alerts' && alertCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {alertCount}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">System Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Cameras Online</span>
              <span className="text-green-400">12/12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">AI Models</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Database</span>
              <span className="text-green-400">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;