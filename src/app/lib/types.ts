// src/app/lib/types.ts
export interface GasData {
  year: number
  month: string
  state: string
  part_state: string
  type: string
  source: string
  volume: number
  state_english: string
}

export interface FilterState {
  year?: number
  month?: string
  part_state?: string
  source?: string
}

export interface MapClickData {
  state: string
  state_english: string
  totalVolume: number
  sourceBreakdown: Array<{
    source: string
    volume: number
  }>
}