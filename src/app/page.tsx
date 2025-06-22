'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useVideos } from '@/hooks/use-video'
import { VideoGrid } from '@/components/video-grid'
import { SortControls } from '@/components/sort-controls'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ErrorMessage } from '@/components/error-message'
import { ThemeToggle } from '@/components/theme-toggle'
import { SortOption } from '@/lib/schemas'
import { Providers } from './providers'

function HomePage() {
  const [sortBy, setSortBy] = useState<SortOption>(undefined)
  const { data: videos, isLoading, error, refetch } = useVideos(sortBy)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner className="pt-20" size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ErrorMessage
          message="Failed to load videos. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Video Library
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {videos?.length || 0} videos in your collection
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/create"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm font-medium"
              >
                <PlusIcon className="h-5 w-5" />
                Add Video
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <SortControls sortBy={sortBy} onSortChange={setSortBy} />
        </div>
        <VideoGrid videos={videos || []} />
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Providers>
      <HomePage />
    </Providers>
  )
}
