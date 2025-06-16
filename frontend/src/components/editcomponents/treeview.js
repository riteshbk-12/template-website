import { color } from "motion/react";
import { useContext, useState } from "react";
import { SlArrowDown, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "../../static/edit.css"
import { useLocation } from "react-router-dom";
import { Context } from "../../screens/editor";

let findsfile=[];
let findpfile=[];
let findstfile=[];
let findifile=[];
function TreeView({fields}){
    const location=useLocation();
    const data= location.state;
    console.log(data)
    const [s_cliked,sets_click]=useState(false)
    const [p_cliked,setp_click]=useState(false)
    const [st_cliked,setst_click]=useState(false)
    const [i_cliked,seti_click]=useState(false)
    const [showsfile,setshowsfile]=useState(false)
    const [showpfile,setshowpfile]=useState(false)
    const [showstfile,setshowstfile]=useState(false)
    const [showifile,setshowifile]=useState(false)
    const {setValue}=useContext(Context)
    const {setfilename}=useContext(Context)
    function filereadhandler(e){
       
       setValue(e.target.id)
       setfilename(e.target.textContent)
       console.log(e.target.textContent)
    }
    return(
    <>
    <div className="treeview">
        {/* src files */}
        <div style={{display:"flex",alignItems:"center",padding:5}}>
            <div style={{boxSizing:15,float:"left",color:"white"}} onClick={()=>{s_cliked?sets_click(false):sets_click(true)
            showsfile?setshowsfile(false):setshowsfile(true)
            findsfile= data.filter((element)=>
                element.type==="text/javascript"
            )
            console.log(findsfile)
            }}>
                
                {s_cliked?<SlArrowDown color="white" size={20}></SlArrowDown>:<SlArrowRight color="white" size={20} fontWeight={500} />}
            </div>
            <div style={{color:"white"}}>
                src
            </div>
            <div style={{color:"white",paddingLeft:20}} id="js" onClick={filereadhandler}>
                {showsfile?
                findsfile.length>0?
                findsfile[0].name:null
                :null}
                
            </div>
        </div>
        {/* public files */}
        <div style={{alignItems:"center",padding:5}}>
            <div style={{boxSizing:15,float:"left"}} onClick={()=>{p_cliked?setp_click(false):setp_click(true)
            showpfile?setshowpfile(false):setshowpfile(true)
            findpfile= data.filter((element)=>
                element.type==="text/html"
            )}}>
                
                {p_cliked?<SlArrowDown color="white" size={20}></SlArrowDown>:<SlArrowRight color="white" size={20} fontWeight={500} />}
            </div>
            <div style={{color:"white"}}>
                public
            </div>
            <div style={{color:"white",paddingLeft:20}} id="html" onClick={filereadhandler}>
                {showpfile?findpfile.length>0?
                findpfile[0].name:null:null}
            </div>
        </div>
        {/*static files  */}
        <div style={{alignItems:"center",padding:5}}>
            <div style={{boxSizing:15,float:"left"}} onClick={()=>{st_cliked?setst_click(false):setst_click(true)
            showstfile?setshowstfile(false):setshowstfile(true)
            findstfile= data.filter((element)=>
                element.type==="text/css"
            
            )}}>
                
                {st_cliked?<SlArrowDown color="white" size={20}></SlArrowDown>:<SlArrowRight color="white" size={20} fontWeight={500} />}
            </div>
            <div style={{color:"white"}}>
                static
            </div>
            <div style={{color:"white",paddingLeft:20}} id="css" onClick={filereadhandler}>
                {showstfile?findstfile.length>0?
                findstfile[0].name:null:null}
            </div>
        </div>
        {/* images files */}
        <div style={{alignItems:"center",padding:5}}>
            <div style={{boxSizing:15,float:"left"}} onClick={()=>{i_cliked?seti_click(false):seti_click(true)
            showifile?setshowifile(false):setshowifile(true)
            
            findifile= data.filter((element)=>element.type==="image/png")
            console.log(findifile.url)
            }
            
            }>
                
                {i_cliked?<SlArrowDown color="white" size={20}></SlArrowDown>:<SlArrowRight color="white" size={20} fontWeight={500} />}
            </div>
            <div style={{color:"white"}}>
                images
            </div>
            <div style={{color:"white",paddingLeft:20}} >
                {showifile?findifile.length>0?
                findifile.map((element) => <><div id="image" key={element.name} onClick={filereadhandler}>{element.name}</div></>):null:null}
            </div>
        </div>
    </div>
    </>
    )
}
export default TreeView;