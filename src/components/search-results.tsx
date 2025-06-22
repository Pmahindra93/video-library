interface SearchResultsProps {
  isSearching: boolean
  searchQuery: string
  totalResults: number
  hasResults: boolean
}

export function SearchResults({ isSearching, searchQuery, totalResults, hasResults }: SearchResultsProps) {
  if (!isSearching) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
                    {hasResults ? (
            <>
              Found <span className="font-semibold text-gray-900 dark:text-gray-100">{totalResults}</span>
              {totalResults === 1 ? ' video' : ' videos'} for &ldquo;{searchQuery}&rdquo;
            </>
          ) : (
            <>
              No videos found for &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
            </>
          )}
        </div>
      </div>
      {!hasResults && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Try searching for different keywords or check your spelling.
        </div>
      )}
    </div>
  )
}
