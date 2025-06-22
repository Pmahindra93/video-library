import fs from 'fs/promises'
import path from 'path'
import { Video, VideoSchema, CreateVideoRequest, SortOption } from './schemas'

const DATA_PATH = path.join(process.cwd(), 'data', 'videos.json')

export class VideoService {
  private async readVideos(): Promise<Video[]> {
    try {
      const data = await fs.readFile(DATA_PATH, 'utf-8')
      const parsed = JSON.parse(data)
      const videos = parsed.videos || parsed // Support both formats
      return videos.map((video: unknown) => VideoSchema.parse(video))
    } catch (error) {
      console.error('Error reading videos:', error)
      return []
    }
  }

  private async writeVideos(videos: Video[]): Promise<void> {
    try {
      const data = { videos }
      await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error writing videos:', error)
      throw new Error('Failed to save video')
    }
  }

  private sortVideos(videos: Video[], sortBy?: SortOption): Video[] {
    if (!sortBy) return videos

    return [...videos].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()

      return sortBy === 'created_at_asc' ? dateA - dateB : dateB - dateA
    })
  }

  async getVideos(sortBy?: SortOption): Promise<Video[]> {
    const videos = await this.readVideos()
    return this.sortVideos(videos, sortBy)
  }

  async createVideo(data: CreateVideoRequest): Promise<Video> {
    const videos = await this.readVideos()

    const newVideo: Video = {
      id: Date.now().toString(),
      title: data.title,
      tags: data.tags || [],
      created_at: data.created_at || new Date().toISOString(),
      thumbnail_url: data.thumbnail_url || `https://via.placeholder.com/320x180?text=${encodeURIComponent(data.title)}`,
      duration: data.duration || 1200, // 20 minutes default
      views: data.views || 0
    }

    const validatedVideo = VideoSchema.parse(newVideo)
    videos.push(validatedVideo)
    await this.writeVideos(videos)

    return validatedVideo
  }

  async getVideoById(id: string): Promise<Video | null> {
    const videos = await this.readVideos()
    return videos.find(video => video.id === id) || null
  }
}

export const videoService = new VideoService()
