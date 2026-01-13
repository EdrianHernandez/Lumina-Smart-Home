import React from 'react';
import { Device, DeviceType } from '../types';
import { Lightbulb, Thermometer, Video, Wind, Power, Plus, Minus } from 'lucide-react';

interface DeviceGridProps {
  devices: Device[];
  onToggle: (id: string) => void;
  onValueChange: (id: string, value: number) => void;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices, onToggle, onValueChange }) => {
  
  const getIcon = (type: DeviceType) => {
    switch (type) {
      case DeviceType.LIGHT: return Lightbulb;
      case DeviceType.AC: return Wind;
      case DeviceType.CAMERA: return Video;
      case DeviceType.THERMOSTAT: return Thermometer;
      default: return Power;
    }
  };

  const getGradient = (type: DeviceType, isOn: boolean) => {
    if (!isOn) return 'bg-white border-slate-200 text-slate-500';
    switch (type) {
      case DeviceType.LIGHT: return 'bg-amber-100 border-amber-200 text-amber-600';
      case DeviceType.AC: return 'bg-cyan-100 border-cyan-200 text-cyan-600';
      case DeviceType.THERMOSTAT: return 'bg-rose-100 border-rose-200 text-rose-600';
      case DeviceType.CAMERA: return 'bg-emerald-100 border-emerald-200 text-emerald-600';
      default: return 'bg-slate-100 border-slate-200 text-slate-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">My Devices</h3>
        <button className="text-sm font-medium text-primary hover:text-blue-700 transition-colors">See All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {devices.map((device) => {
          const Icon = getIcon(device.type);
          const activeStyle = device.isOn ? 'bg-slate-800 text-white' : 'bg-white text-slate-800 border-slate-200';
          const iconContainerStyle = getGradient(device.type, device.isOn);

          return (
            <div 
              key={device.id} 
              className={`
                device-card relative p-5 rounded-3xl transition-all duration-300 shadow-sm border
                ${device.isOn ? 'border-transparent shadow-lg shadow-slate-200/50' : 'border-slate-100'}
                ${activeStyle}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-full ${iconContainerStyle}`}>
                  <Icon size={24} />
                </div>
                
                {device.type !== DeviceType.THERMOSTAT && (
                   <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={device.isOn} 
                      onChange={() => onToggle(device.id)} 
                    />
                    <div className={`
                        w-12 h-7 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                        after:transition-all 
                        ${device.isOn ? 'bg-primary peer-checked:bg-primary' : 'bg-slate-200'}
                    `}></div>
                  </label>
                )}

                 {device.type === DeviceType.THERMOSTAT && (
                     <div className="flex items-center gap-1">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${device.isOn ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {device.isOn ? 'Active' : 'Idle'}
                        </span>
                     </div>
                 )}
              </div>

              <div>
                <h4 className="font-bold text-lg leading-tight mb-1">{device.name}</h4>
                <p className={`text-sm ${device.isOn ? 'text-slate-300' : 'text-slate-500'}`}>{device.location}</p>
              </div>

              {device.type === DeviceType.THERMOSTAT && device.isOn && (
                <div className="mt-4 flex items-center justify-between bg-white/10 rounded-xl p-2 backdrop-blur-sm">
                  <button 
                    onClick={() => onValueChange(device.id, (device.value || 70) - 1)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-2xl font-bold">{device.value}°</span>
                  <button 
                     onClick={() => onValueChange(device.id, (device.value || 70) + 1)}
                     className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceGrid;