'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { SortOption, CreateVideoRequest } from '@/lib/schemas'

export function useVideos(sortBy?: SortOption) {
  return useQuery({
    queryKey: ['videos', sortBy],
    queryFn: () => apiClient.getVideos(sortBy),
  })
}

export function useCreateVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateVideoRequest) => apiClient.createVideo(data),
    onSuccess: () => {
      // Invalidate all video queries to refetch
      queryClient.invalidateQueries({ queryKey: ['videos'] })
    },
  })
}
