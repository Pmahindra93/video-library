/**
 * @jest-environment node
 */

import { GET, POST } from '@/app/api/videos/route'
import { NextRequest } from 'next/server'
import { Video } from '@/lib/schemas'

// Mock the video service
jest.mock('@/lib/video-service', () => ({
  videoService: {
    getVideos: jest.fn(),
    createVideo: jest.fn(),
  }
}))

// eslint-disable-next-line
const { videoService } = require('@/lib/video-service')

describe('/api/videos', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return videos successfully', async () => {
      const mockVideos = [
        {
          id: '1',
          title: 'Test Video',
          created_at: '2024-01-01T00:00:00Z',
          tags: ['test'],
          thumbnail_url: 'https://example.com/thumbnail.jpg',
          duration: 1200,
          views: 100
        }
      ]

      videoService.getVideos.mockResolvedValue(mockVideos)

      const request = new NextRequest('http://localhost:3000/api/videos')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockVideos)
      expect(videoService.getVideos).toHaveBeenCalledWith(undefined)
    })

    it('should handle sort parameter', async () => {
      const mockVideos: Video[] = []
      videoService.getVideos.mockResolvedValue(mockVideos)

      const request = new NextRequest('http://localhost:3000/api/videos?sort=created_at_desc')
      await GET(request)

      expect(videoService.getVideos).toHaveBeenCalledWith('created_at_desc')
    })

    it('should handle errors gracefully', async () => {
      videoService.getVideos.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/videos')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to fetch videos')
    })
  })

  describe('POST', () => {
    it('should create video with valid data', async () => {
      const newVideo = {
        id: '2',
        title: 'New Video',
        created_at: '2024-01-01T00:00:00Z',
        tags: ['new'],
        thumbnail_url: 'https://example.com/new.jpg',
        duration: 1500,
        views: 0
      }

      videoService.createVideo.mockResolvedValue(newVideo)

      const requestBody = {
        title: 'New Video',
        tags: ['new'],
        thumbnail_url: 'https://example.com/new.jpg'
      }

      const request = new NextRequest('http://localhost:3000/api/videos', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(newVideo)
    })

    it('should reject invalid data', async () => {
      const requestBody = {
        title: '', // Invalid - empty title
        tags: ['test']
      }

      const request = new NextRequest('http://localhost:3000/api/videos', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid video data')
      expect(data.details).toBeDefined()
    })

    it('should handle creation errors', async () => {
      videoService.createVideo.mockRejectedValue(new Error('Save failed'))

      const requestBody = {
        title: 'Test Video',
        tags: []
      }

      const request = new NextRequest('http://localhost:3000/api/videos', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to create video')
    })
  })
})
