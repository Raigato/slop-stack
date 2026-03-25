import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with label text', () => {
    render(<Button label="Click me" />)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button label="Click me" onClick={handleClick} />)
    await user.click(screen.getByRole('button', { name: 'Click me' }))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" disabled />)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button label="Click me" onClick={handleClick} disabled />)
    await user.click(screen.getByRole('button', { name: 'Click me' }))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
