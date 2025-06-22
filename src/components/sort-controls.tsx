import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { SortOption } from '@/lib/schemas'
import clsx from 'clsx'

const sortOptions = [
  { value: undefined, label: 'Default Order' },
  { value: 'created_at_desc' as const, label: 'Newest First' },
  { value: 'created_at_asc' as const, label: 'Oldest First' },
]

interface SortControlsProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export function SortControls({ sortBy, onSortChange }: SortControlsProps) {
  const selectedOption = sortOptions.find(option => option.value === sortBy) || sortOptions[0]

  return (
    <div className="flex items-center gap-4 mb-8">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort by:
      </label>
      <Listbox value={selectedOption} onChange={(option) => onSortChange(option.value)}>
        <div className="relative">
          <Listbox.Button className="relative w-48 cursor-pointer rounded-lg bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
            <span className="block truncate text-gray-900 dark:text-gray-100">{selectedOption.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-600 sm:text-sm">
              {sortOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-pointer select-none py-2 pl-10 pr-4',
                      active ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
