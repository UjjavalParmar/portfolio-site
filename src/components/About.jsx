import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cloud, Server, GitBranch, Shield, Zap, Users } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const highlights = [
    {
      icon: Cloud,
      title: 'Cloud Architecture',
      description: 'Designing highly available AWS infrastructure with 99.99% uptime SLA',
    },
    {
      icon: Server,
      title: 'Container Orchestration',
      description: 'Managing Kubernetes clusters with zero-downtime deployments',
    },
    {
      icon: GitBranch,
      title: 'CI/CD Automation',
      description: 'Building pipelines that reduced deployment time by 50%',
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Implementing SSL/TLS, secret management, and security best practices',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing monitoring with ELK Stack, reducing debug time by 40%',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working with cross-functional teams to deliver scalable solutions',
    },
  ]

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Crafting <span className="text-gradient">Cloud Solutions</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-text-secondary leading-relaxed">
            I'm a passionate DevOps Engineer with hands-on experience in building and maintaining scalable cloud infrastructure. 
            Currently working at GlobalVoxInc, I specialize in automating CI/CD pipelines, managing Kubernetes clusters, 
            and implementing robust monitoring solutions that drive operational excellence.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '50%', label: 'Faster Deployments' },
            { value: '40%', label: 'Debug Time Reduced' },
            { value: '99.99%', label: 'Uptime SLA' },
            { value: '5+', label: 'Microservices Managed' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-surface/30 border border-border"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
