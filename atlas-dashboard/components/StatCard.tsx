type StatCardProps = {
  label: string
  value: string | number
  unit?: string
  percent?: number          // 0–100, shows a progress bar if provided
  status?: 'ok' | 'warn' | 'down'
  sub?: string              // small subtext below the value
}

const statusColor = {
  ok:   '#3fb950',
  warn: '#d29922',
  down: '#f85149',
}

export default function StatCard({ label, value, unit, percent, status, sub }: StatCardProps) {
  const accent = status ? statusColor[status] : '#58a6ff'

  return (
    <div
      style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '6px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {/* Label + status dot */}
      <div className="d-flex align-items-center justify-content-between">
        <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {status && (
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, display: 'inline-block' }} />
        )}
      </div>

      {/* Value */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
        <span style={{ color: '#e6edf3', fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 }}>
          {value}
        </span>
        {unit && (
          <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: '0.8rem' }}>{unit}</span>
        )}
      </div>

      {/* Sub text */}
      {sub && (
        <span style={{ color: '#484f58', fontSize: '0.75rem', fontFamily: 'monospace' }}>{sub}</span>
      )}

      {/* Progress bar */}
      {percent !== undefined && (
        <div style={{ background: '#21262d', borderRadius: '2px', height: '4px', marginTop: '0.25rem' }}>
          <div
            style={{
              width: `${Math.min(percent, 100)}%`,
              height: '100%',
              background: accent,
              borderRadius: '2px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      )}
    </div>
  )
}