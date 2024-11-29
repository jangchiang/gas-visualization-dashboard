// src/app/components/Filter/index.tsx
'use client'

import { useState, useEffect } from 'react'
import { YEARS, MONTHS, REGIONS, SOURCES, TYPE, PROVINCES, PROVINCE_MAPPING } from '@/app/lib/constants'
import { FilterState } from '@/app/lib/types'
import { Search } from 'lucide-react'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
  onProvinceSelect?: (provinceCode: string) => void
}

interface SearchResult {
  thCode: string
  name: string
  englishName: string
}

export default function Filter({ onFilterChange, onProvinceSelect }: FilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    onFilterChange(prev => ({
      ...prev,
      [key]: value || undefined
    }))
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.trim()) {
      const results = Object.entries(PROVINCE_MAPPING)
        .filter(([_, provinceName]) => {
          const english = PROVINCES[provinceName]?.english || ''
          return (
            provinceName.toLowerCase().includes(value.toLowerCase()) ||
            english.toLowerCase().includes(value.toLowerCase())
          )
        })
        .map(([thCode, provinceName]) => ({
          thCode,
          name: provinceName,
          englishName: PROVINCES[provinceName]?.english || provinceName
        }))
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    if (onProvinceSelect) {
      onProvinceSelect(result.thCode)
    }
    setSearchTerm('')
    setShowResults(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('#search-container')) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectClass = "w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <div className="space-y-4">
      <div id="search-container" className="relative w-full md:w-80 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search provinces..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.thCode}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                <div className="font-medium">{result.englishName}</div>
                <div className="text-sm text-gray-500">{result.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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
          <label className={labelClass}>Type</label>
          <select
            className={selectClass}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            defaultValue=""
          >
            <option value="">All Types</option>
            {TYPE.map(type => (
              <option key={type} value={type}>{type}</option>
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
    </div>
  )
}