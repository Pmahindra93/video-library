'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useVideos } from '@/hooks/use-video'
import { VideoGrid } from '@/components/video-grid'
import { SortControls } from '@/components/sort-controls'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ErrorMessage } from '@/components/error-message'
import { SortOption } from '@/lib/schemas'
import { Providers } from './providers'

function HomePage() {
  const [sortBy, setSortBy] = useState<SortOption>(undefined)
  const { data: videos, isLoading, error, refetch } = useVideos(sortBy)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner className="pt-20" size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage
          message="Failed to load videos. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Video Library</h1>
            <Link
              href="/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Video
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SortControls sortBy={sortBy} onSortChange={setSortBy} />
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
