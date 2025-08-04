'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardLoading() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Loading */}
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <Skeleton className="h-8 w-full" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2 p-2">
            {/* Navigation items */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="space-y-1" key={i}>
                <Skeleton className="h-6 w-full" />
                <div className="ml-4 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 p-2">
            {/* Projects section */}
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-full" />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Main content loading */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="space-y-3 rounded-lg border p-4" key={i}>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SidebarLoading() {
  return (
    <div className="space-y-4 p-4">
      {/* Team switcher */}
      <Skeleton className="h-10 w-full" />

      {/* Navigation */}
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="space-y-1" key={i}>
            <Skeleton className="h-8 w-full" />
            <div className="ml-4">
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>

      {/* User */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}
