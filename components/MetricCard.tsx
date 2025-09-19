import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'stable'
  icon?: ReactNode
}

export default function MetricCard({ title, value, change, trend = 'stable', icon }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="metric-card group hover:shadow-lg animate-slideUp">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
          {value}
        </p>
        {change !== undefined && (
          <p className="text-sm text-muted-foreground">
            {trend === 'up' ? 'Increase' : trend === 'down' ? 'Decrease' : 'No change'} from last period
          </p>
        )}
      </div>

      {/* Subtle animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
    </div>
  )
}