import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar, MapPin, ChevronRight, ExternalLink } from 'lucide-react'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: 'Associate DevOps Engineer',
      company: 'GlobalVoxInc',
      location: 'Ahmedabad, Gujarat',
      period: 'January 2024 – Present',
      type: 'Full-time',
      description: 'Leading DevOps initiatives for cloud infrastructure and CI/CD automation.',
      achievements: [
        'Architected and deployed CI/CD pipelines using Jenkins and ArgoCD, achieving 50% reduction in deployment time and enabling continuous delivery for 5+ microservices across multiple environments',
        'Deployed AWS Nitro Enclaves for secure processing of sensitive workloads, enhancing data protection and ensuring compliance with security best practices',
        'Established centralized logging infrastructure using ELK Stack (Elasticsearch, Logstash, Kibana), reducing debug time by 40% and improving incident response capabilities',
        'Implemented comprehensive monitoring solutions with Prometheus, Grafana, and New Relic for proactive issue detection and system health management',
        'Managed Kubernetes clusters ensuring zero downtime deployments with automated rollback capabilities, health checks, and high availability configurations',
        'Automated infrastructure provisioning and configuration management using Bash and Python scripts, improving workflow efficiency and optimizing load distribution across systems',
      ],
      technologies: ['AWS', 'Kubernetes', 'Jenkins', 'ArgoCD', 'ELK Stack', 'Prometheus', 'Grafana', 'Docker', 'Terraform'],
    },
    {
      title: 'Software Engineering Trainee (Internship)',
      company: 'GlobalVoxInc',
      location: 'Ahmedabad, Gujarat',
      period: 'January 2024 – June 2024',
      type: 'Internship',
      description: 'Gained hands-on experience in DevOps practices and Kubernetes deployments.',
      achievements: [
        'Implemented SSL/TLS certificates for internal domains to enhance security posture and ensure encrypted communications',
        'Configured Kubernetes deployments with high availability strategies, achieving zero downtime for production applications',
      ],
      technologies: ['Kubernetes', 'SSL/TLS', 'Docker', 'Linux'],
    },
  ]

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-r from-primary/10 to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            Building expertise in cloud infrastructure and DevOps automation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2 md:-translate-x-1/2 mt-8 z-10">
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
              </div>

              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-8 md:pl-0`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className={`flex flex-wrap items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-primary font-medium">
                          <Briefcase className="w-4 h-4" />
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className={`flex flex-wrap gap-4 mb-4 text-sm text-text-secondary ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-text-secondary mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className={`space-y-2 mb-6 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm text-text-secondary ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-surface-light text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
