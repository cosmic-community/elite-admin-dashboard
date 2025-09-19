import { Clock, User, Settings, TrendingUp, Bell } from 'lucide-react'

export default function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'user',
      title: 'New user registered',
      description: 'John Doe created an account',
      time: '2 minutes ago',
      icon: User,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'metric',
      title: 'Revenue milestone',
      description: 'Monthly revenue exceeded $25K',
      time: '15 minutes ago',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'system',
      title: 'System updated',
      description: 'Dashboard settings were modified',
      time: '1 hour ago',
      icon: Settings,
      color: 'text-orange-500'
    },
    {
      id: 4,
      type: 'notification',
      title: 'Alert triggered',
      description: 'High server load detected',
      time: '2 hours ago',
      icon: Bell,
      color: 'text-red-500'
    },
    {
      id: 5,
      type: 'user',
      title: 'User login',
      description: 'Admin user signed in',
      time: '3 hours ago',
      icon: User,
      color: 'text-blue-500'
    }
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-6 animate-slideUp">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Clock className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
            <div className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all activity
        </button>
      </div>
    </div>
  )
}