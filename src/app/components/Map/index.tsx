// src/app/components/Map/index.tsx
'use client'

import { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { GasData, MapClickData } from '@/app/lib/types'
import { aggregateByState, getSourceBreakdown } from '@/app/lib/data'
import { PROVINCES, PROVINCE_MAPPING } from '@/app/lib/constants'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MapProps {
  data: GasData[]
  onStateClick: (data: MapClickData) => void
}

interface ViewBox {
  x: number
  y: number
  width: number
  height: number
}

const MapComponent = (props: MapProps) => {
  const { data = [], onStateClick } = props
  const mapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [tooltipContent, setTooltipContent] = useState<{ content: string; x: number; y: number } | null>(null)
  const [viewBox, setViewBox] = useState<ViewBox>({ x: 0, y: 0, width: 1000, height: 1000 })
  const [scale, setScale] = useState(1)

  const stateData = useMemo(() => {
    const aggregates = new Map<string, number>()
    Object.entries(PROVINCE_MAPPING).forEach(([thCode, provinceName]) => {
      const provinceData = data.filter(d => d.state.trim() === provinceName.trim())
      const total = provinceData.reduce((sum, d) => sum + d.volume, 0)
      aggregates.set(thCode, total)
    })
    const max = Math.max(...Array.from(aggregates.values()), 0)
    console.log('State aggregates:', Object.fromEntries(aggregates))
    return { aggregates, max }
  }, [data])

  const overallData = useMemo(() => {
    const sourceBreakdown = Array.from(
      data.reduce((acc, item) => {
        const current = acc.get(item.source) || 0
        acc.set(item.source, current + item.volume)
        return acc
      }, new Map<string, number>())
    )
      .map(([source, volume]) => ({ source, volume }))
      .sort((a, b) => b.volume - a.volume)

    const typeBreakdown = Array.from(
      data.reduce((acc, item) => {
        const current = acc.get(item.type) || 0
        acc.set(item.type, current + item.volume)
        return acc
      }, new Map<string, number>())
    )
      .map(([type, volume]) => ({ type, volume }))
      .sort((a, b) => b.volume - a.volume)

    return {
      totalVolume: sourceBreakdown.reduce((sum, item) => sum + item.volume, 0),
      sourceBreakdown,
      typeBreakdown
    }
  }, [data])

  useEffect(() => {
    fetch('/th.svg')
      .then(response => response.text())
      .then(svg => {
        setSvgContent(svg)
        setTimeout(updateMapColors, 100)
      })
  }, [])

  const getStateColor = useCallback((thCode: string) => {
    const volume = stateData.aggregates.get(thCode) || 0
    if (stateData.max === 0) return '#f3f4f6'
    const intensity = volume / stateData.max
    return `rgba(0, 0, 255, ${intensity})`
  }, [stateData])
  
  const updateMapColors = useCallback(() => {
    if (!mapRef.current) return
    requestAnimationFrame(() => {
      const paths = mapRef.current?.getElementsByTagName('path')
      if (paths) {
        Array.from(paths).forEach(path => {
          if (path.id) {
            const color = getStateColor(path.id)
            path.style.fill = color
            path.style.transition = 'fill 0.3s ease'
          }
        })
      }
    })
  }, [getStateColor])

  useEffect(() => {
    updateMapColors()
  }, [data, updateMapColors])

  const handleMouseMove = (event: React.MouseEvent, thCode: string) => {
    const provinceName = PROVINCE_MAPPING[thCode]
    if (!provinceName) return

    const volume = stateData.aggregates.get(thCode) || 0
    setTooltipContent({
      content: `${PROVINCES[provinceName]?.english || provinceName}: ${volume.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      x: event.clientX,
      y: event.clientY
    })
  }

  const handleStateClick = (thCode: string) => {
    const provinceName = PROVINCE_MAPPING[thCode]
    if (!provinceName) return

    setSelectedState(thCode)
    const stateEnglish = PROVINCES[provinceName]?.english || provinceName
    const totalVolume = stateData.aggregates.get(thCode) || 0

    const provinceData = data.filter(d => d.state.trim() === provinceName.trim())
    
    const sourceBreakdown = Array.from(
      provinceData.reduce((acc, item) => {
        const current = acc.get(item.source) || 0
        acc.set(item.source, current + item.volume)
        return acc
      }, new Map<string, number>())
    )
      .map(([source, volume]) => ({ source, volume }))
      .sort((a, b) => b.volume - a.volume)

    const typeBreakdown = Array.from(
      provinceData.reduce((acc, item) => {
        const current = acc.get(item.type) || 0
        acc.set(item.type, current + item.volume)
        return acc
      }, new Map<string, number>())
    )
      .map(([type, volume]) => ({ type, volume }))
      .sort((a, b) => b.volume - a.volume)

    onStateClick({
      state: provinceName,
      state_english: stateEnglish,
      totalVolume,
      sourceBreakdown,
      typeBreakdown
    })

    const bbox = (svgRef.current?.getElementById(thCode) as SVGPathElement)?.getBBox()
    if (bbox) {
      const padding = 50
      setViewBox({
        x: bbox.x - padding,
        y: bbox.y - padding,
        width: bbox.width + padding * 2,
        height: bbox.height + padding * 2
      })
      setScale(2)
    }
  }

  const handleReset = () => {
    setSelectedState(null)
    setViewBox({ x: 0, y: 0, width: 1000, height: 1000 })
    setScale(1)
    updateMapColors()
    onStateClick({
      state: "Overall",
      state_english: "Thailand",
      totalVolume: overallData.totalVolume,
      sourceBreakdown: overallData.sourceBreakdown,
      typeBreakdown: overallData.typeBreakdown
    })
  }

  return (
    <div className="relative w-full h-[600px] bg-white rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          <Maximize2 className="w-5 h-5 text-gray-600" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setScale(s => Math.min(s * 1.5, 5))}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          <ZoomIn className="w-5 h-5 text-gray-600" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const newScale = scale / 1.5
            if (newScale <= 1) handleReset()
            else setScale(newScale)
          }}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        >
          <ZoomOut className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>

      <motion.div 
        className="w-full h-full"
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 100 }}
        ref={mapRef}
      >
        {svgContent && (
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            preserveAspectRatio="xMidYMid meet"
            dangerouslySetInnerHTML={{
              __html: svgContent
                .replace(/<svg[^>]*>/, '')
                .replace(/<\/svg>/, '')
                .replace(/fill="[^"]*"/g, '')
                .replace(/style="[^"]*"/g, '')
                .replace(/<path/g, '<path class="transition-all duration-300 cursor-pointer hover:opacity-80" style="stroke:#666666;stroke-width:1"')
            }}
            onClick={(e) => {
              const path = (e.target as HTMLElement).closest('path')
              if (path?.id) handleStateClick(path.id)
            }}
            onMouseMove={(e) => {
              const path = (e.target as HTMLElement).closest('path')
              if (path?.id) handleMouseMove(e, path.id)
            }}
            onMouseLeave={() => setTooltipContent(null)}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {tooltipContent && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 bg-black text-white px-2 py-1 rounded text-sm pointer-events-none"
            style={{
              left: `${tooltipContent.x + 10}px`,
              top: `${tooltipContent.y + 10}px`
            }}
          >
            {tooltipContent.content}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 z-10">
        <div className="flex items-center bg-white p-2 rounded shadow-lg border border-gray-200">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300" style={{ backgroundColor: '#f3f4f6' }} />
              <span className="ml-2 text-xs">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300" style={{ backgroundColor: 'rgb(55, 55, 255)' }} />
              <span className="ml-2 text-xs">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapComponent