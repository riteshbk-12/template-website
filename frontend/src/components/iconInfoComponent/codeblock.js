import { useEffect, useRef, useMemo } from "react";
import "../../static/iconinfocss/codeblock.css";

export default function CodeBlock({ code, language, styletype }) {
  const preRef = useRef(null);

  // Sanitize and highlight code based on language
  const highlightCode = useMemo(() => {
    if (!code) return "";

    let highlightedCode = code;

    if (language === "html") {
      highlightedCode = highlightedCode
        .replace(/&/g, "&amp;") // Escape HTML entities first
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        // .replace(/(&lt;[\/]?[a-zA-Z0-9]+)/g, '<span class="tag">$1</span>')
        // .replace(/([a-zA-Z-]+)=["']/g, '<span class="attribute">$1</span>="')
        // .replace(/["']([^"']*?)["']/g, '"<span class="value">$1</span>"');
    } else if (language === "css") {
      highlightedCode = highlightedCode
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/([a-zA-Z-]+):/g, '<span class="property">$1</span>:')
        .replace(/:([^;]+);/g, ':<span class="value">$1</span>;')
        .replace(/({|})/g, '<span class="bracket">$1</span>');
    }

    return highlightedCode;
  }, [code, language]);

  // Update the pre element with highlighted code
  useEffect(() => {
    if (preRef.current) {
      try {
        preRef.current.innerHTML = highlightCode || code;
      } catch (error) {
        console.error("Error highlighting code:", error);
        preRef.current.textContent = code; // Fallback to plain text
      }
    }
  }, [highlightCode, code]);

  return (
    <div className="code-block">
      <pre ref={preRef} className={`code-content ${language}`}>
        {/* Initial content as fallback */}
        {code}
      </pre>
    </div>
  );
}