'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Palette,
  Smartphone,
  X,
  ChevronDown,
  Activity,
  PieChart
} from 'lucide-react'

interface SidebarProps {
  onClose: () => void
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    submenu: [
      { label: 'Overview', href: '/analytics' },
      { label: 'Real-time', href: '/analytics/realtime' },
      { label: 'Reports', href: '/analytics/reports' }
    ]
  },
  {
    id: 'widgets',
    label: 'Widgets',
    icon: PieChart,
    submenu: [
      { label: 'Manage Widgets', href: '/widgets' },
      { label: 'Add Widget', href: '/widgets/add' },
      { label: 'Widget Library', href: '/widgets/library' }
    ]
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    submenu: [
      { label: 'All Users', href: '/users' },
      { label: 'Roles', href: '/users/roles' },
      { label: 'Permissions', href: '/users/permissions' }
    ]
  },
  {
    id: 'layouts',
    label: 'Responsive Layouts',
    icon: Smartphone,
    href: '/layouts'
  },
  {
    id: 'themes',
    label: 'UI Themes',
    icon: Palette,
    href: '/themes'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings'
  }
]

export default function Sidebar({ onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [expandedItems, setExpandedItems] = useState<string[]>(['analytics'])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Elite Dashboard</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-accent rounded-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className={`
                    sidebar-item w-full justify-between
                    ${activeItem === item.id ? 'active' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedItems.includes(item.id) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedItems.includes(item.id) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu.map((subItem, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveItem(`${item.id}-${index}`)}
                        className={`
                          sidebar-item w-full text-sm
                          ${activeItem === `${item.id}-${index}` ? 'active' : ''}
                        `}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setActiveItem(item.id)}
                className={`
                  sidebar-item w-full
                  ${activeItem === item.id ? 'active' : ''}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-foreground">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}