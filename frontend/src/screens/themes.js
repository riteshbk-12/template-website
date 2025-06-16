import NavBar from "../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Para from "../components/para";
import { Link } from "react-router-dom";
import Header from "../components/navbarcomponent/header";

function Themes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="themes-container">
      <Header />
      
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading themes...</p>
        </div>
      ) : (
        <div className="themes-grid">
          {data && data.length > 0 ? (
            data.map((element, index) => (
              <div className="theme-card" key={index}>
                <motion.div
                  whileHover="hover"
                  initial="initial"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.00, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" },
                  }}
                  className="image-container"
                >
                  <img
                    className="theme-image"
                    src={element.image_url}
                    alt={element.name}
                  />
                  <Link
                    to={{ pathname: "/themes/template_info" }}
                    state={{ data: { name: element.name, url: element.image_url } }}
                  >
                    <motion.button
                      className="info-button"
                      variants={{
                        initial: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: 0 },
                      }}
                    >
                      More Info
                    </motion.button>
                  </Link>
                </motion.div>
                <Para
                  text={element.name}
                  style1={{ 
                    color: "white", 
                    marginTop: 16, 
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "18px"
                  }}
                />
              </div>
            ))
          ) : (
            <div className="no-data">No themes available</div>
          )}
        </div>
      )}
      
      <style jsx>{`
      
        .themes-container {
          background: url(https://www.transparenttextures.com/patterns/dark-mosaic.png) rgb(10, 10, 10);
          overflow-y: auto;
          height: 100vh;
          background-color: #121212;
          padding-bottom: 40px;
          padding-top: 30px;
        }
        
        .themes-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 50px 20px;
          gap: 40px;
        }
        
        .theme-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .image-container {
          position: relative;
          height: 350px;
          width: 550px;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .theme-image {
          height: 100%;
          width: 100%;
          border-radius: 8px;
          object-fit: cover;
          transition: all 0.3s ease;
        }
        
        .info-button {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          height: 50px;
          width: 150px;
          background-color: #ee0202;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: white;
          font-size: 16px;
          font-weight: 600;
          opacity: 0;
          z-index: 1;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .info-button:hover {
          background-color: #ff1a1a;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70vh;
          color: white;
        }
        
        .loader {
          border: 5px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top: 5px solid #ee0202;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .no-data {
          color: white;
          font-size: 20px;
          text-align: center;
          padding: 100px 0;
        }
        
        @media (max-width: 768px) {
          .image-container {
            height: 250px;
            width: 100%;
            max-width: 450px;
          }
          
          .themes-grid {
            padding: 30px 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default Themes;