import { formatDuration, formatViews, formatDate, cn } from '@/lib/util'

describe('formatDuration', () => {
  it('formats seconds correctly', () => {
    expect(formatDuration(30)).toBe('0:30')
    expect(formatDuration(90)).toBe('1:30')
  })

  it('formats minutes correctly', () => {
    expect(formatDuration(600)).toBe('10:00')
    expect(formatDuration(3599)).toBe('59:59')
  })

  it('formats hours correctly', () => {
    expect(formatDuration(3600)).toBe('1:00:00')
    expect(formatDuration(3661)).toBe('1:01:01')
    expect(formatDuration(7322)).toBe('2:02:02')
  })
})

describe('formatViews', () => {
  it('formats small numbers correctly', () => {
    expect(formatViews(0)).toBe('0 views')
    expect(formatViews(123)).toBe('123 views')
    expect(formatViews(999)).toBe('999 views')
  })

  it('formats thousands correctly', () => {
    expect(formatViews(1000)).toBe('1.0K views')
    expect(formatViews(1500)).toBe('1.5K views')
    expect(formatViews(999999)).toBe('999.9K views')
  })

  it('formats millions correctly', () => {
    expect(formatViews(1000000)).toBe('1.0M views')
    expect(formatViews(1500000)).toBe('1.5M views')
    expect(formatViews(2300000)).toBe('2.3M views')
  })
})

describe('formatDate', () => {
  it('formats date strings correctly', () => {
    expect(formatDate('2024-01-15T10:30:00Z')).toBe('Jan 15, 2024')
    expect(formatDate('2024-12-25T00:00:00Z')).toBe('Dec 25, 2024')
  })
})

describe('cn', () => {
  it('combines class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('filters out falsy values', () => {
    expect(cn('class1', false, null, undefined, 'class2')).toBe('class1 class2')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
    expect(cn(null, false, undefined)).toBe('')
  })
})
