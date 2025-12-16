import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Cloud, Container, GitBranch, Activity, Database, Code,
  Server, Shield, Zap, Globe, Terminal, Cpu
} from 'lucide-react'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredCategory, setHoveredCategory] = useState(null)

  const skillCategories = [
    {
      id: 'cloud',
      title: 'Cloud & Infrastructure',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      skills: ['AWS EC2', 'AWS VPC', 'AWS IAM', 'AWS ALB', 'Route 53', 'AWS RDS', 'S3', 'Nitro Enclaves', 'Terraform']
    },
    {
      id: 'containers',
      title: 'Container Orchestration',
      icon: Container,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      skills: ['Kubernetes', 'Docker', 'Helm Charts', 'EKS', 'MicroK8s', 'KubeADM', 'Docker Compose']
    },
    {
      id: 'cicd',
      title: 'CI/CD & Automation',
      icon: GitBranch,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      skills: ['Jenkins', 'ArgoCD', 'GitOps', 'Bitbucket Pipelines', 'Ansible', 'Bash Scripting']
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Observability',
      icon: Activity,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      skills: ['Prometheus', 'Grafana', 'ELK Stack', 'New Relic', 'Centralized Logging']
    },
    {
      id: 'databases',
      title: 'Data Management',
      icon: Database,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      skills: ['PostgreSQL', 'MySQL', 'Redis', 'AWS RDS']
    },
    {
      id: 'languages',
      title: 'Languages & Frameworks',
      icon: Code,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      skills: ['Python', 'Java', 'Node.js', 'React.js', 'Bash', 'YAML']
    }
  ]

  // Floating badges for decoration
  const floatingIcons = [
    { Icon: Server, delay: 0, position: 'top-10 left-10' },
    { Icon: Shield, delay: 2, position: 'top-20 right-20' },
    { Icon: Zap, delay: 4, position: 'bottom-20 left-20' },
    { Icon: Globe, delay: 1, position: 'bottom-10 right-10' },
    { Icon: Terminal, delay: 3, position: 'top-1/2 left-5' },
    { Icon: Cpu, delay: 5, position: 'top-1/3 right-5' },
  ]

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/10 to-background" />
        
        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, position }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} opacity-5`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-12 h-12 text-primary" />
          </motion.div>
        ))}

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#9E7FFF 1px, transparent 1px), linear-gradient(90deg, #9E7FFF 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Technical Skills
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-gradient">Tech Arsenal</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-secondary">
            A comprehensive toolkit for building and managing modern cloud infrastructure
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group relative"
            >
              <div className={`
                relative h-full p-6 rounded-2xl 
                ${category.bgColor} ${category.borderColor}
                border backdrop-blur-sm
                hover:scale-[1.02] transition-all duration-500
                overflow-hidden
              `}>
                {/* Gradient Overlay on Hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${category.color} 
                  opacity-0 group-hover:opacity-5 transition-opacity duration-500
                `} />

                {/* Animated Border Gradient */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                `}>
                  <div className={`
                    absolute inset-[-1px] rounded-2xl bg-gradient-to-r ${category.color}
                    opacity-50 blur-sm
                  `} />
                </div>

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`
                      w-12 h-12 rounded-xl bg-gradient-to-br ${category.color}
                      flex items-center justify-center
                      group-hover:scale-110 group-hover:rotate-3
                      transition-all duration-500
                    `}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-gradient transition-all duration-300">
                        {category.title}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {category.skills.length} technologies
                      </p>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [-1, 1, -1, 0],
                          transition: { duration: 0.2 }
                        }}
                        className={`
                          px-3 py-1.5 rounded-lg
                          bg-surface/60 backdrop-blur-sm
                          border border-border
                          text-xs font-medium text-white
                          hover:border-primary/50 hover:bg-primary/10
                          hover:shadow-lg hover:shadow-primary/20
                          transition-all duration-300 cursor-default
                          ${hoveredCategory === category.id ? 'animate-pulse-slow' : ''}
                        `}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${category.bgColor}, transparent)`,
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    scale: hoveredCategory === category.id ? 1.2 : 1,
                    opacity: hoveredCategory === category.id ? 0.3 : 0.1,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { number: '35+', label: 'Technologies' },
            { number: '6', label: 'Domains' },
            { number: '2+', label: 'Years Experience' },
            { number: '∞', label: 'Learning' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
