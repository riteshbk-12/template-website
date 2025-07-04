import React, { useEffect, useRef } from "react";
import "../../static/homepagecss/featuresection.css"; // Assuming this is where your CSS is located

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const featureCards = document.querySelectorAll('.feature-card');
          const title = document.querySelector('.why-us-title');
          
          title.classList.add('title-reveal');
          
          featureCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('feature-card-visible');
              card.style.setProperty('--card-delay', `${index * 0.25}s`);
            }, 250 * index);
          });

          const handleMouseMove = (e) => {
            featureCards.forEach(card => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              
              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);
            });
          };

          window.addEventListener('mousemove', handleMouseMove);
          
          observer.disconnect();
          return () => window.removeEventListener('mousemove', handleMouseMove);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="features-section cosmic-theme" ref={sectionRef}>
      <div className="container">
        <div className="features-galaxy">
          <div className="why-us-container">
            <h2 className="why-us-title">
              <span className="title-orbit">Why</span>
              <span className="title-core">Choose Our Templates?</span>
              <div className="title-accent"></div>
            </h2>
            <p className="why-us-subtitle">
              Elevate your web presence with our stellar template features
            </p>
          </div>

          <div className="features-constellation">
            <FeatureCard 
              icon="🎨"
              title="Custom Canvas"
              description="Fully customizable templates to match your brand vision."
              glowColor="#ff6b6b"
            />
            <FeatureCard 
              icon="📱"
              title="Responsive Orbit"
              description="Pixel-perfect designs that adapt to any device."
              glowColor="#4ecdc4"
            />
            <FeatureCard 
              icon="🤖"
              title="AI Templates"
              description="Smart templates generated by artificial intelligence."
              glowColor="#9b59b6"
            />
            <FeatureCard 
              icon="🔍"
              title="SEO Optimized"
              description="Built-in SEO features to boost your search rankings."
              glowColor="#96c93d"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, glowColor }) {
  return (
    <div className="feature-card" style={{ '--glow-color': glowColor }}>
      <div className="feature-card-inner">
        <div className="feature-icon-wrapper">
          <span className="feature-icon">{icon}</span>
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        <div className="feature-glow"></div>
      </div>
    </div>
  );
}