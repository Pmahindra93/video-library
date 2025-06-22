import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
      <div className="mx-auto h-16 w-16 text-red-500 dark:text-red-400 mb-4">
        <ExclamationTriangleIcon className="h-full w-full" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm font-medium"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  )
}
