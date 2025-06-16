import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useRef, useState, useEffect } from "react";
import FileView from "../components/editcomponents/fileview";
import TreeView1 from "../components/editcomponents/treeview1";
import OutputScreen from "../components/editcomponents/output";
import { TbReload } from "react-icons/tb";
import { ImNewTab } from "react-icons/im";
import { RiDoorClosedFill, RiFullscreenFill } from "react-icons/ri";
import { RiFullscreenExitLine } from "react-icons/ri";

export const Context = React.createContext({ value: null, setValue: () => {} });

function Editor() {
    const navigate = useNavigate();
    const location = useLocation();
    const { path, data, source } = location.state || {};

    // State management
    const [isupdated, setisupdated] = useState(false);
    const [htmlContent, setHtmlContent] = useState({});
    const [cssContent, setCssContent] = useState({});
    const [jsContent, setJsContent] = useState({});
    const [value, setValue] = useState(null);
    const [clicked, setclick] = useState(false);
    const [image, setImageData] = useState();
    const [filename, setfilename] = useState("");
    const [submit, setsubmit] = useState(false);
    const [capture, setcapture] = useState(false);
    const [isFullScreen, setisFullScreen] = useState(false);
    const [Size, setSize] = useState({ width: "583", height: "100vh" });

    // Refs
    const containerRef = useRef(null);
    const divref = useRef(null);
    const [layout, setLayout] = useState({
        treeViewWidth: 200,
        fileViewWidth: 583,
        outputWidth: 583,
    });

    // Handle fullscreen mode
    useEffect(() => {
        const handleToggleFullScreen = () => {
            if (isFullScreen) {
                setSize({ width: `${window.innerWidth}px`, height: `${window.innerHeight}px` });
            } else {
                setSize({ width: "583", height: "100vh" });
            }
        };
        handleToggleFullScreen();
    }, [isFullScreen]);

    const handleSubmit = async () => {
        setsubmit(true);
        navigate("/add", { state: { image } });
    };

    const handleBack = () => {
        navigate("/admin");
    };

    return (
        <div 
            className="editor-container" 
            ref={containerRef} 
            style={{ 
                height: "100vh", 
                display: "flex", 
                flexDirection: "column",
                backgroundColor: "#1e1e1e", // Dark background
                color: "#ffffff" // Light text
            }}
        >
            <div 
                className="header" 
                style={{ 
                    width: "100%", 
                    height: 50, 
                    backgroundColor: "#2d2d2d", // Darker header
                    borderBottom: "1px solid #404040",
                    display: "flex", 
                    alignItems: "center", 
                    padding: "0 20px",
                    position: "fixed", // Fix header to top
                    top: 0,
                    zIndex: 100, // Ensure it stays on top
                }}
            >
                <button 
                    className="run-button" 
                    style={{ 
                        height: 40, 
                        width: 60, 
                        backgroundColor: "#4CAF50", // Green for run button
                        color: "white", 
                        borderRadius: 4, 
                        cursor: "pointer",
                        border: "none",
                        transition: "background-color 0.2s",
                    }}
                    onClick={() => setclick(true)}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
                >
                    Run
                </button>
                {source ? (
                    <button 
                        className="nav-button" 
                        style={{ 
                            marginLeft: "auto", 
                            height: 40, 
                            width: 80, 
                            backgroundColor: "#555555",
                            color: "white", 
                            borderRadius: 4, 
                            cursor: "pointer",
                            border: "none",
                            transition: "background-color 0.2s",
                        }}
                        onClick={handleBack}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#666666"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#555555"}
                    >
                        Back
                    </button>
                ) : (
                    <button 
                        className="nav-button" 
                        style={{ 
                            marginLeft: "auto", 
                            height: 40, 
                            width: 80, 
                            backgroundColor: "#555555",
                            color: "white", 
                            borderRadius: 4, 
                            cursor: "pointer",
                            border: "none",
                            transition: "background-color 0.2s",
                        }}
                        onClick={handleSubmit}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#666666"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#555555"}
                    >
                        Submit
                    </button>
                )}
            </div>

            <div style={{ 
                display: "flex", 
                height: "calc(100vh - 50px)", 
                backgroundColor: "#252526",
                marginTop: "50px" // Add top margin to account for fixed header
            }}>
                <Context.Provider value={{ 
                    capture, setcapture, image, setImageData, submit, setsubmit, 
                    value, setValue, clicked, setclick, filename, setfilename, 
                    htmlContent, cssContent, jsContent, setCssContent, setHtmlContent, 
                    setJsContent, isupdated, setisupdated 
                }}>
                    <div style={{ 
                        width: `${layout.treeViewWidth}px`,
                        position: "fixed", // Fix TreeView to the left side
                        left: 0,
                        top: "50px", // Below the fixed header
                        height: "calc(100vh - 50px)",
                        backgroundColor: "#1e1e1e",
                        borderRight: "1px solid #404040",
                        overflowY: "auto", // Enable vertical scrolling for content overflow
                        overflowX: "hidden" // Hide horizontal scrollbar
                    }}>
                        <TreeView1 data={data} filepath={path} />
                    </div>
                    <div style={{ 
                        width: `${layout.fileViewWidth}px`, 
                        position: "fixed", // Fix FileView component
                        left: `${layout.treeViewWidth}px`, // Position after TreeView
                        top: "50px", // Below the fixed header
                        height: "calc(100vh - 50px)",
                        transition: "width 0.1s ease-out",
                        backgroundColor: "#1e1e1e",
                        borderRight: "1px solid #404040",
                        overflowY: "auto", // Enable vertical scrolling for content overflow
                        overflowX: "hidden" // Hide horizontal scrollbar
                    }}>
                        <FileView func={handleSubmit} />
                    </div>
                    <div 
                        style={isFullScreen ? {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 9999,
                            width: Size.width,
                            height: Size.height,
                            backgroundColor: "#252526"
                        } : { 
                            position: "fixed", // Fix the output component
                            left: `${layout.treeViewWidth + layout.fileViewWidth}px`, // Position after TreeView and FileView
                            top: "50px", // Below the fixed header
                            width: Size.width,
                            height: "calc(100vh - 50px)", 
                            transition: "width 0.1s ease-out",
                            backgroundColor: "#252526",
                            overflowX: "hidden" // Hide horizontal scrollbar
                        }} 
                        ref={divref}
                    >
                        <div style={{
                            height: 30,
                            width: "100%",
                            backgroundColor: "#333333",
                            display: "flex",
                            alignItems: "center",
                            color: "#ffffff",
                            fontSize: 20,
                            borderBottom: "1px solid #404040",
                            position: "sticky", // Make the output header sticky
                            top: 0,
                            zIndex: 10 // Ensure it stays above the output content
                        }}>
                            <TbReload 
                                style={{ 
                                    cursor: "pointer", 
                                    marginLeft: 10,
                                    color: "#cccccc",
                                    transition: "color 0.2s"
                                }}
                                onClick={() => setclick(true)}
                                onMouseOver={(e) => e.target.style.color = "#ffffff"}
                                onMouseOut={(e) => e.target.style.color = "#cccccc"}
                            />
                            <div style={{ 
                                marginLeft: "auto", 
                                marginRight: 10, 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "space-between",
                                gap: "15px"
                            }}>
                                <div>
                                    <ImNewTab 
                                        style={{ 
                                            cursor: "pointer",
                                            color: "#cccccc",
                                            transition: "color 0.2s"
                                        }}
                                        onMouseOver={(e) => e.target.style.color = "#ffffff"}
                                        onMouseOut={(e) => e.target.style.color = "#cccccc"}
                                    />
                                </div>
                                <div>
                                    {isFullScreen ? 
                                        <RiFullscreenExitLine 
                                            style={{ 
                                                cursor: "pointer",
                                                color: "#cccccc",
                                                transition: "color 0.2s"
                                            }}
                                            onClick={() => setisFullScreen(false)}
                                            onMouseOver={(e) => e.target.style.color = "#ffffff"}
                                            onMouseOut={(e) => e.target.style.color = "#cccccc"}
                                        /> : 
                                        <RiFullscreenFill 
                                            style={{ 
                                                cursor: "pointer",
                                                color: "#cccccc",
                                                transition: "color 0.2s"
                                            }}
                                            onClick={() => setisFullScreen(true)}
                                            onMouseOver={(e) => e.target.style.color = "#ffffff"}
                                            onMouseOut={(e) => e.target.style.color = "#cccccc"}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{
                            height: "calc(100% - 30px)", // Subtract the height of the output header
                            overflowY: "auto", // Enable vertical scrolling for content overflow
                            overflowX: "hidden" // Hide horizontal scrollbar
                        }}>
                            <OutputScreen />
                        </div>
                    </div>
                </Context.Provider>
            </div>
        </div>
    );
}

export default Editor;