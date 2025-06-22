import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '@/components/search-bar'

describe('SearchBar', () => {
  const mockOnSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input with magnifying glass icon', () => {
    render(<SearchBar onSearch={mockOnSearch} />)

    expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('calls onSearch with debounced input', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText('Search videos...')
    await user.type(searchInput, 'React')

    // Should not call immediately due to debouncing
    expect(mockOnSearch).not.toHaveBeenCalled()

    // Should call after debounce delay
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('React')
    }, { timeout: 500 })
  })

  it('shows clear button when there is text', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText('Search videos...')

    // Clear button should not be visible initially
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()

    await user.type(searchInput, 'test')

    // Clear button should appear
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={mockOnSearch} />)

    const searchInput = screen.getByPlaceholderText('Search videos...')
    await user.type(searchInput, 'test')

    const clearButton = screen.getByLabelText('Clear search')
    await user.click(clearButton)

    expect(searchInput).toHaveValue('')

    // Should call onSearch with empty string after debounce
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('')
    }, { timeout: 500 })
  })

  it('accepts custom placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />)

    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })
})
