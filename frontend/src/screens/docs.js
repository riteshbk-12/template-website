import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiCopy, FiSettings, FiArrowLeft } from "react-icons/fi";
import Header from "../components/navbarcomponent/header";
import CodeBlock from "../components/iconInfoComponent/codeblock.js";
import CommentSection from "../components/iconInfoComponent/commentsection.js";
import CustomizePanel from "../components/iconInfoComponent/customizepanel.js";

function Docs() {
  const [activeSection, setActiveSection] = useState("button");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [componentdata, setcomponentdata] = useState({
    Button: [],
    Card: [],
    Loader: [],
    Radio: [],
    Switch: [],
    Input: [],
    Tooltip: [],
    Checkbox: [],
    Pattern: [],
    Form: [],
  });
  
  // New state for selected component and view
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isComponentInfoView, setIsComponentInfoView] = useState(false);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const iframeRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if URL contains component ID and set view accordingly
    const hash = location.hash;
    if (hash && hash.includes("component-")) {
      const componentId = hash.replace("#component-", "");
      // Find component by ID in componentdata (this would need to be implemented)
      // For now, we'll continue with the flow but this could be enhanced
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getcomponents");
        if (!response.ok) {
          throw new Error("Failed to fetch components");
        }
        const data = await response.json();

        // Filtering the data based on component type
        const filteredData = {
          Button: data.filter(item => item.title.toLowerCase() === "button"),
          Card: data.filter(item => item.title.toLowerCase() === "card"),
          Loader: data.filter(item => item.title.toLowerCase() === "loader"),
          Radio: data.filter(item => item.title.toLowerCase() === "radio"),
          Switch: data.filter(item => item.title.toLowerCase() === "switch"),
          Input: data.filter(item => item.title.toLowerCase() === "input"),
          Tooltip: data.filter(item => item.title.toLowerCase() === "tooltip"),
          Checkbox: data.filter(item => item.title.toLowerCase() === "checkbox"),
          Pattern: data.filter(item => item.title.toLowerCase() === "pattern"),
          Form: data.filter(item => item.title.toLowerCase() === "form"),
        };

        setcomponentdata(filteredData);
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };

    fetchData();
  }, []);

  // Update active section on sidebar item click
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId.toLowerCase());
    setIsComponentInfoView(false); // Return to docs view
    setSelectedComponent(null);
    
    // Update URL hash without redirecting
    navigate(`/docs#${sectionId.toLowerCase()}`, { replace: true });
  };

  // Handle component selection
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    setIsComponentInfoView(true);
    setHtml(component.html || "");
    setCss(component.css || "");
    
    // Update URL hash to reflect selected component without redirecting
    navigate(`/docs#component-${component.id}`, { replace: true });
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle customization changes
  const handleCustomizeChange = (newHtml, newCss) => {
    setHtml(newHtml);
    setCss(newCss);
  };

  // Copy code to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  
  // Update iframe content when HTML or CSS changes
  useEffect(() => {
    if (iframeRef.current && selectedComponent) {
      const styleused = selectedComponent.style_type;
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
             ${styleused === "Tailwind" ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}
              <style>${css}</style>
            </head>
            <body style="display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; background-color: #2c2c2c; color: white;">
              ${html}
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  }, [html, css, selectedComponent]);

  return (
    <div
      style={{
        background: `#0a0a0a url('https://www.transparenttextures.com/patterns/dark-mosaic.png')`,
        height: "100vh",
        overflowY: "auto",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Header />

      <div
        style={{
          display: "flex",
          position: "relative",
          flexGrow: 1,
        }}
      >
        {/* Sidebar - Component Navigation */}
        <div
          className="indexview"
          style={{
            position: "fixed",
            height: "90vh",
            width: "220px",
            backgroundColor: "#252525",
            overflowY: "auto",
            top: "130px",
            left: 0,
            zIndex: 20,
            padding: "16px",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            style={{
              position: "fixed",
              top: "140px",
              left: mobileMenuOpen ? "230px" : "10px",
              zIndex: 30,
              padding: "8px",
              backgroundColor: "#3d3535",
              border: "none",
              borderRadius: "5px",
              color: "white",
              cursor: "pointer",
              display: "none",
            }}
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>

          {/* Sidebar Items */}
          {["Button", "Card", "Loader", "Radio", "Switch", "Input", "Tooltip", "Checkbox", "Pattern", "Form"].map(
            (item) => (
              <SidebarItem
                key={item}
                title={item}
                active={activeSection === item.toLowerCase()}
                onClick={() => handleSectionChange(item)}
              />
            )
          )}
        </div>

        {/* Main Content - Either Component List or Component Info */}
        <div
          style={{
            flex: 1,
            padding: "0 20px",
            marginLeft: "220px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {!isComponentInfoView ? (
            // Components List View
            <div
              style={{
                borderRadius: "12px",
                padding: "24px",
                marginTop: "130px",
                position: "relative",
                maxWidth: "1200px",
                margin: "130px auto 0",
              }}
            >
              {/* Section Title */}
              <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Components
              </h2>

              {/* Component Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "24px",
                }}
              >
                {componentdata[activeSection.charAt(0).toUpperCase() + activeSection.slice(1)].map((component, index) => (
                  <ComponentCard 
                    key={index} 
                    component={component} 
                    onSelect={() => handleComponentSelect(component)}
                  />
                ))}
              </div>

              {/* Empty State */}
              {componentdata[activeSection.charAt(0).toUpperCase() + activeSection.slice(1)].length === 0 && (
                <div style={{ 
                  textAlign: "center", 
                  padding: "40px", 
                  backgroundColor: "#252525", 
                  borderRadius: "8px",
                  marginTop: "20px" 
                }}>
                  <p>No {activeSection} components available.</p>
                </div>
              )}
            </div>
          ) : (
            // Component Info View
            <div className="component-info-container" style={{ marginTop: "50px" }}>
              <div className="component-header">
                <div>
                  <button
                    onClick={() => {
                      setIsComponentInfoView(false);
                      navigate("/docs", { replace: true });
                    }}
                    style={{
                      backgroundColor: "#3d3535",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <FiArrowLeft /> Back to Docs
                  </button>
                  <h1>{selectedComponent?.title} Component</h1>
                  <p className="subtitle">Preview, customize, and get the code for this component</p>
                </div>
                <button
                  className="customize-button"
                  onClick={() => setIsCustomizing(!isCustomizing)}
                >
                  <FiSettings className="icon" />
                  {isCustomizing ? "Hide Customizer" : "Customize"}
                </button>
              </div>

              <div className="component-content">
                {/* Preview Section */}
                <div className="preview-section">
                  <div className="card">
                    <div className="card-header">
                      <h2>Component Preview</h2>
                    </div>
                    <div className="card-content">
                      <div className="preview-container">
                        <iframe
                          ref={iframeRef}
                          className="preview-iframe"
                          title="Component Preview"
                        />
                      </div>
                      {isCustomizing && (
                        <CustomizePanel
                          html={html}
                          css={css}
                          onChange={handleCustomizeChange}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Code Section */}
                <div className="code-section">
                  <div className="tabs">
                    <button
                      className={`tab ${activeTab === "html" ? "active" : ""}`}
                      onClick={() => setActiveTab("html")}
                    >
                      HTML
                    </button>
                    <button
                      className={`tab ${activeTab === "css" ? "active" : ""}`}
                      onClick={() => setActiveTab("css")}
                    >
                      CSS
                    </button>
                  </div>

                  <div className="tab-content">
                    {activeTab === "html" && (
                      <div className="card">
                        <div className="card-header">
                          <h2>HTML Code</h2>
                          <button
                            className="copy-button"
                            onClick={() => copyToClipboard(html)}
                          >
                            <FiCopy className="icon" />
                            Copy
                          </button>
                        </div>
                        <div className="card-content">
                          <CodeBlock styletype={selectedComponent?.style_type} code={html} language="html" />
                        </div>
                      </div>
                    )}

                    {activeTab === "css" && (
                      <div className="card">
                        <div className="card-header">
                          <h2>CSS Code</h2>
                          <button
                            className="copy-button"
                            onClick={() => copyToClipboard(css)}
                          >
                            <FiCopy className="icon" />
                            Copy
                          </button>
                        </div>
                        <div className="card-content">
                          <CodeBlock styletype={selectedComponent?.style_type} code={css} language="css" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="separator"></div>
              <CommentSection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Component Card with iframe that dynamically loads HTML, CSS (or Tailwind)
const ComponentCard = ({ component, onSelect }) => {
  // Create the HTML content outside of useEffect
  const generateIframeContent = () => {
    const styleused = component.style_type;
    const htmlContent = component.html || '';
    const cssContent = component.style_type === "CSS" ? component.css : '';
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${styleused === "Tailwind" ?  '<script src="https://cdn.tailwindcss.com"></script>' : ''}
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100%;
              margin: 0;
              padding: 10px;
              background-color: #2c2c2c;
              color: white;
              font-family: sans-serif;
            }
            
            /* Component container for centering */
            .component-container {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
            }
            
            /* Custom component styles */
            ${cssContent}
          </style>
        </head>
        <body>
          <div class="component-container">
            ${htmlContent}
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s, box-shadow 0.3s",
        height: "300px", // Fixed height for consistent grid
        display: "flex",
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
        cursor: "pointer" // Add cursor pointer to indicate clickable
      }}
      onClick={onSelect} // Use the onSelect prop instead of navigate
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.4)";
        // Make the View button visible on hover
        const viewButton = e.currentTarget.querySelector('.view-button');
        if (viewButton) viewButton.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
        // Hide the View button when not hovering
        const viewButton = e.currentTarget.querySelector('.view-button');
        if (viewButton) viewButton.style.opacity = "0";
      }}
    >
      {/* Full height Component Preview */}
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {/* iframe using srcDoc instead of manipulating contentDocument */}
        <iframe
          srcDoc={generateIframeContent()}
          title={`${component.title} preview`}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "12px",
            backgroundColor: "#2c2c2c",
            alignItems: "center",
          }}
          sandbox="allow-scripts"
        ></iframe>

        {/* View Button - Only visible on hover */}
        <button
          className="view-button"
          style={{
            backgroundColor: "rgba(0, 180, 255, 0.8)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "0.8rem",
            transition: "all 0.2s",
            position: "absolute",
            top: "10px",
            right: "10px",
            opacity: "0",  // Hidden by default
            fontWeight: "bold",
            zIndex: 10 // Make sure it's above the iframe
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event
            onSelect(); // Use the onSelect prop
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 180, 255, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 180, 255, 0.8)";
          }}
        >
          View
        </button>
        
        {/* Technology badges at the bottom */}
        <div style={{ 
          position: "absolute", 
          bottom: "10px", 
          left: "10px", 
          display: "flex", 
          gap: "8px",
          zIndex: 5 // Ensure badges are visible
        }}>
          {component.html && (
            <span style={{ 
              fontSize: "0.7rem", 
              padding: "3px 8px", 
              borderRadius: "12px", 
              backgroundColor: "#e34c26", 
              color: "white",
              opacity: "0.8"
            }}>
              HTML
            </span>
          )}
          {component.style_type === "CSS" ? (
            <span style={{ 
              fontSize: "0.7rem", 
              padding: "3px 8px", 
              borderRadius: "12px", 
              backgroundColor: "#264de4", 
              color: "white",
              opacity: "0.8"
            }}>
              CSS
            </span>
          ) : (
            <span style={{ 
              fontSize: "0.7rem", 
              padding: "3px 8px", 
              borderRadius: "12px", 
              backgroundColor: "#38b2ac", 
              color: "white",
              opacity: "0.8"
            }}>
              Tailwind
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component with improved styling
const SidebarItem = ({ title, active, onClick }) => {
  return (
    <div
      style={{
        color: active ? "#00b4ff" : "#e0e0e0",
        cursor: "pointer",
        padding: "14px 20px",
        borderRadius: "6px",
        transition: "all 0.2s ease-in-out",
        backgroundColor: active ? "rgba(0, 180, 255, 0.15)" : "transparent",
        marginBottom: "8px",
        fontSize: "15px",
        fontWeight: active ? "bold" : "500",
        display: "flex",
        alignItems: "center",
        boxShadow: active ? "0px 4px 8px rgba(0, 180, 255, 0.3)" : "none",
        position: "relative",
        overflow: "hidden",
        borderLeft: active ? "4px solid #00b4ff" : "4px solid transparent",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = active
          ? "rgba(0, 180, 255, 0.15)"
          : "transparent";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {title}
    </div>
  );
};

export default Docs;