"use client"

import { useState } from "react"
import "../../static/iconinfocss/colorpicker.css"

export function ColorPicker({ color, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const presetColors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b",
    "#000000",
    "#ffffff",
  ]

  return (
    <div className="color-picker">
      <div className="color-input-group">
        <button
          className="color-preview"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Pick a color"
        />
        <input type="text" value={color} onChange={(e) => onChange(e.target.value)} className="color-text-input" />
      </div>

      {isOpen && (
        <div className="color-popover">
          <div
            className="color-gradient"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const y = e.clientY - rect.top
              const percent = y / rect.height
              const hue = 360 * percent
              onChange(hslToHex(hue, 100, 50))
            }}
          />

          <div className="color-presets">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="color-preset"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  onChange(presetColor)
                  setIsOpen(false)
                }}
                aria-label={`Select color ${presetColor}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to convert HSL to Hex
function hslToHex(h, s, l) {
  h /= 360
  s /= 100
  l /= 100
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

