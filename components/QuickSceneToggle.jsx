import React from 'react';
import { SceneType } from '../types.js';
import { Moon, Film, LogOut, Home } from 'lucide-react';

/**
 * QuickSceneToggle component for switching between different smart home modes.
 * Converted from TypeScript: Removed interfaces and type annotations.
 */
const QuickSceneToggle = ({ activeScene, onSceneChange }) => {
  
  const scenes = [
    { id: SceneType.HOME, icon: Home, label: 'Home', color: 'bg-blue-500' },
    { id: SceneType.AWAY, icon: LogOut, label: 'Away', color: 'bg-indigo-500' },
    { id: SceneType.SLEEP, icon: Moon, label: 'Sleep', color: 'bg-purple-500' },
    { id: SceneType.MOVIE, icon: Film, label: 'Movie', color: 'bg-pink-500' },
  ];

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex space-x-4 min-w-max">
        {scenes.map((scene) => {
          const isActive = activeScene === scene.id;
          const Icon = scene.icon;
          
          return (
            <button
              key={scene.id}
              onClick={() => onSceneChange(scene.id)}
              className={`
                group relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ease-out
                ${isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-white text-slate-600 shadow-sm border border-slate-100 hover:border-slate-300'}
              `}
            >
              <div className={`
                p-2 rounded-full transition-colors duration-300
                ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-slate-200'}
              `}>
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-700'} />
              </div>
              <div className="text-left">
                <span className="block text-sm font-semibold">{scene.label}</span>
                <span className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                  {isActive ? 'Active' : 'Activate'}
                </span>
              </div>
              
              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickSceneToggle;
