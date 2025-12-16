import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Folder, GitBranch, Cloud, Server, Shield, Zap } from 'lucide-react'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: 'Automated GitOps CI/CD with Kubernetes & ArgoCD',
      description: 'Designed multi-branch GitOps CI/CD pipeline using Jenkins with automated manifest and image tag updates, enabling seamless deployments for 5+ microservices.',
      icon: GitBranch,
      highlights: [
        'Integrated Docker Hub as container registry with version management',
        'Automated Jenkins pipelines for efficient image builds',
        'Implemented Doppler for secure secret management',
        'Created reusable Helm charts for simplified service onboarding',
        'Configured ArgoCD with RBAC for GitOps-based continuous delivery',
      ],
      technologies: ['Jenkins', 'ArgoCD', 'Kubernetes', 'Docker', 'Helm', 'Doppler'],
      gradient: 'from-purple-500 to-pink-500',
      impact: '50% faster deployments',
    },
    {
      title: 'Scalable & Secure AWS Architecture with Load Balancing',
      description: 'Architected highly available AWS infrastructure with multi-AZ deployment strategy, achieving 99.99% uptime SLA.',
      icon: Cloud,
      highlights: [
        'Deployed VPC with multiple subnets across availability zones',
        'Configured Application Load Balancer for intelligent traffic distribution',
        'Implemented secure routing tables and network security groups',
        'Set up Internet Gateway for optimized internal communication',
        'Automated complete infrastructure provisioning using Terraform',
      ],
      technologies: ['AWS', 'Terraform', 'VPC', 'ALB', 'Route 53', 'Security Groups'],
      gradient: 'from-blue-500 to-cyan-500',
      impact: '99.99% uptime SLA',
    },
    {
      title: 'Centralized Monitoring & Logging Infrastructure',
      description: 'Built comprehensive monitoring and logging solution using ELK Stack and Prometheus/Grafana for proactive system health management.',
      icon: Server,
      highlights: [
        'Deployed Elasticsearch, Logstash, and Kibana for centralized logging',
        'Configured Prometheus for metrics collection across all services',
        'Created custom Grafana dashboards for real-time visualization',
        'Integrated New Relic for APM and distributed tracing',
        'Reduced debug time by 40% with improved incident response',
      ],
      technologies: ['ELK Stack', 'Prometheus', 'Grafana', 'New Relic', 'Kibana'],
      gradient: 'from-green-500 to-emerald-500',
      impact: '40% faster debugging',
    },
    {
      title: 'Kubernetes High Availability Cluster',
      description: 'Managed production Kubernetes clusters with zero-downtime deployments, automated rollbacks, and comprehensive health monitoring.',
      icon: Shield,
      highlights: [
        'Configured multi-node clusters with automated scaling',
        'Implemented rolling updates with zero-downtime strategy',
        'Set up automated rollback capabilities for failed deployments',
        'Configured health checks and liveness/readiness probes',
        'Achieved high availability with pod disruption budgets',
      ],
      technologies: ['Kubernetes', 'EKS', 'Helm', 'Docker', 'kubectl'],
      gradient: 'from-orange-500 to-red-500',
      impact: 'Zero downtime deployments',
    },
  ]

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/10 to-background" />
      <div className="absolute right-0 top-1/3 w-1/3 h-1/2 bg-gradient-to-l from-secondary/10 to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            Real-world projects showcasing infrastructure automation and cloud architecture
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.a
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-surface-light text-text-secondary hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Impact Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium mb-4">
                    <Zap className="w-3 h-3" />
                    {project.impact}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0 mt-1.5`} />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-surface-light text-xs font-medium text-text-secondary hover:text-white hover:bg-primary/20 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/UjjavalParmar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border text-white font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
