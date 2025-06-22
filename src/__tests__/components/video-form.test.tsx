import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VideoForm } from '@/components/video-form'

describe('VideoForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    render(<VideoForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/thumbnail url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create video/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<VideoForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/title/i)
    const thumbnailInput = screen.getByLabelText(/thumbnail url/i)
    const submitButton = screen.getByRole('button', { name: /create video/i })

    await user.type(titleInput, 'Test Video')
    await user.type(thumbnailInput, 'https://example.com/thumbnail.jpg')

    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Video',
        thumbnail_url: 'https://example.com/thumbnail.jpg',
        tags: []
      })
    })
  })

  it('shows validation errors for invalid data', async () => {
    const user = userEvent.setup()
    render(<VideoForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /create video/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })



  it('handles tag input correctly', async () => {
    const user = userEvent.setup()
    render(<VideoForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/title/i)
    const tagInput = screen.getByPlaceholderText(/add tags/i)
    const submitButton = screen.getByRole('button', { name: /create video/i })

    await user.type(titleInput, 'Test Video')
    await user.type(tagInput, 'React{enter}JavaScript{enter}')

    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Video',
        thumbnail_url: '',
        tags: ['React', 'JavaScript']
      })
    })
  })

  it('resets form when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<VideoForm onSubmit={mockOnSubmit} />)

    const titleInput = screen.getByLabelText(/title/i)
    const resetButton = screen.getByRole('button', { name: /reset/i })

    await user.type(titleInput, 'Test Video')
    expect(titleInput).toHaveValue('Test Video')

    await user.click(resetButton)
    expect(titleInput).toHaveValue('')
  })

  it('shows loading state when isLoading is true', () => {
    render(<VideoForm onSubmit={mockOnSubmit} isLoading={true} />)

    const submitButton = screen.getByRole('button', { name: /creating/i })
    expect(submitButton).toBeDisabled()
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    const errorMessage = 'Something went wrong'
    render(<VideoForm onSubmit={mockOnSubmit} error={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
