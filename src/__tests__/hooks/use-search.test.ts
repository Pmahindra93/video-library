import { renderHook } from '@testing-library/react'
import { useVideoSearch } from '@/hooks/use-search'
import { Video } from '@/lib/schemas'

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'React Tutorial for Beginners',
    created_at: '2024-01-01T00:00:00Z',
    tags: ['react', 'tutorial', 'javascript'],
    thumbnail_url: 'https://example.com/1.jpg',
    duration: 1200,
    views: 1000
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    created_at: '2024-01-02T00:00:00Z',
    tags: ['javascript', 'advanced', 'programming'],
    thumbnail_url: 'https://example.com/2.jpg',
    duration: 1800,
    views: 2000
  },
  {
    id: '3',
    title: 'CSS Grid Layout Guide',
    created_at: '2024-01-03T00:00:00Z',
    tags: ['css', 'grid', 'layout'],
    thumbnail_url: 'https://example.com/3.jpg',
    duration: 900,
    views: 1500
  }
]

describe('useVideoSearch', () => {
  it('returns all videos when search query is empty', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, ''))

    expect(result.current.filteredVideos).toEqual(mockVideos)
    expect(result.current.isSearching).toBe(false)
    expect(result.current.totalResults).toBe(3)
    expect(result.current.hasResults).toBe(true)
  })

  it('filters videos by title', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, 'React'))

    expect(result.current.filteredVideos).toHaveLength(1)
    expect(result.current.filteredVideos[0].title).toBe('React Tutorial for Beginners')
    expect(result.current.isSearching).toBe(true)
    expect(result.current.totalResults).toBe(1)
    expect(result.current.hasResults).toBe(true)
  })

  it('filters videos by tags', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, 'javascript'))

    expect(result.current.filteredVideos).toHaveLength(2)
    expect(result.current.isSearching).toBe(true)
    expect(result.current.totalResults).toBe(2)
    expect(result.current.hasResults).toBe(true)
  })

  it('is case insensitive', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, 'REACT'))

    expect(result.current.filteredVideos).toHaveLength(1)
    expect(result.current.filteredVideos[0].title).toBe('React Tutorial for Beginners')
  })

  it('handles partial matches', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, 'CSS'))

    expect(result.current.filteredVideos).toHaveLength(1)
    expect(result.current.filteredVideos[0].title).toBe('CSS Grid Layout Guide')
  })

  it('returns empty array when no matches found', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, 'Python'))

    expect(result.current.filteredVideos).toHaveLength(0)
    expect(result.current.isSearching).toBe(true)
    expect(result.current.totalResults).toBe(0)
    expect(result.current.hasResults).toBe(false)
  })

  it('ignores whitespace in search query', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, '  react  '))

    expect(result.current.filteredVideos).toHaveLength(1)
    expect(result.current.isSearching).toBe(true)
  })

  it('treats whitespace-only query as empty', () => {
    const { result } = renderHook(() => useVideoSearch(mockVideos, '   '))

    expect(result.current.filteredVideos).toEqual(mockVideos)
    expect(result.current.isSearching).toBe(false)
  })
})
