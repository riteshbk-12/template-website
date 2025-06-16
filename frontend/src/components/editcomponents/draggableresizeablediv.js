import React, { useState, useRef } from "react";

const ResizableDiv = ({style}) => {
  const [width, setWidth] = useState(600); // Initial width
  const [left, setLeft] = useState(100); // Initial left position
  const isResizing = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isResizing.current = true;

    const startX = e.clientX;
    const startWidth = width;
    const startLeft = left;

    const handleMouseMove = (moveEvent) => {
      if (!isResizing.current) return;

      const deltaX = moveEvent.clientX - startX;
      const newWidth = startWidth - deltaX;
      const newLeft = startLeft + deltaX;

      if (newWidth >= 600) {
        setWidth(newWidth);
        setLeft(newLeft);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{...style,
        width: `${width}px`,
         // Fixed height
        
        
        
        left: `${left}px`,
        
        
        userSelect: "none",
      }}
    >
      
      <div
        style={{
          width: "1px",
          height: "100%",
          background: "white",
          position: "absolute",
          left: "0",
          top: "0",
          cursor: "ew-resize",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ResizableDiv;
