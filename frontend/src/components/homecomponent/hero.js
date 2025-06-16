import { motion } from 'framer-motion';
import "../../static/homepagecss/hero-section.css";

export default function HeroSection() {
  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const browserVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateX: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 5,
      rotateY:-5,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  // New animations for title text
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section 
      id="home" 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-overlay"></div>
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={contentVariants}
        >
          <motion.h1 className="hero-title">
            {/* Animated title with gradient effect */}
            <span className="title-wrapper">
              {Array.from("TemplatePro").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="title-letter"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <motion.p 
            className="hero-description"
            variants={contentVariants}
          >
            We create innovative solutions for tomorrow's challenges. Discover how our cutting-edge technology can
            transform your business.
          </motion.p>
          <motion.div 
            className="hero-buttons"
            variants={contentVariants}
          >
            <motion.button 
              className="btn btn-primary"
              variants={buttonVariants}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              variants={buttonVariants}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Floating Windows Container */}
        <motion.div 
          className="floating-windows-container"
          variants={containerVariants}
          style={{ perspective: "1000px" }}
        >
          {/* Main Browser Window */}
          <motion.div 
            className="browser-window"
            variants={browserVariants}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="browser-header">
              <div className="browser-dots">
                <span className="browser-dot red"></span>
                <span className="browser-dot yellow"></span>
                <span className="browser-dot green"></span>
              </div>
              <div className="browser-address">
                <span className="website-name">templatepro.com</span>
              </div>
            </div>
            <div className="browser-content">
              {/* Empty content to match the image */}
            </div>
          </motion.div>
          
          {/* Floating Window 1 - top right */}
          <motion.div 
            className="floating-window window-1"
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: 1,
              y: [-15, 0, -15],
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.8 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.8 }
            }}
          />
          
          {/* Floating Window 2 - bottom left */}
          <motion.div 
            className="floating-window window-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1,
              y: [15, 0, 15],
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 1 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}