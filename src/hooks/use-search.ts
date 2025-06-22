'use client'

import { useMemo } from 'react'
import { Video } from '@/lib/schemas'

export function useVideoSearch(videos: Video[], searchQuery: string) {
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) {
      return videos
    }

    const query = searchQuery.toLowerCase().trim()

    return videos.filter((video) => {
      // Search in title
      const titleMatch = video.title.toLowerCase().includes(query)

      // Search in tags
      const tagsMatch = video.tags.some(tag =>
        tag.toLowerCase().includes(query)
      )

      return titleMatch || tagsMatch
    })
  }, [videos, searchQuery])

  return {
    filteredVideos,
    searchQuery,
    hasResults: filteredVideos.length > 0,
    totalResults: filteredVideos.length,
    isSearching: searchQuery.trim().length > 0
  }
}
