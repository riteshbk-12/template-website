import { useEffect, useState } from "react"
import Header from "../components/navbarcomponent/header"
import HeroSection from "../components/homecomponent/hero"
import FeaturesSection from "../components/homecomponent/featuresection"
// import TemplateCarousel from "../components/homecomponent/templatecarousel"
// import ComponentCarousel from "../components/homecomponent/componentcarousel"
// import IconCarousel from "../components/homecomponent/iconcarousel"
import Navigation from "../components/navbarcomponent/navigation"

// import AboutSection from "@/components/about-section"
// import ServicesSection from "@/components/services-section"
// import ContactSection from "@/components/contact-section"
import "../static/homepagecss/home-page.css"
import FullPageScroll from "../components/fullpagescroll"
import ComponentsShowcase from "../components/homecomponent/showcasecomponent"
import AiSection from "../components/homecomponent/aisection"
import DetailsSection from "../components/homecomponent/detailsection"

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > window.innerHeight) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  return (
    <div className="app dark">
      <Header scrolled={scrolled} home={true} />
  
      <main>
        
          <HeroSection />
        
          <FeaturesSection />
          <ComponentsShowcase/>
          <AiSection/>
          <DetailsSection/>
        {/* Template Carousel Section */}
        
      </main>
    </div>
  )
}