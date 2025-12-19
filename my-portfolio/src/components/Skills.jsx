import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaHtml5, FaNode, FaPython, FaJava
} from 'react-icons/fa';
import { 
  SiExpress, SiTailwindcss, SiBootstrap, SiCplusplus,
  SiMongodb, SiMysql, SiTensorflow, SiPytorch, SiPandas,
  SiNumpy, SiScikitlearn
} from 'react-icons/si';
import '../styles/Skills.css';

const Skills = () => {
  // Color palettes
  const palette1 = ["#f72585", "#b5179e", "#7209b7", "#560bad", "#480ca8", "#3a0ca3", "#3f37c9", "#4361ee", "#4895ef", "#4cc9f0"];
  const palette2 = ["#7400b8", "#6930c3", "#5e60ce", "#5390d9", "#4ea8de", "#48bfe3", "#56cfe1", "#64dfdf", "#72efdd", "#80ffdb"];

  // Group skills by category
  const skillsByCategory = {
    'Web Development': [
      { name: 'React.js', icon: FaReact, color: palette1[7] },
      { name: 'JavaScript', icon: FaJs, color: palette1[6] },
      { name: 'HTML5/CSS3', icon: FaHtml5, color: palette1[5] },
      { name: 'Node.js', icon: FaNode, color: palette1[8] },
      { name: 'Express.js', icon: SiExpress, color: palette1[9] },
      { name: 'Tailwind', icon: SiTailwindcss, color: palette2[6] },
      { name: 'Bootstrap', icon: SiBootstrap, color: palette2[5] },
    ],
    'Programming Languages': [
      { name: 'Python', icon: FaPython, color: palette1[0] },
      { name: 'Java', icon: FaJava, color: palette1[1] },
      { name: 'C', icon: SiCplusplus, color: palette1[2] },
    ],
    'Databases': [
      { name: 'MongoDB', icon: SiMongodb, color: palette1[8] },
      { name: 'MySQL', icon: SiMysql, color: palette1[7] },
    ],
    'AI/ML': [
      { name: 'TensorFlow', icon: SiTensorflow, color: palette1[0] },
      { name: 'PyTorch', icon: SiPytorch, color: palette1[1] },
      { name: 'Scikit-learn', icon: SiScikitlearn, color: palette1[3] },
    ],
    'Data Analysis': [
      { name: 'Pandas', icon: SiPandas, color: palette2[9] },
      { name: 'NumPy', icon: SiNumpy, color: palette2[8] },
    ]
  };

  // Get color by index for variety
  const getColor = (index, palette) => {
    return palette[index % palette.length];
  };

  const categories = Object.keys(skillsByCategory);

  return (
    <div className="skills-section" id="skills">
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Technical Skills</h2>
      </motion.div>

      <div className="skills-categories-container">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="category-title">{category}</h3>
            <div className="category-skills-grid">
              {skillsByCategory[category].map((skill, index) => {
                const IconComponent = skill.icon;
                const color = skill.color || getColor(index, index % 2 === 0 ? palette1 : palette2);
                const globalIndex = Object.values(skillsByCategory)
                  .slice(0, categoryIndex)
                  .reduce((acc, curr) => acc + curr.length, 0) + index;
                
                return (
                  <motion.div
                    key={skill.name}
                    className="skill-circle-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: globalIndex * 0.03,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className="skill-circle"
                      style={{
                        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                        borderColor: `${color}60`
                      }}
                    >
                      <motion.div
                        className="skill-icon-wrapper"
                        style={{ color: color }}
                        whileHover={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: 1.15
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent />
                      </motion.div>
                      <motion.div
                        className="skill-glow"
                        style={{
                          background: `radial-gradient(circle, ${color}40, transparent 70%)`
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    <motion.p
                      className="skill-name"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: globalIndex * 0.03 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {skill.name}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;