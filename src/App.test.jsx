import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import HomePage from './pages/HomePage.jsx'

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getAllByText(/PRIMA/i).length).toBeGreaterThan(0)
  })
})
