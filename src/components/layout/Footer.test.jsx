import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Footer from './Footer.jsx'
import { useStore } from '../../store/useStore'

vi.mock('../../utils/email', () => ({
  isEmailConfigured: vi.fn(() => false),
  sendContactEmail: vi.fn(),
}))

import { isEmailConfigured, sendContactEmail } from '../../utils/email'

describe('Footer newsletter', () => {
  beforeEach(() => {
    useStore.setState({ notification: null })
    vi.mocked(isEmailConfigured).mockReturnValue(false)
    vi.mocked(sendContactEmail).mockReset()
  })

  it('does not show success when EmailJS is not configured', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByPlaceholderText(/your email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.submit(screen.getByPlaceholderText(/your email/i).closest('form'))

    await waitFor(() => {
      const notification = useStore.getState().notification
      expect(notification).not.toBeNull()
      expect(notification.type).toBe('error')
      expect(notification.msg).toMatch(/unavailable|contact/i)
    })

    expect(sendContactEmail).not.toHaveBeenCalled()
  })
})
