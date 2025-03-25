// components/CustomMarkLineChart.tsx
import React from 'react'

interface Marker {
  index: number
  label: string
  color?: string
  size?: number
  symbol?: 'circle' | 'square' | 'triangle'
}

interface CustomMarkLineChartProps {
  data: number[]
  width?: number
  height?: number
  lineColor?: string
  areaOpacity?: number
  smooth?: boolean
  markers?: Marker[]
}

const CustomMarkLineChart: React.FC<CustomMarkLineChartProps> = ({

}) => {
    const data = [15, 230, 24, 218, 135, 180, 90]
    const width = 600
    const height = 300
    const lineColor="#8b5cf6" // 紫色
    const areaOpacity=0.15
     const  smooth = true
     const  markers=[
      {
        index: 1, // 第二个数据点
        label: '峰值',
        color: '#10b981',
        size: 10
      },
      {
        index: 2,
        label: '异常',
        color: '#ef4444'
      }
    ]
  const padding = 20
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const valueRange = maxValue - minValue || 1

  // 生成坐标点
  const points = data.map((value, index) => ({
    x: padding + (index * chartWidth) / (data.length - 1),
    y: padding + chartHeight - ((value - minValue) / valueRange) * chartHeight
  }))

  // 生成平滑曲线路径
  const generateSmoothPath = () => {
    if (points.length < 2) return ''
    
    let path = `M${points[0].x},${points[0].y}`
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const controlX1 = prev.x + (curr.x - prev.x) * 0.3
      const controlX2 = prev.x + (curr.x - prev.x) * 0.7
      path += ` C${controlX1},${prev.y} ${controlX2},${curr.y} ${curr.x},${curr.y}`
    }
    
    return path
  }

  // 生成填充区域路径
  const areaPath = smooth 
    ? `${generateSmoothPath()} L${points[points.length-1].x},${padding + chartHeight} L${points[0].x},${padding + chartHeight} Z`
    : `M${points[0].x},${padding + chartHeight} L${points.map(p => `${p.x},${p.y}`).join(' ')} L${points[points.length-1].x},${padding + chartHeight} Z`

  // 渲染标记符号
  const renderMarkerSymbol = (marker: Marker, x: number, y: number) => {
    const size = marker.size || 8
    const color = marker.color || '#ef4444'
    
    switch(marker.symbol || 'circle') {
      case 'square':
        return (
          <rect
            x={x - size}
            y={y - size}
            width={size * 2}
            height={size * 2}
            fill={color}
          />
        )
      case 'triangle':
        return (
          <path
            d={`M${x},${y - size} L${x + size},${y + size} L${x - size},${y + size} Z`}
            fill={color}
          />
        )
      default: // circle
        return (
          <circle
            cx={x}
            cy={y}
            r={size}
            fill={color}
          />
        )
    }
  }

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      {/* 填充区域 */}
      <path 
        d={areaPath} 
        fill={lineColor} 
        fillOpacity={areaOpacity}
      />

      {/* 折线 */}
      <path
        d={smooth ? generateSmoothPath() : points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke={lineColor}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 自定义标记 */}
      {markers.map((marker) => {
        const point = points[marker.index]
        if (!point) return null
        
        return (
          <g key={`${marker.index}-${marker.label}`}>
            {renderMarkerSymbol(marker, point.x, point.y)}
            <text
              x={point.x}
              y={point.y - (marker.size || 8) - 5}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill={marker.color || '#ef4444'}
            >
              {marker.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default CustomMarkLineChart