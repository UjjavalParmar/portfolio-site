'use client'

import React, { useState } from 'react'
import { Menu, X, Terminal, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Determine if we're on homepage or blog pages
  const isHomePage = pathname === '/'
  const isBlogPage = pathname.startsWith('/blog')

  // Navigation items - same for all pages
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Skills', href: isHomePage ? '#skills' : '/#skills' },
    { name: 'Projects', href: isHomePage ? '#projects' : '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/UjjavalParmar', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ujjaval-parmar-6055b7178/', label: 'LinkedIn' },
  ]

  const isActiveLink = (href) => {
    if (href === '/') return pathname === '/'
    if (href === '/blog') return isBlogPage
    return false
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              Ujjaval
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('/') && !item.href.startsWith('/#')
              const LinkComponent = isExternal ? Link : 'a'
              const isActive = isActiveLink(item.href)
              
              return (
                <LinkComponent
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </LinkComponent>
              )
            })}
            
            {/* Social Icons */}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border/50">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-primary/10 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <a
              href="https://docs.google.com/document/d/1tr2V0XPsnVvAlyg_PLxKM9fIT-34jmLq/edit?usp=sharing&ouid=108587002836749340351&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface hover:bg-surface-light transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-border">
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('/') && !item.href.startsWith('/#')
              const LinkComponent = isExternal ? Link : 'a'
              const isActive = isActiveLink(item.href)
              
              return (
                <LinkComponent
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-text-secondary hover:text-white hover:bg-surface-light'
                  }`}
                >
                  {item.name}
                </LinkComponent>
              )
            })}
            
            {/* Social Links in Mobile Menu */}
            <div className="flex items-center gap-3 px-4 py-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-surface-light text-text-secondary hover:text-white hover:bg-primary/20 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <a
              href="https://docs.google.com/document/d/1tr2V0XPsnVvAlyg_PLxKM9fIT-34jmLq/edit?usp=sharing&ouid=108587002836749340351&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-center font-semibold"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
