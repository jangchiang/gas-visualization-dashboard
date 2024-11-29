// app/components/Table/index.tsx
'use client'

import { MapClickData } from '@/app/lib/types'
import { useState } from 'react'

interface TableProps {
  data: MapClickData
}

export default function Table({ data }: TableProps) {
  const [view, setView] = useState<'source' | 'type'>('source')

  const tableData = view === 'source' ? data.sourceBreakdown : data.typeBreakdown

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2">
        <h3 className="text-lg font-semibold">Detailed Breakdown</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setView('source')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              view === 'source' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Source
          </button>
          <button
            onClick={() => setView('type')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              view === 'type' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Type
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {view === 'source' ? 'Source' : 'Type'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % of Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData
              .filter(item => item.volume > 0)
              .sort((a, b) => b.volume - a.volume)
              .map((item, index) => (
                <tr key={view === 'source' ? item.source : item.type} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {view === 'source' ? item.source : item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.volume.toLocaleString('en-US', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((item.volume / data.totalVolume) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}