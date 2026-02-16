'use client'

import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Projects from './Projects'
import Education from './Education'
import Contact from './Contact'
import Footer from './Footer'
import ParticleBackground from './ParticleBackground'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
