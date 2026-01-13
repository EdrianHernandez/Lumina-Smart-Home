import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * EnergyConsumption component for displaying weekly energy usage.
 * Converted from TypeScript: Removed type imports and annotations.
 */
const DATA = [
  { day: 'Mon', kwh: 12 },
  { day: 'Tue', kwh: 19 },
  { day: 'Wed', kwh: 15 },
  { day: 'Thu', kwh: 22 },
  { day: 'Fri', kwh: 18 },
  { day: 'Sat', kwh: 28 },
  { day: 'Sun', kwh: 25 },
];

const EnergyConsumption = () => {
  // Find max value to highlight it
  const maxKwh = Math.max(...DATA.map(d => d.kwh));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            dy={10}
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9', radius: 4 }}
            contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: 'none', 
                borderRadius: '8px', 
                color: '#fff',
                fontSize: '12px',
                padding: '8px 12px'
            }}
            itemStyle={{ color: '#fff' }}
            formatter={(value) => [`${value} kWh`, 'Usage']}
          />
          <Bar dataKey="kwh" radius={[6, 6, 6, 6]} barSize={24}>
             {DATA.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`} 
                    fill={entry.kwh === maxKwh ? '#3b82f6' : '#e2e8f0'} 
                    className="transition-all duration-300 hover:opacity-80"
                />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <span className="text-slate-500">Average</span>
          </div>
           <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-slate-500">Peak Usage</span>
          </div>
      </div>
    </div>
  );
};

export default EnergyConsumption;
