'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks, profile } from '../data/site'

const STORAGE_KEY = 'up-portfolio-theme'

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage unavailable — the page still renders, it just won't persist */
  }
}

function ThemeToggle() {
  // Server renders the dark default; the pre-paint script has already set the
  // real theme on <html>, and the lit cell is styled off that attribute, so
  // this state only carries the accessible name.
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark')
  }, [])

  const choose = (next) => {
    applyTheme(next)
    setTheme(next)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      style={{ display: 'flex', border: '1px solid var(--line)' }}
    >
      {['dark', 'light'].map((value) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          data-theme-value={value}
          className="toggle-cell"
          onClick={() => choose(value)}
        >
          {value === 'dark' ? 'Dark' : 'Light'}
        </button>
      ))}
    </div>
  )
}

/** Three hairline bars — no icon library, matching the mono weight around it. */
function MenuGlyph({ open }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'grid',
        gap: '4px',
        width: '18px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            height: '1px',
            background: 'var(--fg)',
            opacity: open && i === 1 ? 0 : 1,
          }}
        />
      ))}
    </span>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const onHome = pathname === '/'
  // Anchors only resolve on the homepage; from /blog they need the route.
  const resolve = (link) => (link.route || onHome ? link.href : `/${link.href}`)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = navLinks.map((link) => {
    const href = resolve(link)
    const current = link.route && pathname.startsWith(link.href)
    const props = {
      href,
      className: 'nav-link',
      ...(current ? { 'aria-current': 'page' } : {}),
      ...(link.nowrap ? { style: { whiteSpace: 'nowrap' } } : {}),
    }
    return link.route ? (
      <Link key={link.label} {...props}>
        {link.label}
      </Link>
    ) : (
      <a key={link.label} {...props}>
        {link.label}
      </a>
    )
  })

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="shell"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          paddingTop: '16px',
          paddingBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '11px' }}
        >
          <span
            aria-hidden="true"
            style={{ width: '9px', height: '9px', background: 'var(--accent)' }}
          />
          <span
            data-logotype
            style={{
              font: '500 13px/1 var(--font-mono), monospace',
              letterSpacing: '.12em',
            }}
          >
            {profile.name.toUpperCase()}
          </span>
        </Link>

        <div
          data-nav-controls
          style={{ display: 'flex', gap: '24px', alignItems: 'center' }}
        >
          <nav
            aria-label="Sections"
            data-nav-links
            style={{ display: 'flex', gap: '28px', alignItems: 'center' }}
          >
            {links}
          </nav>

          <ThemeToggle />

          <a
            href={`mailto:${profile.email}`}
            data-nav-cta
            className="btn btn--primary btn--nav"
          >
            Get in touch
          </a>

          <button
            type="button"
            data-nav-menu-button
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              border: '1px solid var(--line)',
              padding: '12px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Sections"
          data-nav-mobile
          style={{
            borderTop: '1px solid var(--line)',
            background: 'var(--bg)',
          }}
        >
          {navLinks.map((link) => {
            const href = resolve(link)
            const props = {
              href,
              onClick: () => setOpen(false),
              style: {
                display: 'block',
                padding: '16px var(--pad)',
                borderBottom: '1px solid var(--line2)',
                font: '500 15px/1 var(--font-sans), sans-serif',
                color: 'var(--fg)',
              },
            }
            return link.route ? (
              <Link key={link.label} {...props}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} {...props}>
                {link.label}
              </a>
            )
          })}

          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="btn btn--primary"
            style={{
              display: 'block',
              margin: '20px var(--pad) 24px',
              textAlign: 'center',
            }}
          >
            Get in touch
          </a>
        </nav>
      )}
    </header>
  )
}
