import { createBucketClient } from '@cosmicjs/sdk'
import {
  DashboardWidget,
  AnalyticsData,
  UserRole,
  UITheme,
  DashboardSettings,
  ResponsiveLayout,
  CreateWidgetData,
  CreateAnalyticsData
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Dashboard Widgets API
export async function getDashboardWidgets(): Promise<DashboardWidget[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'dashboard-widgets' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const widgets = response.objects as DashboardWidget[]
    
    // Sort by display_order and filter active widgets
    return widgets
      .filter(widget => widget.metadata?.is_active)
      .sort((a, b) => {
        const orderA = a.metadata?.display_order || 0
        const orderB = b.metadata?.display_order || 0
        return orderA - orderB
      })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch dashboard widgets')
  }
}

export async function createDashboardWidget(data: CreateWidgetData): Promise<DashboardWidget> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'dashboard-widgets',
      title: data.widget_name,
      metadata: {
        widget_name: data.widget_name,
        widget_type: data.widget_type,
        data_source: data.data_source || '',
        widget_config: data.widget_config || {},
        display_order: data.display_order || 0,
        grid_size: data.grid_size,
        is_active: data.is_active
      }
    })

    return response.object as DashboardWidget
  } catch (error) {
    throw new Error('Failed to create dashboard widget')
  }
}

// Analytics Data API
export async function getAnalyticsData(): Promise<AnalyticsData[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'analytics-data' })
      .props(['id', 'title', 'metadata'])
      .depth(1)

    return response.objects as AnalyticsData[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch analytics data')
  }
}

export async function createAnalyticsData(data: CreateAnalyticsData): Promise<AnalyticsData> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'analytics-data',
      title: data.metric_name,
      metadata: {
        metric_name: data.metric_name,
        current_value: data.current_value,
        previous_value: data.previous_value || 0,
        change_percentage: data.change_percentage || 0,
        trend_direction: data.trend_direction || 'stable',
        chart_data: data.chart_data || {},
        date_range: data.date_range || ''
      }
    })

    return response.object as AnalyticsData
  } catch (error) {
    throw new Error('Failed to create analytics data')
  }
}

// User Roles API
export async function getUserRoles(): Promise<UserRole[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-roles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as UserRole[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch user roles')
  }
}

// UI Themes API
export async function getUIThemes(): Promise<UITheme[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ui-themes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as UITheme[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch UI themes')
  }
}

// Dashboard Settings API
export async function getDashboardSettings(): Promise<DashboardSettings | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'dashboard-settings' })
      .props(['id', 'title', 'metadata'])
      .depth(1)

    return response.object as DashboardSettings
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch dashboard settings')
  }
}

export async function updateDashboardSettings(id: string, metadata: Partial<DashboardSettings['metadata']>): Promise<DashboardSettings> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata
    })

    return response.object as DashboardSettings
  } catch (error) {
    throw new Error('Failed to update dashboard settings')
  }
}

// Responsive Layouts API
export async function getResponsiveLayouts(): Promise<ResponsiveLayout[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'responsive-layouts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as ResponsiveLayout[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch responsive layouts')
  }
}

// Generic widget update
export async function updateWidget(id: string, metadata: Partial<DashboardWidget['metadata']>): Promise<DashboardWidget> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata
    })

    return response.object as DashboardWidget
  } catch (error) {
    throw new Error('Failed to update widget')
  }
}

// Delete widget
export async function deleteWidget(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id)
  } catch (error) {
    throw new Error('Failed to delete widget')
  }
}