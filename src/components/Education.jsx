import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from 'lucide-react'

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const education = {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    university: 'Pandit Deendayal Energy University',
    location: 'Gujarat, India',
    period: '2020 – 2024',
    cgpa: '8.9/10.0',
    highlights: [
      'Specialized in Computer Science and Engineering',
      'Strong foundation in Data Structures and Algorithms',
      'Coursework in Cloud Computing and Distributed Systems',
      'Active participation in technical workshops and hackathons',
    ],
  }

  const certifications = [
    {
      name: 'Data Analytics with Python',
      issuer: 'NPTEL',
      score: '79%',
      icon: BookOpen,
    },
  ]

  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="group relative h-full p-8 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>

                {/* Degree */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {education.degree}
                </h3>

                {/* University */}
                <p className="text-xl text-primary font-semibold mb-4">
                  {education.university}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="flex items-center gap-2 text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    {education.period}
                  </span>
                  <span className="flex items-center gap-2 text-text-secondary">
                    <MapPin className="w-4 h-4" />
                    {education.location}
                  </span>
                </div>

                {/* CGPA Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
                  <Award className="w-5 h-5 text-success" />
                  <span className="text-success font-bold text-lg">CGPA: {education.cgpa}</span>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  {education.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 text-text-secondary"
                    >
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                      {highlight}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Certifications
            </h3>

            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-6 rounded-xl bg-surface/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <cert.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">{cert.name}</h4>
                  <p className="text-text-secondary text-sm mb-3">{cert.issuer}</p>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Score: {cert.score}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional Info Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            >
              <h4 className="text-lg font-semibold text-white mb-2">Continuous Learning</h4>
              <p className="text-text-secondary text-sm">
                Actively pursuing certifications in AWS, Kubernetes (CKA), and advanced DevOps practices.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Education
