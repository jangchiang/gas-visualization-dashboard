// src/app/components/Filter/index.tsx
'use client'

import { YEARS, MONTHS, REGIONS, SOURCES } from '@/app/lib/constants'
import { FilterState } from '@/app/lib/types'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
}

export default function Filter({ onFilterChange }: FilterProps) {
  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    onFilterChange(prev => ({
      ...prev,
      [key]: value || undefined
    }))
  }

  const selectClass = "w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      <div>
        <label className={labelClass}>Year</label>
        <select 
          className={selectClass}
          onChange={(e) => handleFilterChange('year', parseInt(e.target.value))}
          defaultValue=""
        >
          <option value="">All Years</option>
          {YEARS.map(year => (
            <option key={year} value={year}>{year + 2500}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Month</label>
        <select 
          className={selectClass}
          onChange={(e) => handleFilterChange('month', e.target.value)}
          defaultValue=""
        >
          <option value="">All Months</option>
          {MONTHS.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Region</label>
        <select 
          className={selectClass}
          onChange={(e) => handleFilterChange('part_state', e.target.value)}
          defaultValue=""
        >
          <option value="">All Regions</option>
          {REGIONS.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Source</label>
        <select 
          className={selectClass}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          defaultValue=""
        >
          <option value="">All Sources</option>
          {SOURCES.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>
    </div>
  )
}