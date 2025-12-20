import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCertificate, 
  FaAward, 
  FaUserTie, 
  FaChevronDown,
  FaExternalLinkAlt,
  FaTrophy,
  FaMedal,
  FaRibbon,
  FaGraduationCap,
  FaCloud,
  FaRobot,
  FaCode,
  FaDatabase,
  FaServer,
  FaCogs,
  FaLayerGroup,
  FaTimes
} from 'react-icons/fa';
import { SiNvidia, SiOracle } from 'react-icons/si';

const About = () => {
  const [activeCert, setActiveCert] = useState(null);
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Professional color combinations for each section
  const sectionColors = {
    profile: {
      primary: "#4361ee",    // Professional Blue
      secondary: "#4cc9f0",  // Light Blue
      gradient: "linear-gradient(135deg, #4361ee, #4cc9f0)"
    },
    certifications: {
      primary: "#7209b7",    // Deep Purple
      secondary: "#b5179e",  // Magenta
      tertiary: "#f72585",   // Pink
      gradient: "linear-gradient(135deg, #7209b7, #b5179e, #f72585)"
    },
    achievements: {
      primary: "#7400b8",    // Purple
      secondary: "#48bfe3",  // Sky Blue
      tertiary: "#80ffdb",   // Mint
      gradient: "linear-gradient(135deg, #7400b8, #48bfe3, #80ffdb)"
    }
  };

  // All achievement images (consolidated)
  const achievementImages = [
    "/achievements/psg-1.jpg",
    "/achievements/psg-2.jpg",
    "/achievements/psg-3.jpg"
  ];

  const profileData = {
    title: "Full Stack Developer & AI Specialist",
    description: "Passionate developer with expertise in MERN stack development and AI/ML integration. Focused on building scalable, efficient web applications with modern technologies and clean design principles.",
    highlights: [
      { icon: <FaCode />, text: "React.js & Node.js Expert", color: sectionColors.profile.primary },
      { icon: <FaLayerGroup />, text: "Full Stack Development", color: sectionColors.profile.primary },
      { icon: <FaCogs />, text: "AI/ML Integration", color: sectionColors.profile.secondary },
      { icon: <FaDatabase />, text: "Database Architecture", color: sectionColors.profile.secondary },
      { icon: <FaServer />, text: "Cloud Deployment", color: sectionColors.profile.primary },
      { icon: <FaRobot />, text: "Machine Learning", color: sectionColors.profile.secondary }
    ]
  };

  const certifications = [
    {
      id: 1,
      title: "Azure AI Engineer",
      issuer: "Microsoft",
      date: "2024",
      icon: <FaCloud />,
      color: sectionColors.certifications.primary,
      imagePath: "/certificates/azure-ai.jpg",
      description: "Expertise in designing AI solutions using Azure Cognitive Services and Azure Machine Learning."
    },
    {
      id: 2,
      title: "Oracle APEX Developer",
      issuer: "Oracle",
      date: "2024",
      icon: <SiOracle />,
      color: sectionColors.certifications.secondary,
      imagePath: "/certificates/oracle-apex.jpg",
      description: "Building enterprise applications using Oracle APEX for rapid web development on Oracle Cloud."
    },
    {
      id: 3,
      title: "NVIDIA Generative AI",
      issuer: "NVIDIA",
      date: "2024",
      icon: <SiNvidia />,
      color: sectionColors.certifications.tertiary,
      imagePath: "/certificates/nvidia-genai.jpg",
      description: "Mastery in generative AI technologies including GANs and diffusion models."
    },
    {
      id: 4,
      title: "Oracle AI Foundations",
      issuer: "Oracle",
      date: "2023",
      icon: <FaRobot />,
      color: sectionColors.certifications.secondary,
      imagePath: "/certificates/oracle-ai-foundations.jpg",
      description: "Fundamental knowledge in AI/ML concepts using Oracle Cloud Infrastructure."
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Project Presentation Winner",
      institution: "PSG College of Technology",
      year: "2023",
      prize: "1st Prize",
      icon: <FaTrophy />,
      color: sectionColors.achievements.primary,
      description: "Won first prize for innovative MERN stack application with AI integration"
    },
    {
      id: 2,
      title: "Project Presentation Winner",
      institution: "Hindusthan Institute of Technology",
      year: "2023",
      prize: "1st Prize",
      icon: <FaMedal />,
      color: sectionColors.achievements.secondary,
      description: "Awarded for developing a healthcare app with OCR prescription extraction"
    },
    {
      id: 3,
      title: "Premier Institution Winner",
      institution: "Kongu Engineering College",
      year: "2023",
      prize: "Winner Award",
      icon: <FaRibbon />,
      color: sectionColors.achievements.tertiary,
      description: "Recognized as top performer in software development competitions"
    },
    {
      id: 4,
      title: "IEE Infinity 3.0 Winner",
      institution: "Kongu Engineering College",
      year: "2023",
      prize: "1st Prize",
      icon: <FaGraduationCap />,
      color: sectionColors.achievements.secondary,
      description: "Champion in national-level technical innovation competition"
    },
    {
      id: 5,
      title: "Project Presentation Winner",
      institution: "Kongu Engineering College",
      year: "2023",
      prize: "1st Prize",
      icon: <FaMedal />,
      color: sectionColors.achievements.secondary,
      description: "Awarded for developing a healthcare app with OCR prescription extraction"
    }
  ];

  return (
    <div className="about-section" id="about">
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedImage(null)}
              >
                <FaTimes />
              </button>
              <img src={selectedImage} alt="Achievement" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        
      </motion.div>

      {/* Horizontal Layout Container */}
      <div className="about-horizontal-container">
        
        {/* Profile Section */}
        <motion.div
          className="section-wrapper profile-wrapper"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="section-header" style={{ background: sectionColors.profile.gradient }}>
            <FaUserTie className="section-title-icon" />
            <h3>Professional Profile</h3>
          </div>
          
          <div className="section-content" style={{ 
            borderColor: sectionColors.profile.primary,
            background: `linear-gradient(135deg, ${sectionColors.profile.primary}08, ${sectionColors.profile.secondary}08)`
          }}>
            <div className="profile-intro">
              <h4 style={{ color: "#ffffff" }}>{profileData.title}</h4>
              <p className="profile-description">{profileData.description}</p>
            </div>
            
            <div className="highlights-grid">
              {profileData.highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="highlight-item"
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ duration: 0.2 }}
                  style={{ borderLeft: `3px solid ${item.color}` }}
                >
                  <div className="highlight-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="highlight-text">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="section-wrapper certifications-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="section-header" style={{ background: sectionColors.certifications.gradient }}>
            <FaCertificate className="section-title-icon" />
            <h3>Certifications</h3>
          </div>
          
          <div className="section-content" style={{ 
            borderColor: sectionColors.certifications.primary,
            background: `linear-gradient(135deg, ${sectionColors.certifications.primary}08, ${sectionColors.certifications.secondary}08, ${sectionColors.certifications.tertiary}08)`
          }}>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="cert-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveCert(activeCert === cert.id ? null : cert.id)}
                  style={{ borderBottom: `2px solid ${cert.color}40` }}
                >
                  <div className="cert-header">
                    <div className="cert-icon-wrapper" style={{ 
                      background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}10)`,
                      color: cert.color
                    }}>
                      {cert.icon}
                    </div>
                    <div className="cert-info">
                      {/* CHANGED: White text for certification titles */}
                      <h4 style={{ color: "#ffffff" }}>{cert.title}</h4>
                      <div className="cert-meta">
                        <span className="cert-issuer">{cert.issuer}</span>
                        <span className="cert-date">{cert.date}</span>
                      </div>
                    </div>
                    <div className="cert-toggle">
                      <FaChevronDown 
                        className={`toggle-icon ${activeCert === cert.id ? 'active' : ''}`}
                        style={{ color: cert.color }}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeCert === cert.id && (
                      <motion.div
                        className="cert-expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="cert-description">{cert.description}</p>
                        <div 
                          className="view-cert-btn"
                          onClick={() => window.open(cert.imagePath, '_blank')}
                          style={{ 
                            background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}10)`,
                            color: cert.color,
                            border: `1px solid ${cert.color}40`
                          }}
                        >
                          <FaExternalLinkAlt />
                          <span>View Certificate</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="section-wrapper achievements-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="section-header" style={{ background: sectionColors.achievements.gradient }}>
            <FaAward className="section-title-icon" />
            <h3>Achievements</h3>
          </div>
          
          <div className="section-content" style={{ 
            borderColor: sectionColors.achievements.primary,
            background: `linear-gradient(135deg, ${sectionColors.achievements.primary}08, ${sectionColors.achievements.secondary}08, ${sectionColors.achievements.tertiary}08)`
          }}>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="achievement-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  onClick={() => setActiveAchievement(activeAchievement === achievement.id ? null : achievement.id)}
                  style={{ border: `1px solid ${achievement.color}30` }}
                >
                  <div className="achievement-content">
                    <div className="achievement-header">
                      <div className="achievement-icon" style={{ color: achievement.color }}>
                        {achievement.icon}
                      </div>
                      <div className="achievement-info">
                        {/* White text for achievement titles */}
                        <h4 style={{ color: "#ffffff" }}>{achievement.title}</h4>
                        <span className="prize-badge" style={{ 
                          background: `linear-gradient(135deg, ${achievement.color}, ${achievement.color}80)`
                        }}>
                          {achievement.prize}
                        </span>
                      </div>
                    </div>
                    
                    <div className="achievement-meta">
                      <span className="institution">{achievement.institution}</span>
                      <span className="year">{achievement.year}</span>
                    </div>

                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Consolidated Achievement Images - DIRECT DISPLAY */}
            {/* Consolidated Achievement Images - DIRECT PHOTOS */}
<div className="achievement-images-section">
  <h5 className="images-title">Achievement Gallery</h5>
  <div className="gallery-container">
    <div className="photo-display-grid">
      {achievementImages.map((img, index) => (
        <div key={index} className="photo-frame">
          <div className="photo-frame-content">
            <img 
              src={img} 
              alt={`Achievement ${index + 1}`}
              className="achievement-photo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.querySelector('.photo-placeholder').style.display = 'flex';
              }}
            />
            <div className="photo-placeholder">
              <FaTrophy className="placeholder-icon" />
              <span>Achievement {index + 1}</span>
            </div>
          </div>
          <div className="photo-info">
            <span className="photo-tag">Achievement #{index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
<div className="achievement-images-section">
  
  <div className="gallery-container">
    <div className="photo-display-grid">
      {achievementImages.map((img, index) => (
        <div key={index} className="photo-frame">
          <div className="photo-frame-content">
            <img 
              src={img} 
              alt={`Achievement ${index + 1}`}
              className="achievement-photo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.querySelector('.photo-placeholder').style.display = 'flex';
              }}
            />
            <div className="photo-placeholder">
              <FaTrophy className="placeholder-icon" />
              <span>Achievement {index + 1}</span>
            </div>
          </div>
          <div className="photo-info">
            <span className="photo-tag">Achievement #{index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;