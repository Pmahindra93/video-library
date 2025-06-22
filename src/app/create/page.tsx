'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCreateVideo } from '@/hooks/use-video'
import { VideoForm } from '@/components/video-form'
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create New Video</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
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
