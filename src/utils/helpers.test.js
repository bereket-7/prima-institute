import { describe, it, expect } from 'vitest'
import { formatPrice, truncate, getInstructor, getCategoryLabel } from './helpers.js'

describe('helpers', () => {
  it('formatPrice formats ETB currency', () => {
    expect(formatPrice(15000, 'ETB')).toContain('15')
  })

  it('truncate shortens long strings', () => {
    expect(truncate('Hello world', 8)).toBe('Hello w…')
    expect(truncate('Hi', 8)).toBe('Hi')
  })

  it('getInstructor finds instructor by id', () => {
    const instructors = [{ id: 'chef-marco', name: 'Marco' }]
    expect(getInstructor(instructors, 'chef-marco')?.name).toBe('Marco')
    expect(getInstructor(instructors, 'missing')).toBeNull()
  })

  it('getCategoryLabel returns label or id fallback', () => {
    expect(getCategoryLabel('culinary')).toBe('Culinary Arts')
    expect(getCategoryLabel('unknown')).toBe('unknown')
  })
})
