// Base Cosmic object interface
interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Dashboard Widget interface
export interface DashboardWidget extends CosmicObject {
  type: 'dashboard-widgets'
  metadata: {
    widget_name: string
    widget_type: 'chart' | 'metric' | 'table' | 'progress' | 'activity'
    data_source?: string
    widget_config?: Record<string, any>
    display_order?: number
    grid_size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
    is_active: boolean
  }
}

// Analytics Data interface
export interface AnalyticsData extends CosmicObject {
  type: 'analytics-data'
  metadata: {
    metric_name: string
    current_value: number
    previous_value?: number
    change_percentage?: number
    trend_direction?: 'up' | 'down' | 'stable'
    chart_data?: Record<string, any>
    date_range?: string
  }
}

// User Role interface
export interface UserRole extends CosmicObject {
  type: 'user-roles'
  metadata: {
    role_name: string
    role_description?: string
    permission_level: 'admin' | 'manager' | 'editor' | 'viewer'
    allowed_widgets?: DashboardWidget[]
    dashboard_permissions?: Record<string, any>
  }
}

// UI Theme interface
export interface UITheme extends CosmicObject {
  type: 'ui-themes'
  metadata: {
    theme_name: string
    primary_color: string
    secondary_color?: string
    background_color?: string
    text_color?: string
    theme_type: 'light' | 'dark' | 'auto'
    css_variables?: Record<string, any>
  }
}

// Dashboard Settings interface
export interface DashboardSettings extends CosmicObject {
  type: 'dashboard-settings'
  metadata: {
    dashboard_title: string
    default_theme?: UITheme
    auto_refresh_interval?: number
    enable_dark_mode: boolean
    show_grid_lines: boolean
    global_config?: Record<string, any>
  }
}

// Responsive Layout interface
export interface ResponsiveLayout extends CosmicObject {
  type: 'responsive-layouts'
  metadata: {
    layout_name: string
    device_type: 'desktop' | 'tablet' | 'mobile'
    breakpoint_width: number
    grid_columns: number
    grid_gap?: number
    layout_config?: Record<string, any>
    widget_arrangement?: Record<string, any>
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}

// Chart data types
export interface ChartDataPoint {
  name: string
  value: number
  date?: string
}

export interface MetricCard {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'stable'
  icon?: string
}

// Widget configuration types
export interface WidgetConfig {
  title?: string
  color?: string
  showLegend?: boolean
  height?: number
  refreshInterval?: number
  dataKey?: string
  chartType?: 'line' | 'bar' | 'area' | 'pie' | 'doughnut'
}

// Theme configuration
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  primaryColor: string
  accentColor: string
  customVars?: Record<string, string>
}

// Dashboard state interface
export interface DashboardState {
  widgets: DashboardWidget[]
  analytics: AnalyticsData[]
  currentTheme: UITheme | null
  settings: DashboardSettings | null
  isLoading: boolean
  error: string | null
}

// Form types for creating/updating content
export interface CreateWidgetData {
  widget_name: string
  widget_type: 'chart' | 'metric' | 'table' | 'progress' | 'activity'
  data_source?: string
  widget_config?: Record<string, any>
  display_order?: number
  grid_size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
  is_active: boolean
}

export interface CreateAnalyticsData {
  metric_name: string
  current_value: number
  previous_value?: number
  change_percentage?: number
  trend_direction?: 'up' | 'down' | 'stable'
  chart_data?: Record<string, any>
  date_range?: string
}

// Type guards
export function isDashboardWidget(obj: CosmicObject): obj is DashboardWidget {
  return obj.type === 'dashboard-widgets'
}

export function isAnalyticsData(obj: CosmicObject): obj is AnalyticsData {
  return obj.type === 'analytics-data'
}

export function isUserRole(obj: CosmicObject): obj is UserRole {
  return obj.type === 'user-roles'
}

// Utility types
export type WidgetType = DashboardWidget['metadata']['widget_type']
export type GridSize = DashboardWidget['metadata']['grid_size']
export type TrendDirection = AnalyticsData['metadata']['trend_direction']
export type PermissionLevel = UserRole['metadata']['permission_level']
export type ThemeType = UITheme['metadata']['theme_type']
export type DeviceType = ResponsiveLayout['metadata']['device_type']