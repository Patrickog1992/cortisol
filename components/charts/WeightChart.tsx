import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeightChartProps {
  currentWeight: number;
  targetWeight: number;
  weeks?: number;
  days?: number;
  color?: string;
}

const WeightChart: React.FC<WeightChartProps> = ({ 
  currentWeight, 
  targetWeight, 
  weeks,
  days,
  color = "#FF6B6B" 
}) => {
  const data = [];
  const startWeight = Number(currentWeight);
  const endWeight = Number(targetWeight);
  
  if (weeks) {
    for (let i = 0; i <= weeks; i++) {
      // Linear interpolation for simplicity
      const weight = startWeight - ((startWeight - endWeight) * (i / weeks));
      data.push({
        name: i === 0 ? 'Hoje' : `Sem ${i}`,
        peso: Number(weight.toFixed(1))
      });
    }
  } else if (days) {
    for (let i = 0; i <= days; i++) {
      const weight = startWeight - ((startWeight - endWeight) * (i / days));
      data.push({
        name: i === 0 ? 'Hoje' : `Dia ${i}`,
        peso: Number(weight.toFixed(1))
      });
    }
  }

  return (
    <div className="w-full h-64 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
          <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="peso" 
            stroke={color} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPv)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;
