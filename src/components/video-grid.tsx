import { Video } from '@/lib/schemas'
import { VideoCard } from './video-card'
import { VideoCameraIcon } from '@heroicons/react/24/outline'

interface VideoGridProps {
  videos: Video[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex flex-col items-center">
          <div className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4">
            <VideoCameraIcon className="h-full w-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No videos found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Start building your video library by adding your first video.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
