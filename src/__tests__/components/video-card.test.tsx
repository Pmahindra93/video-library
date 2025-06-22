import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { VideoCard } from '@/components/video-card'
import { Video } from '@/lib/schemas'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    fill,
    ...props
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    [key: string]: unknown
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...(fill ? {} : props)} />
  }
})

const mockVideo: Video = {
  id: '1',
  title: 'Test Video Title',
  created_at: '2024-01-15T10:30:00Z',
  tags: ['React', 'JavaScript', 'Tutorial'],
  thumbnail_url: 'https://example.com/thumbnail.jpg',
  duration: 1200, // 20 minutes
  views: 15420
}

describe('VideoCard', () => {
  it('renders video information correctly', () => {
    render(<VideoCard video={mockVideo} />)

    expect(screen.getByText('Test Video Title')).toBeInTheDocument()
    expect(screen.getByText('15.4K views')).toBeInTheDocument()
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument()
    expect(screen.getByText('20:00')).toBeInTheDocument()
  })

  it('renders tags correctly', () => {
    render(<VideoCard video={mockVideo} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Tutorial')).toBeInTheDocument()
  })

  it('renders thumbnail with correct alt text', () => {
    render(<VideoCard video={mockVideo} />)

    const thumbnail = screen.getByAltText('Test Video Title')
    expect(thumbnail).toBeInTheDocument()
    expect(thumbnail).toHaveAttribute('src', 'https://example.com/thumbnail.jpg')
  })

  it('handles video with no tags', () => {
    const videoWithoutTags = { ...mockVideo, tags: [] }
    render(<VideoCard video={videoWithoutTags} />)

    expect(screen.getByText('Test Video Title')).toBeInTheDocument()
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })

  it('formats duration correctly for hours', () => {
    const longVideo = { ...mockVideo, duration: 3661 } // 1 hour, 1 minute, 1 second
    render(<VideoCard video={longVideo} />)

    expect(screen.getByText('1:01:01')).toBeInTheDocument()
  })

  it('formats large view counts correctly', () => {
    const popularVideo = { ...mockVideo, views: 1500000 }
    render(<VideoCard video={popularVideo} />)

    expect(screen.getByText('1.5M views')).toBeInTheDocument()
  })
})
