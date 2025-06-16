import { useEffect, useRef, useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import ReactDOM from "react-dom";
import { FaArrowUp, FaLightbulb, FaRobot } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { ImNewTab } from "react-icons/im";
import { RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";
import axios from "axios";
import OutputScreen from "./editcomponents/output";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = "AIzaSyCeQXPoke3I9LAzlpQpGKm5lzO3F9LuAdw";

function AIcomponent() {
    const [listening, setListening] = useState(false);
    const [userText, setUserText] = useState("");
    const [typing, setTyping] = useState(false);
    const [response, setResponse] = useState("");
    const [transcript, setTranscript] = useState("");
    const [htmlfiles, sethtmlFiles] = useState([]);
    const [reactfiles,setreactFiles]=useState([]);
    const [previousSearches, setPreviousSearches] = useState([]); // New state for previous searches
    const [aihtmldata, setAihtmldata] = useState({
        htmldata: [],
        cssdata: [],
        jsdata: [],
        jsondata: []
    });
    const [aireactdata, setAireactdata] = useState({
        htmldata: [],
        cssdata: [],
        jsdata: [],
        jsondata: []
    });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: "583", height: "100vh" });
    const divref = useRef(null);
    const recognitionRef = useRef();

    // Prompt ideas
    const promptIdeas = [
        "Create a responsive landing page with a hero section and contact form",
        "Build a product gallery with filtering options and a shopping cart",
        "Design a dashboard with user stats and interactive charts",
        "Create a blog homepage with featured posts and newsletter signup",
        "Build a restaurant menu page with categories and online ordering"
    ];

    // Handle fullscreen mode
    useEffect(() => {
        if (isFullScreen) {
            setSize({ width: `${window.innerWidth}px`, height: `${window.innerHeight}px` });
        } else {
            setSize({ width: "583", height: "100vh" });
        }
    }, [isFullScreen]);

    // Initialize speech recognition
    useEffect(() => {
        if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            console.error("Speech Recognition is not supported in this browser.");
            return;
        }

        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const recognition = recognitionRef.current;

        recognition.lang = "en-US";
        recognition.continuous = true;

        recognition.onresult = async (event) => {
            const userSpeech = event.results[0][0].transcript;
            setTranscript(userSpeech);
            const aiResponse = await getGeminiResponse(`${userSpeech}`);
            setResponse(aiResponse);
            setPreviousSearches((prev) => [...prev, userSpeech]); // Add to previous searches
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setListening(false);
        };
    }, []);

    const startVoiceRec = () => {
        if (recognitionRef.current && !listening) {
            recognitionRef.current.start();
            setListening(true);
        }
    };

    const stopVoiceRec = () => {
        if (recognitionRef.current && listening) {
            recognitionRef.current.stop();
            setListening(false);
        }
    };

    function handleTextChange(e) {
        setTyping(true);
        setUserText(e.target.value);
    }

    const getGeminiResponse = async (text) => {
        try {
            const { data } = await axios.post(`${API_URL}?key=${API_KEY}`, {
                contents: [{ parts: [{ text: `${text} ` }] }]
            }, { headers: { "Content-Type": "application/json" } });

            return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
        } catch (error) {
            console.error("API Error:", error);
            return "Sorry, something went wrong.";
        }
    };

    async function sendToAI() {
        setAihtmldata({
            htmldata: [],
            cssdata: [],
            jsdata: [],
            jsondata: []
        });
        setTyping(false);
        setAireactdata({
            htmldata: [],
            cssdata: [],
            jsdata: [],
            jsondata: []
        });

        setResponse("Generating template...");
        const aiResponse = await getGeminiResponse(`${userText} with each language separated in file`);
        setResponse(aiResponse);
        setPreviousSearches((prev) => [...prev, userText]); // Add to previous searches
        setUserText(""); // Clear input after sending
    }

    function stateToFile() {
        if (aireactdata && aihtmldata) {
            let newFiles = [];

            const fileMappings = {
                htmldata: { extension: "html", type: "text/html" },
                cssdata: { extension: "css", type: "text/css" },
                jsdata: { extension: "js", type: "text/javascript" },
                jsondata: { extension: "json", type: "application/json" },
            };

            Object.keys(aihtmldata).forEach((key) => {
                aihtmldata[key].forEach((element) => {
                    if (typeof element === "object" && element !== null) {
                        const fileName = Object.keys(element)[0];
                        const fileContent = element[fileName];

                        if (fileName && fileContent !== undefined) {
                            const { extension, type } = fileMappings[key] || { extension: "txt", type: "text/plain" };
                            const file = new File([fileContent], fileName, { type });
                            newFiles.push(file);
                        }
                    }
                });
            });

            sethtmlFiles(newFiles);
            newFiles=[]
            Object.keys(aireactdata).forEach((key) => {
                aihtmldata[key].forEach((element) => {
                    if (typeof element === "object" && element !== null) {
                        const fileName = Object.keys(element)[0];
                        const fileContent = element[fileName];

                        if (fileName && fileContent !== undefined) {
                            const { extension, type } = fileMappings[key] || { extension: "txt", type: "text/plain" };
                            const file = new File([fileContent], fileName, { type });
                            newFiles.push(file);
                        }
                    }
                });
            });
            setreactFiles(newFiles);
        }
    }

    function parseFileStructure(input) {
        const sections = input.split('**').slice(1);
        const fileMap = {};

        for (let i = 0; i < sections.length; i += 2) {
            let filename = sections[i].trim().replace(/[:]/g, "");
            filename = filename.match(/[^.\s]+(?:\.\w+)+/)?.[0] || filename;
            filename = filename.split("/").pop();
            filename = filename.replace(/^`/,"").replace(/`$/,"");

            let code = sections[i + 1]?.trim() || "";
            code = code.replace(/^```/, "").replace(/```$/, "");
            code = code.replace(/\(Optional.*?\)|Remember to replace.*|Consider error handling.*|\/\*.*?\*\//gs, "").trim();
            code = code.replace(/^\w+\n/, "");

            fileMap[filename] = code;
        }

        return fileMap;
    }

    useEffect(() => {
        const loadAIData = async () => {
            if (response) {
                let reactResponse = await getGeminiResponse(`convert it into react code ${response} and provide only html css js and json files`);
                if (reactResponse) {
                    let fileStructure = parseFileStructure(reactResponse);
                    if (fileStructure) {
                        setAireactdata((prev) => ({
                            ...prev,
                            htmldata: [...(prev.htmldata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".html"))).map((element) => ({[element]: fileStructure[element]}))],
                            cssdata: [...(prev.cssdata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".css"))).map((element) => ({[element]: fileStructure[element]}))],
                            jsdata: [...(prev.jsdata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".js") && !element.includes(".json"))).map((element) => ({[element]: fileStructure[element]}))],
                            jsondata: [...(prev.jsondata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".json"))).map((element) => ({[element]: fileStructure[element]}))],
                        }));
                    }
                }

                let fileStructure = parseFileStructure(response);
                if (fileStructure) {
                    setAihtmldata((prev) => ({
                        ...prev,
                        htmldata: [...(prev.htmldata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".html"))).map((element) => ({[element]: fileStructure[element]}))],
                        cssdata: [...(prev.cssdata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".css"))).map((element) => ({[element]: fileStructure[element]}))],
                        jsdata: [...(prev.jsdata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".js") && !element.includes(".json"))).map((element) => ({[element]: fileStructure[element]}))],
                        jsondata: [...(prev.jsondata || []), ...Object.keys(fileStructure).filter((element) => (element.includes(".json"))).map((element) => ({[element]: fileStructure[element]}))],
                    }));
                }
            }
        };

        loadAIData();
    }, [response]);

    useEffect(() => {
        if (aireactdata && aihtmldata) {
            stateToFile();
        }
    }, [aireactdata, aihtmldata]);


    useEffect(()=>{
        async function getdatafrombackend(){
            if (!reactfiles.length || !htmlfiles.length) return; // Only proceed if both have files
            const reactformData = new FormData();
            const htmlformData = new FormData();
            console.log(reactfiles)
            // Append all selected files
            reactfiles.forEach((file) => {
                reactformData.append('files', file); // 'files' matches the backend field name
            });

            try {
                const response = await axios.post('http://localhost:5000/getaireactfiles', reactformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Files uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading files:', error);
            }
            // Append all selected files
            htmlfiles.forEach((file) => {
                htmlformData.append('files', file); // 'files' matches the backend field name
            });

            try {
                const response = await axios.post('http://localhost:5000/getaihtmlfiles', htmlformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                console.log('Files uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }
        
          getdatafrombackend()
        
    },[htmlfiles,reactfiles])


    const getRandomPrompt = () => {
        return promptIdeas[Math.floor(Math.random() * promptIdeas.length)];
    };

    // Handle clicking a previous search to reuse it
    const handlePreviousSearchClick = (search) => {
        setUserText(search);
        setTyping(true);
    };

    async function sendreactfiles(){
        try{
                
                const response = await axios.get('http://localhost:5000/downloadreactfiles', {
                responseType:"blob",
                // onDownloadProgress:(event)=>{
                //     if(event.lengthComputable){
                //         const percentage=((event.loaded/event.total)*100)
                //         setprogress(percentage)
                //     }
                    
                // }
        
                });
                const blob=new Blob([response.data],{ type: 'application/zip' })
                const url=URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.style.display = 'none'; 
                link.href = url;
                link.download = 'react-template.zip';
                document.body.appendChild(link);
                link.click(); 
                document.body.removeChild(link); 
                window.URL.revokeObjectURL(url);
                }
                catch(error){
                    console.error("error in downloading",error)
                }
                finally{
                    
                }
    }
    async function sendhtmlfiles(){
        
        try{
                
                const response = await axios.get('http://localhost:5000/downloadhtmlfiles', {
                responseType:"blob",
                // onDownloadProgress:(event)=>{
                //     if(event.lengthComputable){
                //         const percentage=((event.loaded/event.total)*100)
                //         setprogress(percentage)
                //     }
                    
                // }
        
                });
                const blob=new Blob([response.data],{ type: 'application/zip' })
                const url=URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.style.display = 'none'; 
                link.href = url;
                // link.download = `${data1.name}.zip`; 
                link.download = 'html-template.zip';
                document.body.appendChild(link);
                link.click(); 
                document.body.removeChild(link); 
                window.URL.revokeObjectURL(url);
            }
            catch(error){
                console.error("error in downloading",error)
            }
            finally{
                
            }
    }
    return (
        <div style={{
            
            display: "flex",
            flexDirection: "row",
            color: "white",
            fontFamily: "Inter, system-ui, Arial, sans-serif",
            maxWidth: "100%",
            margin: "0 auto",
            height: "100vh",
            background: "url(https://www.transparenttextures.com/patterns/dark-mosaic.png) rgb(10, 10, 10)",
            overflowY:"auto",   // Enhanced background
            minHeight: "100vh",
            padding: "20px",
            boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5)",
            paddingTop:70,
        }}>
            {/* Sidebar for Previous Searches */}
            <div style={{
                width: "250px",
                backgroundColor: "#2d2d2d",
                padding: "20px",
                borderRadius: "8px",
                marginRight: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                height: "calc(100vh - 40px)",
                overflowY: "auto"
            }}>
                <h3 style={{fontSize: "16px", fontWeight: "600", marginBottom: "15px", color: "#6875f5"}}>Previous Searches</h3>
                {previousSearches.length > 0 ? (
                    previousSearches.map((search, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: "#1a1a1a",
                                padding: "10px",
                                borderRadius: "6px",
                                marginBottom: "10px",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: "rgba(255, 255, 255, 0.9)",
                                transition: "background-color 0.2s ease",
                                border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}
                            onClick={() => handlePreviousSearchClick(search)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#3b3b3b"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#1a1a1a"}
                        >
                            {search.length > 30 ? `${search.substring(0, 30)}...` : search}
                        </div>
                    ))
                ) : (
                    <p style={{fontSize: "14px", color: "rgba(255, 255, 255, 0.6)", fontStyle: "italic"}}>No previous searches yet.</p>
                )}
            </div>

            {/* Main Content */}
            <div style={{flex: 1}}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    background: "#2d2d2d",
                    padding: "15px 20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                    <FaRobot size={24} style={{marginRight: "12px", color: "#6875f5"}} />
                    <span style={{fontSize: "18px", fontWeight: "600", letterSpacing: "0.3px"}}>AI Template Generator</span>
                </div>

                {/* Description Box */}
                <div style={{
                    background: "#2d2d2d",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                        <FaLightbulb style={{marginRight: "10px", color: "#f9ca24"}} />
                        <h3 style={{margin: 0, fontWeight: "600", fontSize: "16px"}}>Generate websites with AI</h3>
                    </div>
                    <p style={{margin: "0 0 12px 0", lineHeight: "1.5", fontSize: "14px", color: "rgba(255, 255, 255, 0.8)"}}>
                        Describe the website you want to create and our AI will generate all the necessary files.
                        You can generate both HTML and React templates with a simple prompt.
                    </p>
                    <p style={{margin: "0", fontSize: "13px", fontStyle: "italic", color: "rgba(255, 255, 255, 0.6)"}}>
                        Try: "{getRandomPrompt()}"
                    </p>
                </div>

                {/* Input Box */}
                <div style={{
                    borderRadius: "8px",
                    backgroundColor: "#2d2d2d",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "14px",
                    marginBottom: "16px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                    <input
                        style={{
                            all: "unset",
                            backgroundColor: "#1a1a1a",
                            padding: "12px 16px",
                            borderRadius: "6px",
                            marginBottom: "12px",
                            color: "white",
                            fontSize: "14px",
                            width: "calc(100% - 32px)",
                            border: "1px solid rgba(255, 255, 255, 0.05)"
                        }}
                        onChange={handleTextChange}
                        value={userText}
                        placeholder="Describe the website you want to generate..."
                    />
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        padding: "4px 0"
                    }}>
                        {typing ?
                            <div
                                style={{
                                    backgroundColor: "#6875f5",
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                }}
                                onClick={sendToAI}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.backgroundColor = "#5a67d8";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.backgroundColor = "#6875f5";
                                }}
                            >
                                <FaArrowUp />
                            </div>
                            :
                            <div
                                style={{
                                    backgroundColor: "#4c1d95",
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                                }}
                                onClick={startVoiceRec}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.backgroundColor = "#6d28d9";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.backgroundColor = "#4c1d95";
                                }}
                            >
                                <MdKeyboardVoice size={22} />
                            </div>
                        }
                    </div>
                </div>

                {/* Listening Status */}
                {listening &&
                    <div style={{
                        backgroundColor: "#4c1d95",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        animation: "pulse 1.5s infinite",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                        <span style={{fontSize: "14px"}}>Listening: {transcript}</span>
                        <div
                            style={{
                                width: "26px",
                                height: "26px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "#4c1d95",
                                fontSize: "14px",
                                fontWeight: "bold"
                            }}
                            onClick={stopVoiceRec}
                        >
                            ✕
                        </div>
                    </div>
                }

                {/* Loading Indicator */}
                {response && !htmlfiles.length &&
                    <div style={{
                        backgroundColor: "#2d2d2d",
                        padding: "16px",
                        borderRadius: "8px",
                        marginBottom: "16px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                        <div style={{fontWeight: "500", marginBottom: "12px", fontSize: "14px"}}>AI is processing your request...</div>
                        <div style={{
                            width: "100%",
                            height: "4px",
                            backgroundColor: "#1a1a1a",
                            borderRadius: "2px",
                            overflow: "hidden",
                            position: "relative"
                        }}>
                            <div style={{
                                position: "absolute",
                                height: "100%",
                                width: "30%",
                                backgroundColor: "#6875f5",
                                borderRadius: "2px",
                                animation: "loading 1.5s infinite ease-in-out"
                            }}></div>
                        </div>
                    </div>
                }

                {/* Output Preview */}
                <div style={{display: "flex"}}>
                    <div style={{width: "100%"}}>
                        {htmlfiles && htmlfiles.length > 0 ? (
                            isFullScreen ? ReactDOM.createPortal(
                                <div style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    zIndex: 100000,
                                    width: size.width,
                                    height: size.height,
                                    backgroundColor: "#1a1a1a"
                                }}>
                                    <div style={{
                                        height: 36,
                                        width: "100%",
                                        backgroundColor: "#2d2d2d",
                                        display: "flex",
                                        alignItems: "center",
                                        color: "white",
                                        fontSize: 16,
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                                    }}>
                                        <TbReload
                                            style={{cursor: "pointer", marginLeft: 12, color: "#6875f5"}}
                                            onClick={() => setFiles(files)}
                                        />
                                        <div style={{
                                            marginLeft: "auto",
                                            marginRight: 12,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>
                                                <ImNewTab style={{cursor: "pointer", color: "#6875f5"}} />
                                            </div>
                                            <div style={{marginLeft: 12}}>
                                                {isFullScreen ?
                                                    <RiFullscreenExitLine
                                                        style={{cursor: "pointer", color: "#6875f5"}}
                                                        onClick={() => setIsFullScreen(false)}
                                                    /> :
                                                    <RiFullscreenFill
                                                        style={{cursor: "pointer", color: "#6875f5"}}
                                                        onClick={() => setIsFullScreen(true)}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <OutputScreen files={htmlfiles} />
                                    </div>
                                </div>,
                                document.body
                            ) :
                            <div
                                style={{
                                    width: size.width,
                                    height: size.height,
                                    transition: "width 0.1s ease-out ease-in",
                                    backgroundColor: "#1a1a1a",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)"
                                }}
                                ref={divref}
                            >
                                <div style={{
                                    height: 36,
                                    width: "100%",
                                    backgroundColor: "#2d2d2d",
                                    display: "flex",
                                    alignItems: "center",
                                    color: "white",
                                    fontSize: 16,
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                                }}>
                                    <TbReload
                                        style={{cursor: "pointer", marginLeft: 12, color: "#6875f5"}}
                                        onClick={() => setFiles(files)}
                                    />
                                    <div style={{
                                        marginLeft: "auto",
                                        marginRight: 12,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <div>
                                            <ImNewTab style={{cursor: "pointer", color: "#6875f5"}} />
                                        </div>
                                        <div style={{marginLeft: 12}}>
                                            {isFullScreen ?
                                                <RiFullscreenExitLine
                                                    style={{cursor: "pointer", color: "#6875f5"}}
                                                    onClick={() => setIsFullScreen(false)}
                                                /> :
                                                <RiFullscreenFill
                                                    style={{cursor: "pointer", color: "#6875f5"}}
                                                    onClick={() => setIsFullScreen(true)}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <OutputScreen files={htmlfiles} />
                                </div>
                            </div>
                        ) : (
                            response && <div style={{
                                backgroundColor: "#2d2d2d",
                                padding: "16px",
                                borderRadius: "8px",
                                color: "rgba(255, 255, 255, 0.7)",
                                fontStyle: "italic",
                                fontSize: "14px",
                                border: "1px solid rgba(255, 255, 255, 0.1)"
                            }}>Processing your template, please wait...</div>
                        )}
                    </div>
                </div>

                {/* Export Buttons */}
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 24
                }}>
                    <div style={{
                        cursor: "pointer",
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 140,
                        height: 38,
                        backgroundColor: "#6875f5",
                        color: "white",
                        fontWeight: "500",
                        fontSize: "14px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        transition: "all 0.2s ease",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                    }}
                    onClick={sendreactfiles} >
                        Export React
                    </div>

                    <div style={{
                        cursor: "pointer",
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 140,
                        height: 38,
                        backgroundColor: "#4c1d95",
                        color: "white",
                        fontWeight: "500",
                        fontSize: "14px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        transition: "all 0.2s ease",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                    }} 
                    onClick={sendhtmlfiles}>
                        Export HTML
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.7; }
                    100% { opacity: 1; }
                }
                
                @keyframes loading {
                    0% { left: -30%; }
                    100% { left: 100%; }
                }
            `}</style>
        </div>
    );
}

export default AIcomponent;