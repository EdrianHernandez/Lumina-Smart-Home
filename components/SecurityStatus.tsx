import React from 'react';
import { SecurityLog } from '../types';
import { ShieldCheck, ShieldAlert, Lock, Unlock, Clock, AlertTriangle } from 'lucide-react';

interface SecurityStatusProps {
  logs: SecurityLog[];
  isLocked: boolean;
}

const SecurityStatus: React.FC<SecurityStatusProps> = ({ logs, isLocked }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Security</h3>
        <span className={`
            px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1
            ${isLocked ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
        `}>
            {isLocked ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
            {isLocked ? 'Armed' : 'Disarmed'}
        </span>
      </div>

      {/* Main Status Card */}
      <div className={`
        relative overflow-hidden rounded-2xl p-6 text-center mb-8 transition-colors duration-500
        ${isLocked ? 'bg-slate-900 text-white' : 'bg-red-50 text-red-900 border border-red-100'}
      `}>
         <div className="relative z-10 flex flex-col items-center">
            <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-3 text-3xl
                ${isLocked ? 'bg-white/10 text-white' : 'bg-red-100 text-red-500'}
            `}>
                {isLocked ? <Lock size={32} /> : <Unlock size={32} />}
            </div>
            <h4 className="text-2xl font-bold mb-1">{isLocked ? 'House Secured' : 'Unlocked'}</h4>
            <p className={`text-sm ${isLocked ? 'text-slate-400' : 'text-red-700/70'}`}>
                {isLocked ? 'All sensors active' : 'Front door is open'}
            </p>
         </div>
         
         {/* Decorative circle */}
         <div className={`
            absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10
            ${isLocked ? 'bg-white' : 'bg-red-500'}
         `}></div>
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Recent Activity</h4>
        <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
          {logs.map((log) => (
            <div key={log.id} className="security-log-row flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className={`
                mt-1 p-2 rounded-full flex-shrink-0
                ${log.type === 'alert' ? 'bg-red-100 text-red-600' : 
                  log.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                  'bg-blue-50 text-blue-600'}
              `}>
                {log.type === 'alert' || log.type === 'warning' ? <AlertTriangle size={14} /> : <Clock size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{log.event}</p>
                <p className="text-xs text-slate-400">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="w-full mt-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
        View Full History
      </button>
    </div>
  );
};

export default SecurityStatus;