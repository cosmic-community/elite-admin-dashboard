'use client'

import { useState } from 'react'
import { 
  Menu, 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  Settings, 
  User,
  LogOut,
  Maximize,
  RefreshCw
} from 'lucide-react'
import { useTheme } from './ThemeProvider'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const notifications = [
    {
      id: 1,
      title: 'New Widget Added',
      message: 'A new analytics widget has been added to your dashboard',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      title: 'System Update',
      message: 'Dashboard system will be updated tonight at 12 AM',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'User Role Updated',
      message: 'Manager role permissions have been updated',
      time: '3 hours ago',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-card border-b border-border px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-xl font-semibold text-foreground">Dashboard Overview</h2>
            <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
            title="Refresh dashboard"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen()
              } else {
                document.documentElement.requestFullscreen()
              }
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Toggle fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-sm text-muted-foreground">{unreadCount} unread notifications</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-accent transition-colors ${
                        notification.unread ? 'bg-accent/50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-foreground">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <button className="text-sm text-primary hover:underline">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">A</span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <div className="border-t border-border my-2"></div>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-destructive hover:bg-accent rounded-md transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
        </div>
      </div>
    </header>
  )
}