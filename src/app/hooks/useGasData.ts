// src/app/hooks/useGasData.ts
import { useState, useEffect } from 'react'
import { GasData, FilterState } from '../lib/types'
import { loadCSVData, filterData } from '../lib/data'

interface GasDataState {
  data: GasData[]
  isLoading: boolean
  error: string | null
}

export function useGasData(filters: FilterState): GasDataState {
  const [state, setState] = useState<GasDataState>({
    data: [],
    isLoading: true,
    error: null
  })

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setState(prev => ({ ...prev, isLoading: true }))
        const rawData = await loadCSVData()
        const filteredData = filterData(rawData, filters)
        
        if (isMounted) {
          setState({ 
            data: filteredData, 
            isLoading: false, 
            error: null 
          })
        }
      } catch (error) {
        if (isMounted) {
          setState({ 
            data: [], 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to load data' 
          })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [filters])

  return state
}