import { useState, useRef, useEffect } from "react";
import { FiCopy, FiSettings, FiThumbsUp } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import CodeBlock from "../components/iconInfoComponent/codeblock.js";
import CommentSection from "../components/iconInfoComponent/commentsection.js";
import CustomizePanel from "../components/iconInfoComponent/customizepanel.js";
import "../static/iconinfocss/componentinfo.css";

export default function ComponentInfoPage({ componentType, initialHtml, initialCss }) {
  const location = useLocation();
  const navigate = useNavigate();
  const component = location.state.component;
  const [html, setHtml] = useState(component.html);
  const [css, setCss] = useState(component.css);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeTab, setActiveTab] = useState("html");
  const iframeRef = useRef(null);
  const [liked, setLiked] = useState(false);
  
  const handleLikeClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    // persist to backend or localStorage here
  };

  // Update iframe content when HTML or CSS changes
  useEffect(() => {
    if (iframeRef.current) {
      const styleused = component.style_type;
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
            <body style="display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px;">
              ${html}
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  }, [html, css]);

  const handleCustomizeChange = (newHtml, newCss) => {
    setHtml(newHtml);
    setCss(newCss);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const sidebarItems = [
    "Button",
    "Card",
    "Loader",
    "Radio",
    "Switch",
    "Input",
    "Tooltip",
    "Checkbox",
    "Pattern",
    "Form",
  ];

  const handleSectionChange = (sectionId) => {
    navigate(`/docs#${sectionId.toLowerCase()}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", position: "relative", flexGrow: 1 }}>
        {/* Sidebar */}
        <div
          style={{
            position: "fixed",
            height: "90vh",
            width: "220px",
            backgroundColor: "#252525",
            overflowY: "auto",
            top: "50px",
            left: 0,
            zIndex: 20,
            padding: "16px",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
        >
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item}
              title={item}
              active={component.title.toLowerCase() === item.toLowerCase()}
              onClick={() => handleSectionChange(item)}
            />
          ))}
        </div>

        {/* Main Content */}
        <div style={{ marginLeft: "220px", width: "calc(100% - 220px)" }}>
          <div className="component-info-container">
            <div className="component-header">
              <div>
                <button
                  onClick={() => navigate("/docs")}
                  style={{
                    backgroundColor: "#3d3535",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                >
                  ← Back to Docs
                </button>
                <h1>{component.title} Component</h1>
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
                    <span  />like
                  </div>
                  <div className="card-content">
                    <div className="preview-container">
                      <iframe
                        ref={iframeRef}
                        className="preview-iframe"
                        title="Component Preview"
                      />
                    </div>
                  </div>
                  
                </div>
                
                {/* Like Button - Now outside the preview container */}
                
                
                {isCustomizing && (
                  <div style={{ marginTop: "15px" }}>
                    <CustomizePanel
                      html={html}
                      css={css}
                      onChange={handleCustomizeChange}
                    />
                  </div>
                )}
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
                        <CodeBlock styletype={component.style_type} code={html} language="html" />
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
                        <CodeBlock styletype={component.style_type} code={css} language="css" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="ux-like-btn__container">
                      <button 
                        className={`ux-like-btn__button ${liked ? 'ux-like-btn__button--active' : ''}`}
                        onClick={handleLikeClick}
                        aria-label={liked ? 'Unlike' : 'Like'}
                        title={liked ? 'Unlike' : 'Like'}
                      >
                        <div>like</div>
                        <span className="ux-like-btn__text">{liked ? 'Liked' : 'Like'}</span>
                      </button>
                    </div>
            <div className="separator"></div>
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Item Component
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