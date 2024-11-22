// app/components/Chart/index.tsx
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { MapClickData } from '@/app/lib/types'

interface ChartProps {
  data: MapClickData
}

export default function Chart({ data }: ChartProps) {
  const chartData = data.sourceBreakdown
    .filter(item => item.volume > 0)
    .sort((a, b) => b.volume - a.volume)

  return (
    <div className="w-full h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Volume by Source</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="source" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="volume" fill="#3B82F6" name="Volume" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}