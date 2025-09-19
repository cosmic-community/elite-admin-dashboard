'use client'

import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

interface ChartWidgetProps {
  title: string
  data: Array<Record<string, any>>
  dataKey: string
  chartType?: 'line' | 'area' | 'bar'
  height?: number
}

export default function ChartWidget({ 
  title, 
  data, 
  dataKey, 
  chartType = 'line', 
  height = 320 
}: ChartWidgetProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    const gridProps = {
      strokeDasharray: '3 3',
      stroke: 'hsl(var(--border))'
    }

    const axisProps = {
      tick: { fontSize: 12, fill: 'hsl(var(--muted-foreground))' },
      axisLine: { stroke: 'hsl(var(--border))' },
      tickLine: { stroke: 'hsl(var(--border))' }
    }

    const tooltipProps = {
      contentStyle: {
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '8px',
        fontSize: '12px',
        color: 'hsl(var(--card-foreground))'
      }
    }

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke="hsl(var(--primary))" 
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        )
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Bar 
              dataKey={dataKey} 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )
      
      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipProps} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
          </LineChart>
        )
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 animate-slideUp">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
          <span className="text-sm text-muted-foreground capitalize">{chartType} Chart</span>
        </div>
      </div>
      
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}