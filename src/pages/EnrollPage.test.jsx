import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import EnrollPage from './EnrollPage.jsx'

vi.mock('../store/useStore', () => ({
  useStore: () => ({
    showNotification: vi.fn(),
  }),
}))

describe('EnrollPage', () => {
  it('pre-selects course from URL query param', () => {
    render(
      <MemoryRouter initialEntries={['/enroll?courseId=cul-001']}>
        <Routes>
          <Route path="/enroll" element={<EnrollPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getAllByText(/Professional Culinary Arts/i).length).toBeGreaterThan(0)
  })
})
