import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Hero = () => {
  // Two color palettes for more variety
  const palette1 = [
    "#f72585","#b5179e","#7209b7","#560bad","#480ca8",
    "#3a0ca3","#3f37c9","#4361ee","#4895ef","#4cc9f0"
  ];
  
  const palette2 = [
    "#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de",
    "#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"
  ];

  // Memoize roles array to prevent unnecessary re-renders
  const roles = useMemo(() => [
    'Full Stack Developer',
    'MERN Stack Developer',
    'AI/ML Engineer',
    'Web Developer'
  ], []);

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentRoleText = roles[currentRole];
    const speed = isDeleting ? 50 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRoleText) {
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }
      
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
        return;
      }

      setDisplayText(
        isDeleting 
          ? currentRoleText.substring(0, displayText.length - 1)
          : currentRoleText.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles]);

  // Floating shapes
  const floatingShapes = [
    { color: palette1[0], size: 40, x: '10%', y: '20%', delay: 0 },
    { color: palette1[3], size: 60, x: '85%', y: '15%', delay: 0.5 },
    { color: palette1[6], size: 30, x: '5%', y: '70%', delay: 1 },
    { color: palette2[9], size: 50, x: '90%', y: '80%', delay: 1.5 },
  ];

  return (
    <div className="hero-section modern-split">
      {/* Animated background shapes */}
      <div className="animated-background">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: shape.size,
              height: shape.size,
              background: `radial-gradient(circle, ${shape.color}40, transparent)`,
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="hero-container">
        {/* Left Content - Text with gradient border */}
        <motion.div
          className="text-content-wrapper"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="gradient-border-box">
            <div className="inner-content">
              {/* Animated badge */}
              <motion.div
                className="animated-badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  background: `linear-gradient(135deg, ${palette1[0]}20, ${palette2[7]}20)`,
                  border: `1px solid ${palette1[0]}40`,
                }}
              >
                <motion.span
                  className="badge-text"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Available for Opportunities
                </motion.span>
                <motion.div
                  className="badge-pulse"
                  style={{ background: palette1[0] }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Main content */}
              <div className="main-content">
                <motion.h1
                  className="greeting-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Hello, I'm
                </motion.h1>

                <motion.h2
                  className="name-text"
                  style={{
                    background: `linear-gradient(90deg, ${palette1[0]}, ${palette2[4]}, ${palette2[9]})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 0.4 },
                    y: { duration: 0.5, delay: 0.4 },
                    backgroundPosition: {
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }
                  }}
                >
                SUBITCHAKALAKSHMI A
                </motion.h2>

                {/* Typing container */}
                <div className="typing-container">
                  <h2 className="role-prefix">I'm a</h2>
                  <div className="typing-display">
                    <span className="typed-text">{displayText}</span>
                    <span className="cursor">|</span>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  className="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Passionate about building scalable web applications and implementing 
                  cutting-edge AI/ML solutions. Specializing in Full Stack Development 
                  with modern technologies.
                </motion.p>

                {/* Quick stats */}
                <motion.div
                  className="quick-stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {[
                    { value: '10+', label: 'Projects' },
                    { value: '5+', label: 'Tech Stack' },
                    { value: '2+', label: 'Years Exp' },
                  ].map((stat, i) => (
                    <div key={i} className="stat-item">
                      <span className="stat-value" style={{ color: palette1[i * 2] }}>
                        {stat.value}
                      </span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  className="action-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.a
                    href="#contact"
                    className="primary-action"
                    style={{ background: `linear-gradient(135deg, ${palette1[0]}, ${palette2[7]})` }}
                    whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${palette1[0]}40` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Get In Touch</span>
                    <FaArrowRight />
                  </motion.a>
                  
                  <motion.a
                    href="#projects"
                    className="secondary-action"
                    style={{ borderColor: palette2[7] }}
                    whileHover={{ scale: 1.05, backgroundColor: `${palette2[7]}10` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Work</span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Profile Image with enhanced effects */}
        <motion.div
          className="profile-content-wrapper"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="profile-orb-container">
            {/* Outer glow ring - Keep rotation */}
            <motion.div
              className="outer-glow"
              style={{
                background: `conic-gradient(from 0deg, ${palette1[0]}, ${palette1[3]}, ${palette2[7]}, ${palette2[9]}, ${palette1[0]})`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Middle ring */}
            <motion.div
              className="middle-ring"
              style={{
                background: `radial-gradient(circle, ${palette2[7]}20, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Profile image container - No rotation */}
            <div className="profile-image-orb">
              <motion.div
                className="profile-image-wrapper"
                style={{
                  background: `linear-gradient(135deg, ${palette1[0]}30, ${palette2[7]}30)`,
                  borderRadius: '50%',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Profile photo */}
                <div className="image-container">
                  <img 
                    src="/profile-photo.jpg" 
                    alt="SUBITCHAKALAKSHMI A - Full Stack Developer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const container = e.target.parentElement;
                      if (!container.querySelector('.placeholder-image')) {
                        container.innerHTML = `
                          <div class="placeholder-image" style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            height: 100%;
                            color: #fff;
                            font-size: 3rem;
                          ">
                            <div style="font-size: 4rem; margin-bottom: 0.5rem;">👩‍💻</div>
                            <div style="font-size: 1rem; font-weight: 600;">Vedha K</div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>

                {/* Inner glow */}
                <motion.div
                  className="inner-glow"
                  style={{
                    background: `radial-gradient(circle, ${palette2[7]}20, transparent 70%)`,
                  }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>

          {/* Social links - Centered below the circle */}
          <motion.div
            className="social-links-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="social-title">
              <span className="social-title-text">Connect with me</span>
              <div className="social-title-line" style={{ background: `linear-gradient(90deg, ${palette1[0]}, ${palette2[9]})` }} />
            </div>
            
            <div className="social-icons-grid">
              {[
                { 
                  icon: <FaGithub />, 
                  color: palette1[0], 
                  href: "https://github.com/SUBITCHAKALAKSHMI-A",
                  label: "GitHub"
                },
                { 
                  icon: <FaLinkedin />, 
                  color: palette1[6], 
                  href: "https://www.linkedin.com/in/subitchakalakshmia1/",
                  label: "LinkedIn"
                },
                { 
                  icon: <SiLeetcode />, 
                  color: palette1[3], 
                  href: "https://leetcode.com/u/SUBITCHAKALAKSHMI_A/",
                  label: "LeetCode"
                },
                { 
                  icon: <FaEnvelope />, 
                  color: palette2[9], 
                  href: "mailto:subikshakalakshmiarumugam@gmail.com",
                  label: "Email"
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-center"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: `0 10px 20px ${social.color}40`
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    color: social.color,
                    border: `2px solid ${social.color}40`,
                    background: `linear-gradient(135deg, ${social.color}10, ${social.color}05)`
                  }}
                >
                  <div className="social-icon-circle" style={{ background: `${social.color}20` }}>
                    {social.icon}
                  </div>
                  <span className="social-label-center">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;