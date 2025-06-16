import { RxCross2 } from "react-icons/rx";
import parse from "react-html-parser"
import { blacklist } from "validator";
import "../static/main.css"
import CodeArea from "./codearea";
function Modal({data,showModal,style,icondata}){
    console.log(data)
    return(
        <div style={{
            ...style,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "fixed",
            zIndex: 100,
            top: "10%",
            height: "90vh",
            width: 500,
            background: "#2c2c2c",
            right: 0,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.3)"
        }}>
            {/* Title and Close Button */}
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{display:"flex", flexDirection:"column", color: "white", fontSize: 25 }}>
                    {icondata==="react"?<span>{data.name}</span>:<><span>{data.name}</span>
                    <span style={{fontSize:15}}>Category: {data.category}</span></>}
                </div>

                <RxCross2 color="white" size={25} style={{ cursor: "pointer" }} onClick={() => showModal(false)} />
            </div>
            
            {/* Icon Preview */}
            <div style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "500px",
                backgroundColor: "#f5f5dc",
                color: "black",
                fontSize: "200px",
                borderRadius: "8px",
                margin: "20px 0"
            }}>
                {icondata==="react"?<data.icon/>:parse(data.itag)}
                {console.log(data.icon)}
            </div>
            
            {/* Code Display - Font */}
            <div style={{
                fontSize: "18px",
                color: "white",
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px"
            }}>
                {icondata==="react"?<span>import it using</span>:<span>Using icon font</span>}
                <CodeArea style={{ marginTop: 10 }} code={icondata==="react"?data.importcode:data.itag} />
            </div>
            
            {/* Code Display - SVG */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center", fontSize: "18px", color: "white", width: "100%" }}>
                {icondata==="react"?<span>add this tag in your code</span>:<span>Add icon using HTML</span>}
                <CodeArea style={{marginTop:10}} code={icondata==="react"?data.usagecode:data.svgcode} />
            </div>
        </div>
    )
}
export default Modal;