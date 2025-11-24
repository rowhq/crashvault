'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Area, AreaChart } from 'recharts';
import { NAVDataPoint } from '@/lib/types';

interface NAVChartProps {
  data: NAVDataPoint[];
  title?: string;
  height?: number;
  showCrash?: boolean;
}

export default function NAVChart({ data, title, height = 300, showCrash = false }: NAVChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-medium mb-4 text-white">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="crashGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" strokeOpacity={0.3} />
          <XAxis
            dataKey="day"
            stroke="#6b7280"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            label={{ value: 'Days', position: 'insideBottom', offset: -5, style: { fontSize: 12, fill: '#9ca3af' } }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            label={{ value: 'Value', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#9ca3af' } }}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0a0a0a',
              border: '1px solid #1f2937',
              borderRadius: '8px',
              fontSize: 12,
              color: '#fff',
            }}
            formatter={(value: number) => [`$${value.toFixed(4)}`, 'NAV']}
            labelFormatter={(label) => `Day ${label}`}
          />
          <Area
            type="monotone"
            dataKey="nav"
            stroke={showCrash && data.some(d => d.label === 'Crash') ? "#10b981" : "#ef4444"}
            strokeWidth={3}
            fill={showCrash && data.some(d => d.label === 'Crash') ? "url(#crashGradient)" : "url(#navGradient)"}
            dot={false}
            activeDot={{ r: 6, fill: '#10b981' }}
          />
          {showCrash && data.some(d => d.label === 'Crash') && (
            <ReferenceDot
              x={data.findIndex(d => d.label === 'Crash')}
              y={data.find(d => d.label === 'Crash')?.nav}
              r={8}
              fill="#10b981"
              stroke="#000"
              strokeWidth={3}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
