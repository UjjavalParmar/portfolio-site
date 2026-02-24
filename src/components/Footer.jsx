'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/UjjavalParmar', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ujjaval-parmar-6055b7178/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ujjavalworkmail22@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="relative bg-surface/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Ujjaval
              </span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed">
              DevOps Engineer passionate about building scalable cloud infrastructure and automating everything.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm flex items-center gap-1">
            © {currentYear} Ujjaval Parmar. Built with
            <Heart className="w-4 h-4 text-error fill-error" />
            and React
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-all duration-300 text-sm"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
