

import { useState, useEffect } from "react"
import { ColorPicker } from "./colorpicker.js"
import "../../static/iconinfocss/customizepanel.css"

export default function CustomizePanel({ html, css, onChange }) {
  // For button component example
  const [buttonText, setButtonText] = useState("Click Me")
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6")
  const [textColor, setTextColor] = useState("#ffffff")
  const [borderRadius, setBorderRadius] = useState(4)
  const [padding, setPadding] = useState({ x: 20, y: 10 })
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState("500")
  const [activeTab, setActiveTab] = useState("content")

  // Update component when customization changes
  useEffect(() => {
    const newHtml = `<button class="custom-button">${buttonText}</button>`

    const newCss = `.custom-button {
  background-color: ${backgroundColor};
  color: ${textColor};
  padding: ${padding.y}px ${padding.x}px;
  border: none;
  border-radius: ${borderRadius}px;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  cursor: pointer;
  transition: background-color 0.2s;
}

.custom-button:hover {
  background-color: ${adjustColor(backgroundColor, -20)};
}`

    onChange(newHtml, newCss)
  }, [buttonText, backgroundColor, textColor, borderRadius, padding, fontSize, fontWeight, onChange])

  // Helper function to darken/lighten color for hover state
  function adjustColor(color, amount) {
    const clamp = (num) => Math.min(255, Math.max(0, num))

    // Convert hex to RGB
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    // Adjust each channel
    const adjustedR = clamp(r + amount)
    const adjustedG = clamp(g + amount)
    const adjustedB = clamp(b + amount)

    // Convert back to hex
    return `#${adjustedR.toString(16).padStart(2, "0")}${adjustedG.toString(16).padStart(2, "0")}${adjustedB.toString(16).padStart(2, "0")}`
  }

  return (
    <div className="customize-panel">
      <div className="panel-header">
        <h3>Customize Component</h3>
      </div>
      <div className="panel-content">
        <div className="panel-tabs">
          <button
            className={`panel-tab ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Content
          </button>
          <button
            className={`panel-tab ${activeTab === "style" ? "active" : ""}`}
            onClick={() => setActiveTab("style")}
          >
            Style
          </button>
          <button
            className={`panel-tab ${activeTab === "advanced" ? "active" : ""}`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </div>

        <div className="panel-tab-content">
          {activeTab === "content" && (
            <div className="form-group">
              <label htmlFor="button-text">Button Text</label>
              <input
                id="button-text"
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="text-input"
              />
            </div>
          )}

          {activeTab === "style" && (
            <div className="style-options">
              <div className="form-group">
                <label>Background Color</label>
                <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
              </div>

              <div className="form-group">
                <label>Text Color</label>
                <ColorPicker color={textColor} onChange={setTextColor} />
              </div>

              <div className="form-group">
                <label>Border Radius: {borderRadius}px</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number.parseInt(e.target.value))}
                    className="slider"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Padding X: {padding.x}px</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={padding.x}
                      onChange={(e) => setPadding({ ...padding, x: Number.parseInt(e.target.value) })}
                      className="slider"
                    />
                  </div>
                </div>

                <div className="form-group half">
                  <label>Padding Y: {padding.y}px</label>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={padding.y}
                      onChange={(e) => setPadding({ ...padding, y: Number.parseInt(e.target.value) })}
                      className="slider"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Font Size: {fontSize}px</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="12"
                    max="24"
                    step="1"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
                    className="slider"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Font Weight</label>
                <select value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} className="select-input">
                  <option value="400">Normal (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi-Bold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="advanced-options">
              <div className="form-group">
                <label htmlFor="custom-html">Custom HTML</label>
                <textarea
                  id="custom-html"
                  value={html}
                  onChange={(e) => onChange(e.target.value, css)}
                  className="code-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="custom-css">Custom CSS</label>
                <textarea
                  id="custom-css"
                  value={css}
                  onChange={(e) => onChange(html, e.target.value)}
                  className="code-textarea"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

