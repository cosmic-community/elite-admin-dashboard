import { getDashboardWidgets, getAnalyticsData } from '@/lib/cosmic'
import MetricCard from './MetricCard'
import ChartWidget from './ChartWidget'
import ActivityFeed from './ActivityFeed'
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react'

export default async function DashboardContent() {
  const [widgets, analyticsData] = await Promise.all([
    getDashboardWidgets(),
    getAnalyticsData()
  ])

  // Mock data for demonstration since content model is empty
  const mockMetrics = [
    {
      title: 'Total Revenue',
      value: '$24,500',
      change: 12.5,
      trend: 'up' as const,
      icon: 'DollarSign'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: -2.3,
      trend: 'down' as const,
      icon: 'Users'
    },
    {
      title: 'Orders',
      value: '89',
      change: 8.1,
      trend: 'up' as const,
      icon: 'ShoppingCart'
    },
    {
      title: 'Page Views',
      value: '12,456',
      change: 5.4,
      trend: 'up' as const,
      icon: 'Eye'
    }
  ]

  const mockChartData = [
    { name: 'Jan', value: 4000, revenue: 2400 },
    { name: 'Feb', value: 3000, revenue: 1398 },
    { name: 'Mar', value: 2000, revenue: 9800 },
    { name: 'Apr', value: 2780, revenue: 3908 },
    { name: 'May', value: 1890, revenue: 4800 },
    { name: 'Jun', value: 2390, revenue: 3800 },
    { name: 'Jul', value: 3490, revenue: 4300 }
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign':
        return DollarSign
      case 'Users':
        return Users
      case 'ShoppingCart':
        return ShoppingCart
      case 'Eye':
        return Eye
      default:
        return TrendingUp
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your key metrics and performance indicators
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric, index) => {
          const IconComponent = getIcon(metric.icon)
          return (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              icon={<IconComponent className="w-5 h-5" />}
            />
          )
        })}
      </div>

      {/* Charts and Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <ChartWidget
            title="Revenue Trend"
            data={mockChartData}
            dataKey="revenue"
            chartType="line"
          />
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="User Growth"
          data={mockChartData}
          dataKey="value"
          chartType="area"
        />
        <ChartWidget
          title="Performance Analytics"
          data={mockChartData}
          dataKey="revenue"
          chartType="bar"
        />
      </div>

      {/* Widget Management Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Dynamic Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              This dashboard is powered by your Cosmic CMS content model
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="font-medium text-foreground">Dashboard Widgets</p>
            <p className="text-muted-foreground mt-1">
              {widgets.length} widgets configured
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="font-medium text-foreground">Analytics Data</p>
            <p className="text-muted-foreground mt-1">
              {analyticsData.length} data points available
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="font-medium text-foreground">Responsive Design</p>
            <p className="text-muted-foreground mt-1">
              Optimized for all devices
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="font-medium text-foreground">Real-time Updates</p>
            <p className="text-muted-foreground mt-1">
              Live data synchronization
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}