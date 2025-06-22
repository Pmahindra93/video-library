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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter video title"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700 mb-2">
          Thumbnail URL
        </label>
        <input
          {...register('thumbnail_url')}
          type="url"
          id="thumbnail_url"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/thumbnail.jpg (optional)"
          disabled={isLoading}
        />
        {errors.thumbnail_url && (
          <p className="mt-1 text-sm text-red-600">{errors.thumbnail_url.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
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
          <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isLoading}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <LoadingSpinner size="sm" />}
          {isLoading ? 'Creating...' : 'Create Video'}
        </button>
      </div>
    </form>
  )
}
