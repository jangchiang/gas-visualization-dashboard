// src/app/lib/data.ts
import { GasData, FilterState } from './types'
import { PROVINCE_MAPPING } from './constants'

export async function loadCSVData(): Promise<GasData[]> {
  try {
    const response = await fetch('/finaldataset_tran.csv')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text()
    return csvText
      .split('\n')
      .slice(1)
      .filter(row => row.trim())
      .map(row => {
        const [year, month, state, part_state, type, source, volume, state_english] = row.split(',')
        return {
          year: parseInt(year),
          month: month.trim(),
          state: state.trim(),
          part_state: part_state.trim(),
          type: type.trim(),
          source: source.trim(),
          volume: parseFloat(volume),
          state_english: state_english.trim()
        }
      })
      .filter(data => !isNaN(data.volume))
  } catch (error) {
    console.error('Error loading CSV:', error)
    throw error
  }
}

export function filterData(data: GasData[], filters: FilterState): GasData[] {
  return data.filter(item => {
    if (filters.year && item.year !== filters.year) return false
    if (filters.month && item.month !== filters.month) return false
    if (filters.part_state && item.part_state !== filters.part_state) return false
    if (filters.source && item.source !== filters.source) return false
    return true
  })
}

export function aggregateByState(data: GasData[]): Map<string, number> {
  return data.reduce((acc, item) => {
    const thCode = Object.entries(PROVINCE_MAPPING)
      .find(([_, thaiprovince]) => thaiprovince === item.state)?.[0]
    if (thCode) {
      const currentTotal = acc.get(thCode) || 0
      acc.set(thCode, currentTotal + item.volume)
    }
    return acc
  }, new Map<string, number>())
}

export function getSourceBreakdown(data: GasData[], thCode: string): { source: string; volume: number }[] {
  const provinceName = PROVINCE_MAPPING[thCode]
  if (!provinceName) return []

  const breakdown = data
    .filter(item => item.state === provinceName)
    .reduce((acc, item) => {
      const current = acc.get(item.source) || 0
      acc.set(item.source, current + item.volume)
      return acc
    }, new Map<string, number>())

  return Array.from(breakdown.entries())
    .map(([source, volume]) => ({ source, volume }))
    .sort((a, b) => b.volume - a.volume)
}

export { PROVINCE_MAPPING }