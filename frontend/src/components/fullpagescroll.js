import { useEffect, useState, Children } from "react";

export default function FullPageScroll({ children }) {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = Children.toArray(children);
  const [scrollY, setScrollY] = useState(0);
  const scrollThreshold = 50; // Adjust this threshold for better control

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = (event) => {
      event.preventDefault();
      const delta = event.deltaY;

      // Accumulate scroll values
      lastScroll += delta;

      if (Math.abs(lastScroll) >= scrollThreshold) {
        if (delta > 0 && currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
        } else if (delta < 0 && currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
        }
        lastScroll = 0; // Reset scroll accumulation
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentSection, sections.length]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {sections.map((child, index) => (
        <div
          key={index}
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            transition: "transform 0.6s ease-in-out",
            transform: `translateY(${(index - currentSection) * 100}vh)`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
