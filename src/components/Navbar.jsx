'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

const Navbar = ({ isHomePage = true }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Different nav items based on page context
  const homeNavItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ]

  const blogNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/#contact' },
  ]

  const navItems = isHomePage ? homeNavItems : blogNavItems

  const socialLinks = [
    { icon: Github, href: 'https://github.com/UjjavalParmar', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ujjaval-parmar-6055b7178/', label: 'LinkedIn' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
              <Terminal className="w-5 h-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              Ujjaval
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const isExternal = item.href.startsWith('/') && !item.href.startsWith('/#')
              const LinkComponent = isExternal ? Link : 'a'
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LinkComponent
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 group block"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                  </LinkComponent>
                </motion.div>
              )
            })}
            
            {/* Social Icons */}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-border/50">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-primary/10 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            <motion.a
              href="https://docs.google.com/document/d/1tr2V0XPsnVvAlyg_PLxKM9fIT-34jmLq/edit?usp=sharing&ouid=108587002836749340351&rtpof=true&sd=true"
              target="_blank"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface hover:bg-surface-light transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => {
                const isExternal = item.href.startsWith('/') && !item.href.startsWith('/#')
                const LinkComponent = isExternal ? Link : 'a'
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <LinkComponent
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-text-secondary hover:text-white hover:bg-surface-light transition-all duration-300"
                    >
                      {item.name}
                    </LinkComponent>
                  </motion.div>
                )
              })}
              
              {/* Social Links in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-3 px-4 py-3"
              >
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
              </motion.div>
              
              <motion.a
                href="https://docs.google.com/document/d/1tr2V0XPsnVvAlyg_PLxKM9fIT-34jmLq/edit?usp=sharing&ouid=108587002836749340351&rtpof=true&sd=true"
                target="_blank"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="block mt-4 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-center font-semibold"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
