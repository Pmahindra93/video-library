import { NextRequest, NextResponse } from 'next/server'
import { videoService } from '@/lib/video-service'
import { CreateVideoSchema, SortSchema, ApiResponse, ApiError } from '@/lib/schemas'
import { ZodError } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get('sort') || undefined

    const validatedSort = SortSchema.parse(sortBy)
    const videos = await videoService.getVideos(validatedSort)

    const response: ApiResponse<typeof videos> = {
      success: true,
      data: videos
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('GET /api/videos error:', error)

    const errorResponse: ApiError = {
      success: false,
      error: 'Failed to fetch videos'
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = CreateVideoSchema.parse(body)

    const newVideo = await videoService.createVideo(validatedData)

    const response: ApiResponse<typeof newVideo> = {
      success: true,
      data: newVideo
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('POST /api/videos error:', error)

    if (error instanceof ZodError) {
      const errorResponse: ApiError = {
        success: false,
        error: 'Invalid video data',
        details: error.errors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const errorResponse: ApiError = {
      success: false,
      error: 'Failed to create video'
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
