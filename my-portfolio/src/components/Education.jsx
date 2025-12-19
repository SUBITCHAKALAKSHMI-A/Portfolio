import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';

const Education = () => {
  const education = [
    {
      degree: 'B.Tech in Artificial Intelligence & Machine Learning',
      institution: 'Kongu Engineering College',
      period: '2023–2027',
      cgpa: 'CGPA: 8.29',
      icon: <FaUniversity />
    },
    {
      degree: 'HSC',
      institution: 'Cluny Matriculation Higher Secondary School',
      period: '2023',
      cgpa: '',
      icon: <FaGraduationCap />
    },
    {
      degree: 'SSLC',
      institution: 'Cluny Matriculation Higher Secondary School',
      period: '2021',
      cgpa: '',
      icon: <FaGraduationCap />
    }
  ];

  return (
    <div className="education-section">
      <h2 className="section-title">Education</h2>
      
      <div className="education-timeline">
        {education.map((edu, index) => (
          <motion.div
            key={edu.degree}
            className="education-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="education-icon">
              {edu.icon}
            </div>
            
            <div className="education-content">
              <h3>{edu.degree}</h3>
              <p className="institution">{edu.institution}</p>
              
              <div className="education-details">
                <span className="period">
                  <FaCalendarAlt /> {edu.period}
                </span>
                {edu.cgpa && <span className="cgpa">{edu.cgpa}</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;