import { useState, useEffect } from 'react';
import '../../static/navigation/navigation.css';

export default function Navigation({ home, scrolled, navOpen }) {
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { id: 'docs', label: 'Docs' },
    { id: 'icons', label: 'Icons' },
    { id: 'themes', label: 'Themes' },
    { id: 'add', label: 'Add' },
    { id: 'ai', label: 'AI' }
  ];
  
  return (
    <div className={`navigation-container ${home ? (scrolled ? "visible" : "") : "visible"} ${navOpen ? "mobile-open" : ""}`}>
      <div className="nav-container">
        <nav className="main-navigation" aria-label="Main navigation">
          <ul className="nav-list" role="menubar">
            {navItems.map((item, index) => (
              <li 
                className="nav-item" 
                key={item.id} 
                role="none"
                style={{"--item-index": index + 1}}
              >
                <a
                  href={`/${item.id}`}
                  className={`nav-link1 ${activeSection === item.id ? 'active' : ''}`}
                  role="menuitem"
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  <span className="nav-indicator" aria-hidden="true"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}