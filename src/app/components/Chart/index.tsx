// app/components/Chart/index.tsx
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { MapClickData } from '@/app/lib/types'
import { useState } from 'react'

interface ChartProps {
  data: MapClickData
}

export default function Chart({ data }: ChartProps) {
  const [view, setView] = useState<'source' | 'type'>('source')
  
  const chartData = view === 'source' 
    ? data.sourceBreakdown
        .filter(item => item.volume > 0)
        .sort((a, b) => b.volume - a.volume)
    : data.typeBreakdown
        .filter(item => item.volume > 0)
        .sort((a, b) => b.volume - a.volume)

  return (
    <div className="w-full h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Volume by {view === 'source' ? 'Source' : 'Type'}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setView('source')}
            className={`px-3 py-1 rounded ${
              view === 'source' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Source
          </button>
          <button
            onClick={() => setView('type')}
            className={`px-3 py-1 rounded ${
              view === 'type' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Type
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={view === 'source' ? 'source' : 'type'}
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