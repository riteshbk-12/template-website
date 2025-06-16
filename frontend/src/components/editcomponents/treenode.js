import { useContext, useState } from "react";
import { SlArrowDown, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Context } from "../../screens/editor";
import { useOutletContext } from "react-router-dom";

function TreeNode({name,level,nodes,style1}){
    const {setValue}=useContext(Context)
    const {setfilename}=useContext(Context)
    const [clicked,setclick]=useState({})
    function filereadhandler(e){
       
       setValue(e.target.id)
       setfilename(e.target.textContent)
       console.log(e.target.id)
    }
        return(
            <>
            {console.log(level)}
            {name.includes(".")?
            <div id={["img", "png", "jpg", "jpeg"].includes(name.split(".")[1]) ? "image" : name.split(".")[1]}  style={{color:"white",paddingLeft:`${level*15}`}} onClick={filereadhandler}>{name}</div>:
            <><div style={{paddingLeft:`${level*15}`}}>
                    <div style={{display:"flex",alignItems:"center",}} onClick={()=>{setclick((prev)=>({...prev,[name]:!prev[name]}))}}>
                        <div style={{boxSizing:15,float:"left",color:"white"}} >
                            {clicked[name]?<SlArrowDown color="white" size={15}></SlArrowDown>:<SlArrowRight color="white" size={15} fontWeight={500}></SlArrowRight>}
                        </div>
                        <div style={{color:"white"}} >
                            {name}
                        </div>
                    </div>
                </div>
                <div>
                    {clicked[name]&& Object.keys(nodes).map(key=><TreeNode key={key} level={level+1}  name={key} nodes={nodes[key]} ></TreeNode>) }
                </div>
                </>
                }
                
            </>
                )
}
export default TreeNode;