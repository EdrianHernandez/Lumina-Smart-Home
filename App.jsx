import React, { useState, useCallback } from 'react';
import { DeviceType, SceneType } from './types.js';
import DeviceGrid from './components/DeviceGrid.jsx';
import EnergyConsumption from './components/EnergyConsumption.jsx';
import SecurityStatus from './components/SecurityStatus.jsx';
import QuickSceneToggle from './components/QuickSceneToggle.jsx';
import { LayoutGrid, Home, Settings, User, Menu, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_DEVICES = [
  { id: '1', name: 'Living Room Lights', type: DeviceType.LIGHT, isOn: true, location: 'Living Room' },
  { id: '2', name: 'Kitchen Lights', type: DeviceType.LIGHT, isOn: false, location: 'Kitchen' },
  { id: '3', name: 'Master AC', type: DeviceType.AC, isOn: true, location: 'Master Bedroom' },
  { id: '4', name: 'Front Door Cam', type: DeviceType.CAMERA, isOn: true, location: 'Entrance' },
  { id: '5', name: 'Nest Thermostat', type: DeviceType.THERMOSTAT, isOn: true, value: 72, location: 'Hallway' },
  { id: '6', name: 'Backyard Cam', type: DeviceType.CAMERA, isOn: false, location: 'Backyard' },
];

const INITIAL_LOGS = [
  { id: '1', event: 'Front Door Locked', timestamp: '10:42 AM', type: 'info' },
  { id: '2', event: 'Motion Detected (Backyard)', timestamp: '09:15 AM', type: 'warning' },
  { id: '3', event: 'System Armed', timestamp: '08:00 AM', type: 'info' },
  { id: '4', event: 'Garage Door Closed', timestamp: '07:55 AM', type: 'info' },
  { id: '5', event: 'Unrecognized Face (Front)', timestamp: 'Yesterday', type: 'alert' },
];

const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: LayoutGrid, label: 'Rooms', active: false },
  { icon: User, label: 'Profile', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const App = () => {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [activeScene, setActiveScene] = useState(SceneType.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDevice = useCallback((id) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, isOn: !d.isOn };
      }
      return d;
    }));
  }, []);

  const updateDeviceValue = useCallback((id, value) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, value };
      }
      return d;
    }));
  }, []);

  const handleSceneChange = (scene) => {
    setActiveScene(scene);
    let newDevices = [...devices];
    switch (scene) {
      case SceneType.AWAY:
        newDevices = newDevices.map(d => 
          d.type === DeviceType.LIGHT || d.type === DeviceType.AC ? { ...d, isOn: false } : d
        );
        newDevices = newDevices.map(d => 
          d.type === DeviceType.CAMERA ? { ...d, isOn: true } : d
        );
        break;
      case SceneType.SLEEP:
        newDevices = newDevices.map(d => 
            d.type === DeviceType.LIGHT ? { ...d, isOn: false } : d
        );
        newDevices = newDevices.map(d => 
            d.type === DeviceType.THERMOSTAT ? { ...d, value: 68 } : d
        );
        break;
      case SceneType.MOVIE:
         newDevices = newDevices.map(d => 
            d.location === 'Living Room' && d.type === DeviceType.LIGHT ? { ...d, isOn: false } : d
         );
         break;
      case SceneType.HOME:
        break;
    }
    setDevices(newDevices);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      <div className="md:hidden bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-primary" />
          Lumina
        </h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
            <Menu />
        </button>
      </div>

      <aside className={`
        fixed inset-y-0 left-0 z-30 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out
        w-64 ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative
      `}>
        <button 
           onClick={() => setIsCollapsed(!isCollapsed)}
           className="hidden md:flex absolute -right-3 top-8 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 rounded-full p-1.5 shadow-sm transition-colors z-50 items-center justify-center"
        >
           {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="flex flex-col h-full py-6">
          <div className={`flex items-center h-10 mb-8 px-6 transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : ''}`}>
             <div className="text-primary flex-shrink-0 transition-transform duration-300">
                <LayoutGrid size={28} />
             </div>
             <span className={`
                text-2xl font-bold tracking-tight text-slate-800 ml-3 whitespace-nowrap overflow-hidden transition-all duration-300
                ${isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[200px] opacity-100'}
             `}>
                Lumina
             </span>
          </div>

          <nav className="flex-1 space-y-2 px-3">
             {NAV_ITEMS.map((item) => (
                <a 
                   key={item.label} 
                   href="#" 
                   className={`
                      flex items-center py-3 rounded-xl font-medium transition-colors relative group
                      ${isCollapsed ? 'justify-center px-0' : 'px-4 gap-3'}
                      ${item.active ? 'bg-slate-100 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                   `}
                >
                   <item.icon size={20} className="flex-shrink-0" />
                   <span className={`
                      whitespace-nowrap overflow-hidden transition-all duration-300
                      ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[150px] opacity-100'}
                   `}>
                      {item.label}
                   </span>
                   {isCollapsed && (
                       <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-sm transition-opacity delay-100">
                            {item.label}
                       </div>
                   )}
                </a>
             ))}
          </nav>

          <div className="mt-auto pt-4 mx-4 border-t border-slate-100">
              <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold flex-shrink-0">
                      JD
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[150px] opacity-100'}`}>
                      <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">John Doe</p>
                      <p className="text-xs text-slate-400 whitespace-nowrap">Admin</p>
                  </div>
              </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto w-full">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Welcome Home</h2>
            <p className="text-slate-500 mt-1">Here's what's happening at your place today.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-white rounded-lg shadow-sm text-slate-600 text-sm font-medium border border-slate-100">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
             </div>
          </div>
        </header>

        <section className="mb-8">
          <QuickSceneToggle activeScene={activeScene} onSceneChange={handleSceneChange} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DeviceGrid 
              devices={devices} 
              onToggle={toggleDevice} 
              onValueChange={updateDeviceValue} 
            />
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 energy-chart-container">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Energy Consumption</h3>
                <span className="text-sm text-slate-400 bg-slate-50 px-3 py-1 rounded-full">Weekly</span>
              </div>
              <EnergyConsumption />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <SecurityStatus logs={INITIAL_LOGS} isLocked={activeScene === SceneType.AWAY || activeScene === SceneType.SLEEP} />
          </div>
        </div>
      </main>
      
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/20 z-20 md:hidden glass"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
