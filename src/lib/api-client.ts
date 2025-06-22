import { Video, CreateVideoRequest, SortOption, ApiResponse, ApiError } from './schemas'

class ApiClient {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      const error = data as ApiError
      throw new Error(error.error || 'An error occurred')
    }

    const successData = data as ApiResponse<T>
    return successData.data
  }

  async getVideos(sortBy?: SortOption): Promise<Video[]> {
    const url = sortBy ? `/api/videos?sort=${sortBy}` : '/api/videos'
    return this.request<Video[]>(url)
  }

  async createVideo(data: CreateVideoRequest): Promise<Video> {
    return this.request<Video>('/api/videos', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
