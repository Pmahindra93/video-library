'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useCreateVideo } from '@/hooks/use-video'
import { VideoForm } from '@/components/video-form'
import { ThemeToggle } from '@/components/theme-toggle'
import { CreateVideoRequest } from '@/lib/schemas'
import { Providers } from '../providers'

function CreatePage() {
  const router = useRouter()
  const createVideoMutation = useCreateVideo()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: CreateVideoRequest) => {
    try {
      setError(null)
      await createVideoMutation.mutateAsync(data)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create video')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Back to video library"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Create New Video
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Add a new video to your library
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <VideoForm
            onSubmit={handleSubmit}
            isLoading={createVideoMutation.isPending}
            error={error}
          />
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Providers>
      <CreatePage />
    </Providers>
  )
}
