import { z } from 'zod'

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  created_at: z.string(),
  tags: z.array(z.string()),
  thumbnail_url: z.string().url('Must be a valid URL'),
  duration: z.number().positive('Duration must be positive'),
  views: z.number().min(0, 'Views cannot be negative')
})

export const CreateVideoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  tags: z.array(z.string()).optional().default([]),
  thumbnail_url: z.union([z.string().url('must be a valid url'), z.literal('')]).optional(),
  created_at: z.string().optional(),
  duration: z.number().positive().optional(),
  views: z.number().min(0).optional()
})

export const SortSchema = z.enum(['created_at_asc', 'created_at_desc']).optional()

export type Video = z.infer<typeof VideoSchema>
export type CreateVideoRequest = z.infer<typeof CreateVideoSchema>
export type SortOption = z.infer<typeof SortSchema>

export interface ApiResponse<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: string
  details?: unknown
}
