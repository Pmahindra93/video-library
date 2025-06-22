'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateVideoSchema, CreateVideoRequest } from '@/lib/schemas'
import { TagInput } from './tag-input'
import { LoadingSpinner } from './loading-spinner'

interface VideoFormProps {
  onSubmit: (data: CreateVideoRequest) => void
  isLoading?: boolean
  error?: string | null
}

export function VideoForm({ onSubmit, isLoading = false, error }: VideoFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<CreateVideoRequest>({
    resolver: zodResolver(CreateVideoSchema),
    defaultValues: {
      title: '',
      tags: [],
      thumbnail_url: ''
    }
  })

  const handleFormSubmit = (data: CreateVideoRequest) => {
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter video title"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Thumbnail URL
        </label>
        <input
          {...register('thumbnail_url')}
          type="url"
          id="thumbnail_url"
          className="w-full px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="https://example.com/thumbnail.jpg (optional)"
          disabled={isLoading}
        />
        {errors.thumbnail_url && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.thumbnail_url.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Tags
        </label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagInput
              id="tags"
              tags={field.value || []}
              onChange={field.onChange}
              placeholder="Add tags (press Enter to add)"
            />
          )}
        />
        {errors.tags && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isLoading}
          className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 font-medium"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 font-medium shadow-sm"
        >
          {isLoading && <LoadingSpinner size="sm" />}
          {isLoading ? 'Creating...' : 'Create Video'}
        </button>
      </div>
    </form>
  )
}
