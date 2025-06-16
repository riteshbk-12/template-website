import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaUpload, FaCheck, FaEye } from "react-icons/fa";
import Header from "../components/navbarcomponent/header";
import ProgressBar from "../components/progressbar";

export const Context = React.createContext({ value: null, setValue: () => {} });

function Add() {
    const location = useLocation();
    const [showdandd, getvalue] = useState(false);
    const [data, setData] = useState(null);
    const [path, setpath] = useState([]);
    const [view, formview] = useState(false);
    const [formdata, setformdata] = useState({
        name: "",
        files: [],
    });
    const [clickverify, setclickverify] = useState(false);
    const [imageError, setImageError] = useState(false);

    const onDrop = (acceptedfiles) => {
        setformdata((prev) => ({
            ...prev,
            files: acceptedfiles,
        }));
        setData(acceptedfiles);
        getvalue(false);
        setpath((prevpath) => [
            ...prevpath,
            ...acceptedfiles.map((file) => ({
                name: file.name,
                path: file.path,
            })),
        ]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: ".html, .css, .js, .txt",
    });

    async function handlechange(event) {
        const { name, value } = event.target;
        setformdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function formhandler(event) {
        event.preventDefault();
        formview(false);
        console.log(data);
    }

    async function verifyhandler() {
        try {
            console.log(Array.from(formdata.files));
            const formdata1 = new FormData();
            formdata1.append("name", formdata.name);
            Array.from(formdata.files).forEach((file) => {
                formdata1.append("file", file);
            });
            formdata1.append("path", JSON.stringify(path));
            const response = await axios.post(
                "http://localhost:5000/verify-document",
                formdata1,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (error) {
            console.log("there is a problem submitting the form", error);
        } finally {
        }
        setclickverify(true);
    }

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <>
            <div
                style={{
                    filter: view ? "blur(3px)" : "none",
                    
                    background: "url('https://www.transparenttextures.com/patterns/dark-mosaic.png') rgb(10, 10, 10)",
                    backgroundBlendMode: "overlay",
                    overflowY: "auto",
                    height: "100vh",
                    minHeight: "100vh",
                    paddingBottom: "20px",
                }}
            >
                <Header home={false} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: 900,
                        width: "90%",
                        paddingTop: 80,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <div
                        style={{
                            color: "#f9fafb",
                            fontSize: "1.2rem",
                            lineHeight: "1.6",
                            fontFamily: "'Poppins', sans-serif",
                            textAlign: "center",
                            background: "rgba(17, 24, 39, 0.8)",
                            padding: "28px",
                            borderRadius: "16px",
                            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.75rem",
                                fontWeight: 700,
                                background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                display: "block",
                                marginBottom: "16px",
                                letterSpacing: "0.5px",
                            }}
                        >
                            Share Your Creativity - Contribute Website Templates
                        </span>
                        Welcome to the User-Contributed Templates section! Here, you can upload and share your own website templates with the community. Whether it's a fully designed HTML template, a dynamic React component, or a beautifully crafted UI layout, your contributions help others build amazing projects faster.
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px", textAlign: "left", paddingLeft: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ 
                                    backgroundColor: "#8b5cf6", 
                                    borderRadius: "50%", 
                                    width: "32px", 
                                    height: "32px", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center" 
                                }}>
                                    <FaUpload color="#f9fafb" size={14} />
                                </div>
                                <span style={{ color: "#f9fafb", fontWeight: 500 }}>
                                    <strong style={{ color: "#a78bfa" }}>Upload Your Template:</strong> Easily submit your website templates by uploading files or folders.
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ 
                                    backgroundColor: "#3b82f6", 
                                    borderRadius: "50%", 
                                    width: "32px", 
                                    height: "32px", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center" 
                                }}>
                                    <FaEye color="#f9fafb" size={14} />
                                </div>
                                <span style={{ color: "#f9fafb", fontWeight: 500 }}>
                                    <strong style={{ color: "#93c5fd" }}>Discover & Download:</strong> Browse templates shared by others and download them for free.
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ 
                                    backgroundColor: "#ec4899", 
                                    borderRadius: "50%", 
                                    width: "32px", 
                                    height: "32px", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center" 
                                }}>
                                    <FaCheck color="#f9fafb" size={14} />
                                </div>
                                <span style={{ color: "#f9fafb", fontWeight: 500 }}>
                                    <strong style={{ color: "#f9a8d4" }}>Get Featured:</strong> High-quality contributions may be highlighted on our homepage!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: 40,
                    }}
                >
                    <button
                        style={{
                            height: 48,
                            width: 180,
                            background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                            color: "#ffffff",
                            borderRadius: 8,
                            fontSize: 18,
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 600,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                            transition: "all 0.2s ease",
                        }}
                        onClick={() => {
                            if (formdata.name === "") getvalue(true);
                            formview(true);
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 16px rgba(139, 92, 246, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)";
                        }}
                    >
                        <FaUpload size={16} />
                        Upload Template
                    </button>

                    {view === false && formdata.name !== "" && (
                        <div
                            style={{
                                marginTop: 24,
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                width: 280,
                                borderRadius: 12,
                                background: "rgba(17, 24, 39, 0.9)",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                            }}
                        >
                            <span
                                style={{
                                    color: "#f9fafb",
                                    paddingBottom: 12,
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                }}
                            >
                                Your Project: <span style={{ color: "#a78bfa" }}>{formdata.name}</span>
                            </span>
                            <span
                                style={{
                                    color: "#f9fafb",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    marginBottom: 8,
                                }}
                            >
                                Your Folder:
                            </span>
                            <div
                                style={{
                                    color: "#f9fafb",
                                    backgroundColor: "#1f2937",
                                    paddingLeft: 16,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    height: 48,
                                    width: "100%",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: 8,
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "0.95rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <span style={{ maxWidth: "75%", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {formdata.files.length > 0 ? formdata.files[0].path.split("/")[1] : ""}
                                </span>
                                <button
                                    style={{ 
                                        cursor: "pointer", 
                                        background: "none", 
                                        border: "none",
                                        padding: "8px 12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onClick={() => getvalue(true)}
                                >
                                    <RxCross2 size={20} color="#f9fafb" />
                                </button>
                            </div>
                        </div>
                    )}

                    {clickverify && <ProgressBar />}

                    <div
                        style={{
                            display: "flex",
                            marginTop: 32,
                            justifyContent: "center",
                            gap: "24px",
                        }}
                    >
                        <Link
                            style={{
                                textDecoration: "none",
                            }}
                            to={{ pathname: "/editor" }}
                            state={{ path, data }}
                        >
                            <button
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#ffffff",
                                    background: "linear-gradient(90deg, #6366f1, #2563eb)",
                                    height: 44,
                                    width: 130,
                                    borderRadius: 8,
                                    border: "none",
                                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                                    transition: "all 0.2s ease",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = "translateY(-2px)";
                                    e.target.style.boxShadow = "0 6px 16px rgba(99, 102, 241, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = "translateY(0)";
                                    e.target.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.3)";
                                }}
                            >
                                <FaEye size={16} />
                                Check Files
                            </button>
                        </Link>
                        <button
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "8px",
                                color: "#ffffff",
                                background: "linear-gradient(90deg, #8b5cf6, #6366f1)",
                                height: 44,
                                width: 130,
                                borderRadius: 8,
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                                transition: "all 0.2s ease",
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 600,
                                fontSize: "1rem",
                            }}
                            onClick={verifyhandler}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 16px rgba(139, 92, 246, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)";
                            }}
                        >
                            <FaCheck size={16} />
                            Verify
                        </button>
                    </div>

                    {location?.state?.image && clickverify === false && (
                        <div
                            style={{
                                color: "#f9fafb",
                                marginTop: 24,
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "1.1rem",
                                fontWeight: 500,
                                textAlign: "center",
                                background: "rgba(59, 130, 246, 0.1)",
                                padding: "12px 24px",
                                borderRadius: "8px",
                                border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                        >
                            Send to verify the documents
                        </div>
                    )}
                    {location?.state?.image && (
                        <div style={{ marginTop: 24, width: "100%", maxWidth: 480 }}>
                            <span
                                style={{
                                    color: "#f9fafb",
                                    display: "block",
                                    marginBottom: 12,
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "1.2rem",
                                    fontWeight: 600,
                                    textAlign: "center",
                                }}
                            >
                                Your Template Preview
                            </span>
                            <div 
                                style={{ 
                                    height: 320,
                                    width: "100%",
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                {!imageError ? (
                                    <img
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            objectFit: "cover",
                                        }}
                                        src={location.state.image}
                                        alt="template"
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            backgroundColor: "#1f2937",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#f9fafb",
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Image could not be loaded
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for form */}
            {view && (
                <>
                    {/* Modal overlay */}
                    <div 
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            zIndex: 999,
                        }}
                        onClick={() => formview(false)}
                    />
                    
                    {/* Modal content */}
                    <div
                        style={{
                            display: "flex",
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#1f2937",
                            padding: "28px",
                            borderRadius: "12px",
                            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                            zIndex: 1000,
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            width: "90%",
                            maxWidth: "400px",
                        }}
                    >
                        <form onSubmit={formhandler} style={{ width: "100%" }}>
                            <h3 style={{
                                color: "#f9fafb",
                                fontSize: 18,
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 600,
                                marginTop: 0,
                                marginBottom: 16,
                                textAlign: "center",
                            }}>
                                Add New Template
                            </h3>
                            
                            <div style={{ marginBottom: 20 }}>
                                <label
                                    style={{
                                        color: "#f9fafb",
                                        fontSize: 15,
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 600,
                                        display: "block",
                                        marginBottom: 8,
                                    }}
                                    htmlFor="name"
                                >
                                    Project Name:
                                </label>
                                <input
                                    type="text"
                                    value={formdata.name}
                                    id="name"
                                    name="name"
                                    onChange={handlechange}
                                    placeholder="Enter project name"
                                    style={{
                                        backgroundColor: "#111827",
                                        color: "#f9fafb",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: 8,
                                        padding: "12px 16px",
                                        width: "100%",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "0.95rem",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            {showdandd ? (
                                <div
                                    {...getRootProps()}
                                    style={{
                                        marginBottom: 24,
                                        width: "100%",
                                        height: "160px",
                                        border: "2px dashed rgba(139, 92, 246, 0.5)",
                                        borderRadius: "8px",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "20px",
                                        backgroundColor: "#111827",
                                        color: "#f9fafb",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "0.95rem",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.borderColor = "rgba(139, 92, 246, 0.8)";
                                        e.target.style.backgroundColor = "rgba(17, 24, 39, 0.8)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                                        e.target.style.backgroundColor = "#111827";
                                    }}
                                >
                                    <input {...getInputProps()} webkitdirectory directory />
                                    <FaUpload size={24} color="#8b5cf6" style={{ marginBottom: 12 }} />
                                    <p>Drag & Drop a folder here, or click to select files</p>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 16px",
                                        marginBottom: 24,
                                        width: "100%",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: 8,
                                        backgroundColor: "#111827",
                                        color: "#f9fafb",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "0.95rem",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <span style={{ 
                                        overflow: "hidden", 
                                        textOverflow: "ellipsis", 
                                        whiteSpace: "nowrap",
                                        maxWidth: "80%" 
                                    }}>
                                        {formdata.files.length > 0 ? formdata.files[0].path.split("/")[1] : ""}
                                    </span>
                                    <button
                                        style={{ 
                                            cursor: "pointer", 
                                            background: "none", 
                                            border: "none",
                                            padding: "4px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            getvalue(true);
                                        }}
                                        type="button"
                                    >
                                        <RxCross2 size={20} color="#f9fafb" />
                                    </button>
                                </div>
                            )}
                            
                            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                                <button
                                    style={{
                                        background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        height: 40,
                                        width: 120,
                                        borderRadius: 8,
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "0.95rem",
                                        boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                                        transition: "all 0.2s ease",
                                        cursor: "pointer",
                                    }}
                                    type="submit"
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = "translateY(-2px)";
                                        e.target.style.boxShadow = "0 6px 16px rgba(139, 92, 246, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = "translateY(0)";
                                        e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)";
                                    }}
                                >
                                    <FaCheck size={14} />
                                    Submit
                                </button>
                                <button
                                    style={{
                                        background: "rgba(255, 255, 255, 0.1)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 40,
                                        width: 120,
                                        borderRadius: 8,
                                        color: "#f9fafb",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 600,
                                        fontSize: "0.95rem",
                                        transition: "all 0.2s ease",
                                        cursor: "pointer",
                                    }}
                                    type="button"
                                    onClick={() => formview(false)}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = "rgba(255, 255, 255, 0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = "rgba(255, 255, 255, 0.1)";
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}

export default Add;

