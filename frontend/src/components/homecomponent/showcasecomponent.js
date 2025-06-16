import React, { useState, useEffect } from 'react';
import { FaReact, FaGithub, FaStar } from 'react-icons/fa';
import pic from "../../static/assets/imagesproject/download.jpeg";
import pic2 from "../../static/assets/imagesproject/image1.jpeg";
import '../../static/homepagecss/showcase.css';

const ComponentsShowcase = () => {
  const [componentIndex, setComponentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);

  const components = [
    {
      title: 'Buttons',
      content: (
        <>
          <button className="btn primary">Primary</button>
          <button className="btn secondary">Secondary</button>
        </>
      )
    },
    {
      title: 'Card',
      content: (
        <div className="card">
          <h4>Card Title</h4>
          <p>Card content goes here</p>
        </div>
      )
    }
  ];

  const templateImages = [
    { src: pic, alt: 'Template 1', title: 'Modern Dashboard' },
    { src: pic2, alt: 'Template 2', title: 'Landing Page' }
  ];

  const icons = [
    { icon: <FaReact size={50} />, name: 'React' },
    { icon: <FaGithub size={50} />, name: 'Github' },
    { icon: <FaStar size={50} />, name: 'Star' }
  ];

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % templateImages.length);
    }, 3500);

    const componentTimer = setInterval(() => {
      setComponentIndex((prev) => (prev + 1) % components.length);
    }, 3000);

    const iconTimer = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 3200);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".template-carousel-wrapper, .carousel-wrapper");
    sections.forEach((el) => observer.observe(el));

    const iconElements = document.querySelectorAll(".icon-floating-element");
    iconElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });

    const animateContent = () => {
      const contentItems = document.querySelectorAll(".component-item > *");
      contentItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("show");
        }, 1000 + index * 800);
      });
    };
    animateContent();
    const contentTimer = setInterval(animateContent, 3000);

    return () => {
      clearInterval(imageTimer);
      clearInterval(componentTimer);
      clearInterval(iconTimer);
      clearInterval(contentTimer);
      sections.forEach((el) => observer.unobserve(el));
    };
  }, [components.length, templateImages.length, icons.length]);

  const nextSlide = (setter, length) => {
    setter((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (setter, length) => {
    setter((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return (
    <div className="components-showcase">
      <h1 className="showcase-main-heading">Component Library</h1>
      
      {/* Template Carousel (Top) */}
      <div className="template-carousel-wrapper">
        <h2 className="section-heading">Templates</h2>
        <div className="carousel-container">
          <button 
            className="carousel-btn prev" 
            onClick={() => prevSlide(setImageIndex, templateImages.length)}
            aria-label="Previous template"
          >
            ←
          </button>
          <div className="carousel-slide">
            <div className="template-item">
              <img 
                src={templateImages[imageIndex].src} 
                alt={templateImages[imageIndex].alt}
                className="template-image1"
              />
              <div className="template-overlay1">
                <h3 className="template-title">{templateImages[imageIndex].title}</h3>
              </div>
            </div>
          </div>
          <button 
            className="carousel-btn next" 
            onClick={() => nextSlide(setImageIndex, templateImages.length)}
            aria-label="Next template"
          >
            →
          </button>
        </div>
        <Dots currentIndex={imageIndex} items={templateImages} setIndex={setImageIndex} />
      </div>

      {/* Bottom Section with Components and Icons */}
      <div className="bottom-carousels">
        {/* Components Carousel */}
        <div className="carousel-wrapper">
          <h2 className="section-heading">Components</h2>
          <div className="carousel-container">
            <button 
              className="carousel-btn prev" 
              onClick={() => prevSlide(setComponentIndex, components.length)}
              aria-label="Previous component"
            >
              ←
            </button>
            <div className="carousel-slide">
              <div className="component-item">
                <h3>{components[componentIndex].title}</h3>
                {components[componentIndex].content}
              </div>
            </div>
            <button 
              className="carousel-btn next" 
              onClick={() => nextSlide(setComponentIndex, components.length)}
              aria-label="Next component"
            >
              →
            </button>
          </div>
          <Dots currentIndex={componentIndex} items={components} setIndex={setComponentIndex} />
        </div>

        {/* Icons Carousel */}
        <div className="carousel-wrapper">
          <h2 className="section-heading">Icons</h2>
          <div className="carousel-container">
            <button 
              className="carousel-btn prev" 
              onClick={() => prevSlide(setIconIndex, icons.length)}
              aria-label="Previous icon"
            >
              ←
            </button>
            <div className="carousel-slide">
              <div className="component-item">
                <div className="icon-floating-element">
                  {icons[iconIndex].icon}
                  <span className="icon-name">{icons[iconIndex].name}</span>
                </div>
              </div>
            </div>
            <button 
              className="carousel-btn next" 
              onClick={() => nextSlide(setIconIndex, icons.length)}
              aria-label="Next icon"
            >
              →
            </button>
          </div>
          <Dots currentIndex={iconIndex} items={icons} setIndex={setIconIndex} />
        </div>
      </div>
    </div>
  );
};

const Dots = ({ currentIndex, items, setIndex }) => (
  <div className="carousel-dots">
    {items.map((_, index) => (
      <span
        key={index}
        className={`dot ${currentIndex === index ? 'active' : ''}`}
        onClick={() => setIndex(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

export default ComponentsShowcase;