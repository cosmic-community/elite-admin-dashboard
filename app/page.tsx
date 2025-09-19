import { Suspense } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DashboardContent from '@/components/DashboardContent'
import DashboardLoading from '@/components/DashboardLoading'

export default async function DashboardPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent />
      </Suspense>
    </DashboardLayout>
  )
}