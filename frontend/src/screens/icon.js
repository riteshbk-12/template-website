import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import axios from "axios";
import parse from "react-html-parser";
import Modal from "../components/modal";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import Header from "../components/navbarcomponent/header";

function Icon() {
  const [IconsData, setIconsData] = useState([]);
  const [reactIconsData, setReactIconsData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [IconsState, setIconsState] = useState({});
  const [activeIconType, setActiveIconType] = useState("html"); // Default to html icons
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/icondata-html")
      .then((response) => {
        setIconsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      
    axios
      .get("http://localhost:5000/icondata-react")
      .then((response) => {
        setReactIconsData(response.data);
        // console.log(response.data);
        const newIconsState = {};
        response.data.forEach((element) => {
          let IconComponent = 
            element.importcode.includes("react-icons/ai")
              ? AiIcons[element.name.split("/")[1]]
              : BsIcons[element.name.split("/")[1]];
          // console.log(IconComponent);
          newIconsState[element.id] = IconComponent || null;
        });
        setIconsState((prev) => ({ ...prev, ...newIconsState }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  // Toggle switch handler
  const handleToggleChange = (type) => {
    setActiveIconType(type);
  };
  
  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <Header />
      
      {/* Info Section */}
      <div 
        style={{
          padding: "30px 50px",
          backgroundColor: "#1e1e1e",
          paddingTop: "80px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#e0e0e0"
        }}
      >
        <h1 style={{ color: "#ffffff", marginBottom: "15px" }}>Icon Library</h1>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.6", 
          maxWidth: "800px", 
          margin: "0 auto",
          color: "#b0b0b0" 
        }}>
          Browse our collection of high-quality icons for your projects. Click on any icon to view 
          details and usage information. Our library is regularly updated with new designs.
          You can use these icons in your web, mobile, or desktop applications.
        </p>
      </div>
      
      {/* Icon Type Toggle */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#1a1a1a",
        borderBottom: "1px solid #333"
      }}>
        <div style={{
          display: "flex",
          backgroundColor: "#272727",
          borderRadius: "30px",
          padding: "5px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          border: "1px solid #333333",
        }}>
          <button
            onClick={() => handleToggleChange("html")}
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s, color 0.3s",
              backgroundColor: activeIconType === "html" ? "#4a4a4a" : "transparent",
              color: activeIconType === "html" ? "#ffffff" : "#888888",
            }}
          >
            HTML Icons
          </button>
          <button
            onClick={() => handleToggleChange("react")}
            style={{
              padding: "10px 20px",
              borderRadius: "25px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s, color 0.3s",
              backgroundColor: activeIconType === "react" ? "#4a4a4a" : "transparent",
              color: activeIconType === "react" ? "#ffffff" : "#888888",
            }}
          >
            React Icons
          </button>
        </div>
      </div>
      
      {/* Backdrop */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(3px)",
            zIndex: 99,
          }}
          onClick={() => setShowModal(false)}
        />
      )}
      
      {/* Modal */}
      {showModal && <Modal data={modalData} icondata={activeIconType} showModal={setShowModal} />}
      
      {/* Icons Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "40px",
          justifyContent: "center",
          backgroundColor: "#121212"
        }}
      >
        {/* Conditionally render based on active icon type */}
        {activeIconType === "html" && IconsData.map((element) => (
          <div
            key={element.id}
            style={{
              margin: "20px",
              fontSize: "50px",
              color: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "110px",
              width: "110px",
              borderRadius: "12px",
              background: "#272727",
              boxShadow: "0 8px 12px rgba(0,0,0,0.4)",
              border: "1px solid #333333",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
              position: "relative",
              overflow: "hidden"
            }}
            onClick={() => {
              setModalData(element);
              setShowModal(true);
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.6)";
              e.currentTarget.style.backgroundColor = "#323232";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.4)";
              e.currentTarget.style.backgroundColor = "#272727";
            }}
          >
            <div style={{ transform: "scale(1.2)" }}>
              {parse(element.itag)}
            </div>
          </div>
        ))}
        
        {activeIconType === "react" && reactIconsData.map((element) => {
          // console.log(IconsState[element.id]);
          const Icon = IconsState[element.id];
          return (
            <div
              key={element.id}
              style={{
                margin: "20px",
                fontSize: "50px",
                color: "#ffffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "110px",
                width: "110px",
                borderRadius: "12px",
                background: "#272727",
                boxShadow: "0 8px 12px rgba(0,0,0,0.4)",
                border: "1px solid #333333",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
                position: "relative",
                overflow: "hidden"
              }}
              onClick={() => {
                element["icon"]=Icon;
                setModalData(element);
                setShowModal(true);
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.6)";
                e.currentTarget.style.backgroundColor = "#323232";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.4)";
                e.currentTarget.style.backgroundColor = "#272727";
              }}
            >
              <div style={{ transform: "scale(1.2)" }}>
                {Icon ? <Icon /> : 
                  <div style={{fontSize: "14px", textAlign: "center", color: "#ff6b6b"}}>
                    Icon Not Found
                  </div>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Icon;