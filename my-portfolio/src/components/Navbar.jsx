import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaCode, FaProjectDiagram, FaGraduationCap, FaEnvelope, FaLock } from 'react-icons/fa';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // FIXED: Removed unused logoClickCount and setLogoClickCount
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [logoClicks, setLogoClicks] = useState([]);

  const colors = [
    "#f72585", "#b5179e", "#7209b7", "#560bad", "#480ca8",
    "#3a0ca3", "#3f37c9", "#4361ee", "#4895ef", "#4cc9f0"
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'about', label: 'About', icon: <FaUser /> },
    { id: 'skills', label: 'Skills', icon: <FaCode /> },
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope /> }
  ];

  // Secret click handler
  const handleSecretLogoClick = () => {
    const now = Date.now();
    const newClicks = [...logoClicks, now].filter(time => now - time < 3000);
    setLogoClicks(newClicks);
    
    // Animation feedback
    const logoElement = document.querySelector('.logo-text');
    if (logoElement) {
      logoElement.style.transform = `scale(${1 + newClicks.length * 0.05})`;
      setTimeout(() => {
        logoElement.style.transform = 'scale(1)';
      }, 200);
    }
    
    // Show admin button after 5 clicks within 3 seconds
    if (newClicks.length >= 5) {
      setShowAdminButton(true);
      setLogoClicks([]);
      
      // Hide after 10 seconds
      setTimeout(() => {
        setShowAdminButton(false);
      }, 10000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavItemGradient = (index) => {
    const color1 = colors[index % colors.length];
    const color2 = colors[(index + 3) % colors.length];
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };

  const getLogoGradient = () => {
    return `linear-gradient(45deg, ${colors[0]}, ${colors[6]}, ${colors[9]})`;
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{
        background: scrolled 
          ? 'rgba(10, 10, 15, 0.95)' 
          : 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled 
          ? `1px solid ${colors[7]}30`
          : '1px solid transparent'
      }}
    >
      <div className="nav-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={handleSecretLogoClick}
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <motion.span 
            className="logo-text"
            style={{ 
              background: getLogoGradient(),
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'transform 0.2s ease'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            SUBITCHAKALAKSHMI A
          </motion.span>
          
          <motion.div 
            className="logo-underline"
            style={{
              background: getLogoGradient()
            }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {showAdminButton && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                left: '0',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                zIndex: 100
              }}
            >
              <Link 
                to="/admin" 
                className="secret-admin-btn"
                onClick={() => setShowAdminButton(false)}
                style={{
                  background: 'linear-gradient(135deg, #f72585, #7209b7)',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(247, 37, 133, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  animation: 'pulse 2s infinite'
                }}
              >
                <FaLock style={{ fontSize: '0.7rem' }} />
                Admin Access
              </Link>
            </motion.div>
          )}
        </motion.div>

        <div className="nav-menu">
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="nav-item-wrapper"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
              >
                <motion.div 
                  className="nav-icon-wrapper"
                  animate={{
                    scale: hoveredItem === item.id ? 1.2 : 1,
                    rotate: hoveredItem === item.id ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span 
                    className="nav-icon"
                    style={{
                      color: activeSection === item.id ? colors[7] : 'var(--text-secondary)',
                      filter: hoveredItem === item.id ? `drop-shadow(0 0 8px ${colors[index % colors.length]})` : 'none'
                    }}
                  >
                    {item.icon}
                  </span>
                </motion.div>
                
                <span className="nav-label">{item.label}</span>
                
                <motion.div 
                  className="nav-underline"
                  style={{
                    background: getNavItemGradient(index)
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: activeSection === item.id ? '100%' : hoveredItem === item.id ? '60%' : '0%' 
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {hoveredItem === item.id && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="particle"
                        style={{
                          background: colors[(index + i) % colors.length]
                        }}
                        initial={{ 
                          scale: 0, 
                          opacity: 0,
                          x: 0,
                          y: 0 
                        }}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 0.7, 0],
                          x: [0, Math.random() * 40 - 20],
                          y: [0, Math.random() * 20 - 10]
                        }}
                        transition={{ 
                          duration: 0.8,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </>
                )}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.button 
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {isOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              <FaTimes />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaBars />
            </motion.div>
          )}
        </motion.button>
      </div>

      {isOpen && (
        <motion.div 
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(135deg, ${colors[0]}20, ${colors[6]}20)`,
            backdropFilter: 'blur(20px)'
          }}
        >
          <div className="mobile-menu-content">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="mobile-nav-content">
                  <motion.span 
                    className="mobile-nav-icon"
                    style={{
                      color: activeSection === item.id ? colors[index % colors.length] : 'var(--text-secondary)'
                    }}
                    animate={{
                      scale: activeSection === item.id ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5, repeat: activeSection === item.id ? Infinity : 0 }}
                  >
                    {item.icon}
                  </motion.span>
                  
                  <span className="mobile-nav-label">{item.label}</span>
                  
                  <motion.div 
                    className="mobile-nav-indicator"
                    style={{
                      background: getNavItemGradient(index)
                    }}
                    animate={{ 
                      scale: activeSection === item.id ? [1, 1.2, 1] : 0.8,
                      opacity: activeSection === item.id ? 1 : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <motion.div 
                  className="mobile-nav-line"
                  style={{
                    background: getNavItemGradient(index)
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                />
              </motion.a>
            ))}
            
            {showAdminButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                style={{ marginTop: '20px', padding: '0 20px' }}
              >
                <Link 
                  to="/admin" 
                  className="mobile-admin-link"
                  onClick={() => {
                    setIsOpen(false);
                    setShowAdminButton(false);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #f72585, #7209b7)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 12px rgba(247, 37, 133, 0.3)'
                  }}
                >
                  <FaLock /> Admin Panel
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;