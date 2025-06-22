import { Video } from '@/lib/schemas'
import { formatDuration, formatViews, formatDate } from '@/lib/util'
import Image from 'next/image'
import { PlayIcon, ClockIcon, EyeIcon, CalendarIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 animate-fade-in">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <PlayIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center gap-1">
          <ClockIcon className="h-3 w-3" />
          {formatDuration(video.duration)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <EyeIcon className="h-4 w-4" />
            <span>{formatViews(video.views)}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDate(video.created_at)}</span>
          </div>
        </div>

        {video.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={clsx(
                  "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                  "text-xs px-2.5 py-1 rounded-full font-medium",
                  "border border-blue-200 dark:border-blue-700",
                  "hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                )}
              >
                {tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                +{video.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
