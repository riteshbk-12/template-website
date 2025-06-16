import { useEffect, useRef, useState } from 'react';

const FadeIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      }}
    >
      {children}
    </div>
  );
};

// Example usage:
const App = () => {
  return (
    <div>
      {/* Add some spacing to test scrolling */}
      <div style={{ height: '100vh' }}>Scroll down</div>
      
      <FadeIn>
        <div style={{ padding: '20px', background: '#f0f0f0' }}>
          This content will fade in when scrolled into view!
        </div>
      </FadeIn>
    </div>
  );
};

export default FadeIn;