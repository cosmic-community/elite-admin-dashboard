export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar skeleton */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-accent rounded animate-pulse w-24"></div>
              <div className="h-3 bg-accent rounded animate-pulse w-16"></div>
            </div>
          </div>
        </div>
        
        {/* Menu items skeleton */}
        <div className="px-4 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="w-5 h-5 bg-accent rounded animate-pulse"></div>
              <div className="h-4 bg-accent rounded animate-pulse flex-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="ml-64 flex flex-col">
        {/* Header skeleton */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-accent rounded animate-pulse w-48"></div>
              <div className="h-4 bg-accent rounded animate-pulse w-64"></div>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 bg-accent rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard content skeleton */}
        <div className="flex-1 p-6 space-y-6">
          {/* Metrics grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-accent rounded-lg animate-pulse"></div>
                  <div className="w-16 h-4 bg-accent rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-accent rounded animate-pulse w-20"></div>
                  <div className="h-4 bg-accent rounded animate-pulse w-32"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
              <div className="h-6 bg-accent rounded animate-pulse w-32 mb-6"></div>
              <div className="h-80 bg-accent rounded animate-pulse"></div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="h-6 bg-accent rounded animate-pulse w-32 mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-accent rounded animate-pulse"></div>
                      <div className="h-3 bg-accent rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}