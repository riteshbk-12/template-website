import { useState, useEffect, useRef } from "react";
import "../../static/navigation/header.css";
import r from "../../static/assets/r letter.png";
import { GoSearch } from "react-icons/go";
import Navigation from "./navigation";
import { useNavigate } from "react-router";

export default function Header({ home }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Reduced scroll threshold for quicker transition
      const isScrolled = window.scrollY >= 300;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNav = () => setNavOpen(!navOpen);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);

  const handleProfileNavigation = (path) => {
    navigate(path);
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // Example: logout function and redirect to home page
    // logout();
    navigate("/");
    setProfileDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`site-header ${home ? (scrolled ? "scrolled" : "") : "scrolled"}`}
        aria-label="Site header"
      >
        <div className="header-container">
          <div className="header-content">
            <div className="header-top">
              <h1 className={`site-title ${home ? (scrolled ? "visible" : "") : "visible"}`}>
                <a href="/" aria-label="Acme Inc - Home">
                  TemplatePro
                </a>
              </h1>

              <div className="header-actions">
                <button className="search-button" aria-label="Search">
                  <GoSearch size={18} />
                </button>

                <div className="profile-container" ref={dropdownRef}>
                  <div 
                    className="profile" 
                    onClick={toggleProfileDropdown}
                    aria-expanded={profileDropdownOpen}
                    aria-haspopup="true"
                  >
                    <img src={r} alt="Profile" />
                  </div>
                  
                  {profileDropdownOpen && (
                    <div className="profile-dropdown">
                      <ul>
                        <li onClick={() => handleProfileNavigation("/userprofile")}>Profile</li>
                        <li onClick={() => handleProfileNavigation("/settings")}>Settings</li>
                        <li onClick={handleLogout}>Logout</li>
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  className="mobile-nav-toggle"
                  aria-expanded={navOpen}
                  aria-controls="mobile-navigation"
                  aria-label="Toggle navigation menu"
                  onClick={toggleNav}
                >
                  <span className="sr-only">Menu</span>
                  <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
}