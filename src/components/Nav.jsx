'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ArrowIcon from './ArrowIcon'
import { navLinks, profile } from '../data/site'

function applyTheme(value) {
  document.documentElement.dataset.theme = value
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
    meta.content = value === 'light' ? '#f0f0e8' : '#10110e'
  })
  try {
    localStorage.setItem('up-portfolio-theme', value)
  } catch { /* Theme still works without storage. */ }
}

function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const value = document.documentElement.dataset.theme || 'dark'
    setTheme(value)
    applyTheme(value)
  }, [])

  const choose = value => {
    applyTheme(value)
    setTheme(value)
  }

  const onKeyDown = (event, value) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 'dark'
      : event.key === 'End' ? 'light'
      : value === 'dark' ? 'light' : 'dark'
    choose(next)
    event.currentTarget.parentElement.querySelector(`[data-theme-value="${next}"]`).focus()
  }

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Colour theme">
      {['dark', 'light'].map(value => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          tabIndex={theme === value ? 0 : -1}
          data-theme-value={value}
          className="toggle-cell"
          onClick={() => choose(value)}
          onKeyDown={event => onKeyDown(event, value)}
        >
          {value === 'dark' ? 'Dark' : 'Light'}
        </button>
      ))}
    </div>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)
  const resolve = link => link.route || pathname === '/' ? link.href : `/${link.href}`
  const isCurrent = link => link.route ? pathname.startsWith(link.href)
    : link.href === '#work' && pathname.startsWith('/work/')

  useEffect(() => {
    if (!open) return
    const onKey = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="shell nav-bar">
        <Link href="/" className="logotype" aria-label="Ujjaval Parmar — home">
          <span className="logo-mark" aria-hidden="true">u/p</span>
          <span data-logotype>Ujjaval<br />Parmar</span>
        </Link>
        <nav aria-label="Sections" data-nav-links>
          {navLinks.map(link => (
            <Link key={link.label} href={resolve(link)} className="nav-link" aria-current={isCurrent(link) ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div data-nav-controls>
          <ThemeToggle />
          <a href={`mailto:${profile.email}`} data-nav-cta className="btn btn--primary btn--nav">
            Let’s talk <ArrowIcon />
          </a>
          <button
            ref={menuButton}
            type="button"
            data-nav-menu-button
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
              <path d={open ? 'm6 6 12 12M6 18 18 6' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile sections" data-nav-mobile>
          {navLinks.map(link => (
            <Link key={link.label} href={resolve(link)} aria-current={isCurrent(link) ? 'page' : undefined} onClick={() => setOpen(false)}>
              {link.label}<ArrowIcon />
            </Link>
          ))}
          <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>
            Get in touch <ArrowIcon />
          </a>
        </nav>
      )}
    </header>
  )
}
