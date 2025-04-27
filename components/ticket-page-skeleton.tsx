"use client"

import { Skeleton } from "@/components/ui/skeleton" // Make sure you have this component

export function TicketPageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-blue-50">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Member Profile Skeleton */}
        <div className="mb-8 text-center">
          <Skeleton className="w-20 h-20 mx-auto mb-3 rounded-full" />
          <Skeleton className="h-7 w-48 mx-auto mb-2" />
          <Skeleton className="h-5 w-32 mx-auto" />
        </div>

        {/* Current Ticket Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-300 p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-7 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
            <div className="p-5 bg-white dark:bg-white">
              <div>
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* All Tickets Skeleton */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 flex justify-between items-center bg-white dark:bg-white">
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <div>
                      <Skeleton className="h-5 w-20 mb-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Skeleton */}
        <div className="space-y-6 text-sm">
          <div className="p-5 bg-white dark:bg-white border border-blue-100 dark:border-blue-100 rounded-xl shadow-sm">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="p-5 bg-white dark:bg-white border border-blue-100 dark:border-blue-100 rounded-xl shadow-sm">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  )
}