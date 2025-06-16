import { useContext, useEffect, useState } from "react";
import { Context } from "../../screens/editor";
import { useLocation } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";

let findsfile=[];

 function FileView(){
    const [content,setContent]=useState("");
    const [filetype,setfiletype]=useState("");
    
    const {value}=useContext(Context)
    const {setHtmlContent}=useContext(Context)
    const {setCssContent}=useContext(Context)
    const {setJsContent}=useContext(Context)
    const{setisupdated}=useContext(Context)
    const {filename}=useContext(Context)
    const location=useLocation();
    const {data,path}=location.state;
    // console.log(data)

    useEffect(()=>{
      
        const fileTypeMap = {
            js: "text/javascript",
            html: "text/html",
            css: "text/css",
            image:"image/png/jpeg"
          };
    
        //to get the file type which is clicked
        const filetype = fileTypeMap[value];
    
        const reader = new FileReader();
        
    
        
        const findsfile = data.filter((element) => {  
          return element.name === filename; 
        
        //  else {
        //   return element.type === filetype; 
        // }
        });
        //to find if the file exists
        console.log(findsfile)
        if (findsfile.length > 0) {
          const file = findsfile[0];

         
          if (value === "image") {
              reader.onload = () => {
                  setContent(reader.result); 
              };
              reader.readAsDataURL(file); 
          } else {
              reader.onload = () => {
                  setContent(reader.result);
              };
              reader.readAsText(file); 
          }
      } else {
          setContent("No file found for the selected type.");
      }

    },[value,data,filename])
   

    
    
    
    return(
      value==="image"? <div style={{ color:"white", borderLeft:'solid',borderRight:"solid" ,height:'100vh' ,width:600}}><img src={content}></img></div>:(
        <div contentEditable suppressContentEditableWarning style={{ color:"white", borderLeft:'solid',borderRight:"solid"}}>
            <MonacoEditor
             height="100%"
             
            value={content}
            language={value}
            theme="vs-dark"
            onChange={(newValue,e) => {setContent(newValue)
              setisupdated(true);
              if(value==="js"){
                // console.log(newValue)
                setJsContent((prev)=>(
                  
                  {
                    ...prev,
                    [filename]:newValue

                }))
              }
              else if(value==='css')
              {
                setCssContent(
                  (prev)=>(
                  
                  {
                    ...prev,
                    [filename]:newValue

                })
                )
              }
              else if(value==='html')
                {
                  // console.log(newValue)
                  setHtmlContent((prev)=>(
                  {
                    ...prev,
                    [filename]:newValue
                }))
                }
            }}
            options={{
              lineNumbers: "on",
              tabSize: 2,
              minimap: { enabled: false }}}
            > </MonacoEditor>
        </div>)
    );
}
export default FileView;
