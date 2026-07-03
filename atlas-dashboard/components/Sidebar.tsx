'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: "Home", href: "/", icon: "▦" },
  { label: "Atlas", href: "/devices/atlas", icon: "◎" },
  { label: "Apollo", href: "/devices/apollo", icon: "◎" },
  { label: "Hyperion", href: "/devices/hyperion", icon: "◎" },
];

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        width: '220px',
        minHeight: '100vh',
        background: '#0d1117',
        borderRight: '1px solid #30363d',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 0',
        flexShrink: 0,
      }}
    >
      {/* Logo / Title */}
      <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid #30363d' }}>
        <span style={{ color: '#58a6ff', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          OLYMPUS
        </span>
        <div style={{ color: '#c9d1d9', fontWeight: 600, fontSize: '1rem' }}>
          Homelab
        </div>
      </div>

      {/* Nav Links */}
      <ul className="list-unstyled mt-3 px-2" style={{ flex: 1 }}>
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <li key={item.href} className="mb-1">
              <Link
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  color: active ? '#58a6ff' : '#8b949e',
                  background: active ? '#161b22' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                  transition: 'color 0.15s, background 0.15s',
                  borderLeft: active ? '2px solid #58a6ff' : '2px solid transparent',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Footer */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #30363d' }}>
        <span style={{ color: '#484f58', fontFamily: 'monospace', fontSize: '0.7rem' }}>
          v1.0.0
        </span>
      </div>
    </nav>
  )
}