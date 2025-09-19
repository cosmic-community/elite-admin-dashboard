# Elite Admin Dashboard

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=300&fit=crop&auto=format)

A world-class, fully responsive admin dashboard built with Next.js 15 and TypeScript. Features modern UI design, real-time analytics, customizable widgets, and comprehensive user management powered by Cosmic CMS.

## ✨ Features

- 🎯 **Real-time Analytics Dashboard** - Interactive charts and KPI tracking
- 📱 **Fully Responsive Design** - Optimized for desktop, tablet, and mobile
- 🎨 **Dynamic Theme System** - Light/dark modes with custom color schemes
- 📊 **Customizable Widgets** - Drag-and-drop dashboard customization
- 👥 **User Role Management** - Granular permissions and access control
- 🔄 **Real-time Updates** - Live data synchronization
- 📈 **Advanced Analytics** - Comprehensive data visualization
- ⚡ **Performance Optimized** - Fast loading with server-side rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68cd964ad7c81076a7d6be19&clone_repository=68cd98f5d7c81076a7d6be26)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "design a best world class admin dashboard also responsive also"

### Code Generation Prompt

> "craete a best world class responsive and best ui admin dashboard"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Content Management**: Cosmic CMS with SDK v1.5+
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Development**: ESLint, Prettier, TypeScript strict mode

## 📋 Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket
- Basic knowledge of React and TypeScript

## ⚙️ Installation

1. **Clone and install dependencies**:
```bash
bun install
```

2. **Environment Setup**:
Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

3. **Run the development server**:
```bash
bun dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Cosmic SDK Examples

### Fetching Dashboard Widgets
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all active dashboard widgets
export async function getDashboardWidgets() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'dashboard-widgets',
        'metadata.is_active': true 
      })
      .depth(1)
      .props(['id', 'title', 'metadata'])
    
    return response.objects.sort((a, b) => 
      (a.metadata?.display_order || 0) - (b.metadata?.display_order || 0)
    )
  } catch (error) {
    if (error.status === 404) return []
    throw new Error('Failed to fetch dashboard widgets')
  }
}
```

### Managing Analytics Data
```typescript
// Create new analytics entry
export async function createAnalyticsData(data: CreateAnalyticsData) {
  return await cosmic.objects.insertOne({
    type: 'analytics-data',
    title: data.metric_name,
    metadata: {
      metric_name: data.metric_name,
      current_value: data.current_value,
      previous_value: data.previous_value,
      trend_direction: data.trend_direction,
      chart_data: data.chart_data
    }
  })
}
```

## 🎨 Cosmic CMS Integration

This dashboard leverages your existing Cosmic content model:

- **Dashboard Widgets**: Configurable UI components with different types (chart, metric, table, progress, activity)
- **Analytics Data**: Real-time metrics with trend analysis and chart data
- **User Roles**: Permission-based access control with customizable role levels
- **UI Themes**: Dynamic theming system with color customization
- **Dashboard Settings**: Global configuration including dark mode and refresh intervals
- **Responsive Layouts**: Device-specific layout configurations

The dashboard automatically adapts to your content structure and provides a seamless admin experience with real-time data updates.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production
- `COSMIC_BUCKET_SLUG`: Your Cosmic bucket identifier
- `COSMIC_READ_KEY`: Your Cosmic read key
- `COSMIC_WRITE_KEY`: Your Cosmic write key (for admin features)
<!-- README_END -->