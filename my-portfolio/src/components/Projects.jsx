import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'Spotify Clone (MERN)',
      description: 'Music streaming web application with secure authentication, playlist management, and admin modules.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      color: '#f72585',
      githubUrl: 'https://github.com/SUBITCHAKALAKSHMI-A/Spotify_Music.git'
    },
    {
      title: 'CalcSphere (MERN with TypeScript)',
      description: 'Web application providing scientific calculations including matrix operations, equation solving, and graph representation.',
      tech: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
      color: '#4361ee',
      githubUrl: 'https://github.com/SUBITCHAKALAKSHMI-A/CalcSphere.git'
    },
    {
      title: 'Calendar App (Java)',
      description: 'Java-based calendar application with event management, scheduling, and date tracking features.',
      tech: ['Java', 'Swing', 'GUI'],
      color: '#7209b7',
      githubUrl: 'https://github.com/SUBITCHAKALAKSHMI-A/Java_Calender_App.git'
    },
    {
      title: 'CounselHive (ML with MERN)',
      description: 'AI-powered personalized college selector platform using machine learning algorithms to match students with best-fit colleges based on academic profile, preferences, and career goals.',
      tech: ['React', 'Node.js', 'MongoDB', 'ML', 'Python'],
      color: '#56cfe1',
      githubUrl: 'https://github.com/SUBITCHAKALAKSHMI-A/CounselHive.git'
    },
    {
      title: 'MediMate (MERN with PaddleOCR)',
      description: 'Healthcare app with OCR prescription extraction, OTP login, and medication reminders.',
      tech: ['React', 'Node.js', 'OCR', 'Twilio API'],
      color: '#4cc9f0',
      githubUrl: 'https://github.com/SUBITCHAKALAKSHMI-A/CounselHive.git'
    }
  ];

  return (
    <div className="projects-section" id="projects">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="projects-section-title">Featured Projects</h2>
        <div className="projects-title-underline"></div>
      </motion.div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div 
              className="project-header"
              style={{ 
                background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
              }}
            >
              <h3>{project.title}</h3>
            </div>
            
            <div className="project-body">
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag" style={{ borderColor: project.color }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="project-footer">
              {project.githubUrl && (
                <motion.a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-btn"
                  style={{ 
                    '--project-color': project.color,
                    borderColor: project.color, 
                    color: project.color
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: project.color,
                    color: 'white'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaGithub /> Code
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;