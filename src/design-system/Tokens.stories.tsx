import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

/* ─── Shared data ────────────────────────────────────────────────────────── */

const colorScaleSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

const semanticAliases = [
  { name: 'bg', var: '--color-bg', label: 'Background' },
  { name: 'surface', var: '--color-surface', label: 'Surface' },
  { name: 'border', var: '--color-border', label: 'Border' },
  { name: 'text', var: '--color-text', label: 'Text' },
  { name: 'text-muted', var: '--color-text-muted', label: 'Text Muted' },
  { name: 'primary', var: '--color-primary', label: 'Primary' },
  { name: 'primary-hover', var: '--color-primary-hover', label: 'Primary Hover' },
] as const

const typeSizes = [
  { step: 'xs', px: '12px' },
  { step: 'sm', px: '14px' },
  { step: 'base', px: '16px' },
  { step: 'lg', px: '18px' },
  { step: 'xl', px: '20px' },
  { step: '2xl', px: '24px' },
  { step: '3xl', px: '30px' },
  { step: '4xl', px: '36px' },
  { step: '5xl', px: '48px' },
] as const

const spacingSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64] as const

function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function SwatchRow({
  label,
  steps,
  prefix,
}: {
  label: string
  steps: readonly number[]
  prefix: string
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#64748b',
          marginBottom: 12,
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {steps.map((step) => {
          const varName = `--color-${prefix}-${step}`
          const hex = getCSSVar(varName)
          // Border only on light steps to distinguish them from the white page background
          const isLight = step <= 200
          return (
            <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div
                style={{
                  width: 72,
                  height: 48,
                  borderRadius: 8,
                  background: hex || '#e2e8f0',
                  border: isLight ? '1px solid #e2e8f0' : 'none',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 11,
                  color: '#475569',
                  lineHeight: 1.4,
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {prefix}-{step}
                </div>
                <div style={{ color: '#94a3b8' }}>
                  bg-{prefix}-{step}
                </div>
                <div>{hex}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Stories ────────────────────────────────────────────────────────────── */

const meta = {
  title: 'Design System / Tokens',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const section = (title: string, children: ReactNode) => (
  <div
    style={{
      padding: '40px 48px',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      color: '#0f172a',
    }}
  >
    <h2
      style={{
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 32,
        paddingBottom: 12,
        borderBottom: '1px solid #e2e8f0',
        letterSpacing: '-0.02em',
      }}
    >
      {title}
    </h2>
    {children}
  </div>
)

export const ColorPalette: Story = {
  render: () =>
    section(
      'Color Palette',
      <>
        <SwatchRow label="Neutral" steps={colorScaleSteps} prefix="neutral" />
        <SwatchRow label="Accent" steps={colorScaleSteps} prefix="accent" />

        <p
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#64748b',
            marginBottom: 12,
          }}
        >
          Semantic Aliases
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {semanticAliases.map(({ name, var: varName, label }) => {
            const hex = getCSSVar(varName)
            const isLight = ['bg', 'surface', 'border'].includes(name)
            return (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                  style={{
                    width: 88,
                    height: 48,
                    borderRadius: 8,
                    background: hex || '#e2e8f0',
                    border: isLight ? '1px solid #e2e8f0' : 'none',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 11,
                    color: '#475569',
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{label}</div>
                  <div style={{ color: '#94a3b8' }}>{varName}</div>
                  <div>{hex}</div>
                </div>
              </div>
            )
          })}
        </div>
      </>
    ),
}

export const Typography: Story = {
  render: () =>
    section(
      'Typography',
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {['Step', 'Size', 'Sans (Geist)', 'Mono (Geist Mono)'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  paddingBottom: 12,
                  borderBottom: '1px solid #e2e8f0',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {typeSizes.map(({ step, px }) => (
            <tr key={step} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td
                style={{
                  padding: '10px 16px 10px 0',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 12,
                  color: '#64748b',
                  whiteSpace: 'nowrap',
                }}
              >
                text-{step}
              </td>
              <td
                style={{
                  padding: '10px 24px 10px 0',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 12,
                  color: '#94a3b8',
                }}
              >
                {px}
              </td>
              <td
                style={{
                  padding: '10px 32px 10px 0',
                  fontFamily: 'var(--font-sans, system-ui, sans-serif)',
                  fontSize: px,
                  lineHeight: 1.2,
                  color: '#0f172a',
                }}
              >
                The quick brown fox
              </td>
              <td
                style={{
                  padding: '10px 0',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: px,
                  lineHeight: 1.2,
                  color: '#0f172a',
                }}
              >
                The quick brown fox
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
}

export const Spacing: Story = {
  render: () =>
    section(
      'Spacing',
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {spacingSteps.map((step) => {
          // Tailwind's base spacing unit is 4px (1 unit = 0.25rem at 16px base)
          const px = step * 4
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 12,
                  color: '#64748b',
                  width: 32,
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {step}
              </div>
              <div
                style={{
                  height: 20,
                  width: px,
                  borderRadius: 4,
                  background: '#4f46e5',
                  flexShrink: 0,
                  minWidth: 4,
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 12,
                  color: '#94a3b8',
                }}
              >
                {px}px
              </div>
            </div>
          )
        })}
      </div>
    ),
}
