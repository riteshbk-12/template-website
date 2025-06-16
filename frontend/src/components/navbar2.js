import React, { useState, useRef } from "react";  
import '../static/Navbar.css';
import { NavLink } from "react-router-dom"; 

function Navbar() {
  const [expandedMenu, setExpandedMenu] = useState(null); // Tracks which menu is open
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setExpandedMenu(menu);
  };

  const handleMouseLeave = (e) => {
    if (!e.relatedTarget || typeof e.relatedTarget.closest !== "function") {
      setExpandedMenu(null);
      return;
    }

    const isMovingWithinMenu =
      e.relatedTarget.closest(".navlink") || e.relatedTarget.closest(".dropbox");

    if (!isMovingWithinMenu) {
      timeoutRef.current = setTimeout(() => {
        setExpandedMenu(null);
      }, 200);
    }
  };

  return (
    <div className="navbar">
      <ul className="nav-menu">
        {/* Categories Dropdown */}
        <NavLink className="navlink" to="">
          <li 
            onMouseEnter={() => handleMouseEnter("categories")}
            onMouseLeave={handleMouseLeave}
          >
            Categories
            {expandedMenu === "categories" && (
              <div className="dropbox" onMouseEnter={() => handleMouseEnter("categories")} onMouseLeave={handleMouseLeave}>
                <ul >
                  <li><NavLink className="navlink" to="/jewellery/allproducts">All Jewellery</NavLink></li>
                  <li>Rings</li>
                  <li>Necklaces</li>
                  <li>Bracelets</li>
                </ul>
              </div>
            )}
          </li>
        </NavLink>
        <NavLink className="navlink"><li>Pendents</li></NavLink>
        <NavLink className="navlink"  to="/jewellery/earrings"><li>Earrings</li></NavLink>
        <NavLink className="navlink"><li>Rings</li></NavLink>
        <NavLink className="navlink"><li>Mangalsutra</li></NavLink>

      </ul>
    </div>
  );
}

export default Navbar;