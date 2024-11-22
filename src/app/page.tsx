// src/app/page.tsx
'use client'

import { useState } from 'react'
import { useGasData } from './hooks/useGasData'
import { FilterState, MapClickData, GasData } from './lib/types'
import Filter from './components/Filter'
import Map from './components/Map'
import Chart from './components/Chart'
import Table from './components/Table'

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({})
  const [selectedState, setSelectedState] = useState<MapClickData | null>(null)
  const {
    data = [] as GasData[],
    isLoading = false,
    error = null
  } = useGasData(filters) || {}

  const handleStateClick = (stateData: MapClickData) => {
    setSelectedState(stateData)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Gas Distribution Dashboard</h1>
          <Filter onFilterChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-[600px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-[600px] text-red-500">
                Error loading data: {error}
              </div>
            ) : (
              <Map 
                data={data} 
                onStateClick={handleStateClick}
              />
            )}
          </div>

          {selectedState && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedState.state_english} Details
              </h2>
              <Chart data={selectedState} />
              <Table data={selectedState} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}