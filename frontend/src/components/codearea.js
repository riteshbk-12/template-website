import { LuClipboardCopy } from "react-icons/lu";

function CodeArea({code,style}){

    return(
           <div style={{
            ...style,
            display: "flex",
            alignItems: "center",
            height: "auto",  // Changed to auto to accommodate dynamic content
            minHeight: 80,   // Ensures at least the default height
            width: 350,
            backgroundColor: "#212121", // Removed extra space in color
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden" // Prevents content from leaking out
        }}>
            {/* Code Display (Scrollable if needed) */}
            <div style={{
                flex: 1,  // Makes sure the div takes up remaining space
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "200px",
                maxWidth: "100%", // Ensures it stays inside the container
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                padding: "5px"
            }}>
                <pre style={{ margin: 0 }}>
                    <code>{code}</code>
                </pre>
            </div>

            {/* Copy Icon */}
            <LuClipboardCopy 
                size={20} 
                style={{ cursor: "pointer", marginLeft: 10 }} 
                onClick={() => navigator.clipboard.writeText(code)} 
            />
        </div>
                    );
}
export default CodeArea;