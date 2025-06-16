import { color } from "motion/react";
import { useContext, useState } from "react";
import { SlArrowDown, SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "../../static/edit.css"
import { useLocation } from "react-router-dom";
import { Context } from "../../screens/editor";
import TreeNode from "./treenode";

function TreeView1({data,filepath,className,style}){
    const directories={}
    // const location = useLocation();
    // const [path] = location.state;
    // const{data} = useContext(Context)
    const [clicked,setclick]=useState(false)
    const [clicked2ndstates,setclicked2nstates]=useState({})
    console.log(filepath[2].path)
    const separatedfile=filepath.map((file)=>(file.path.split("/")))
    // console.log(separatedfile[1][3])
    let comvalue=0;
    var tempval=new Array();
    let tree;
    let maindirectory=[];
    let com=0;
    const seen1 = new Set();
    const seen2 = new Set();
    const common1 = new Set();
    const common2 = new Set();
    const seen3 = new Set();
    const common3 = new Set();

    const buildTree = (files) => {
    const tree = {};
    files.forEach((file) => {
        const parts = file.path.split("/").filter(part => part.trim() !== "");
        parts.reduce((acc, part, idx) => {
            if (!acc[part]) {
                acc[part] = idx === parts.length - 1 ? null : {};
            }
            return acc[part];
        }, tree);
    });
    return tree;
    };
    const treeData = buildTree(filepath);

    // for(let i=0;i<separatedfile.length;i++){
    //     for(let j=1;j<separatedfile[i].length;j++){


    //     if( j===1){
            
    //         // console.log("first elif")
    //         tempval.push({"1":separatedfile[i][j]})
    //         // console.log(tempval)
    //         maindirectory.push(separatedfile[i][j])
    //         comvalue++
    //         if(seen3.has(separatedfile[i][j])){
    //                 common3.add(separatedfile)
    //             }
    //             else{
    //                 if(separatedfile[i][j].includes(".")){
                        
    //                 }
    //                 else{seen3.add(separatedfile[i][j])}
                    
    //             }
    //         if(comvalue===separatedfile.length ){
    //             console.log(comvalue)
    //             directories["1"] = directories["1"] || [];
    //             directories["1"].push(...Array.from(seen3));
    //             tempval=[];
    //             comvalue=0;
    //         }}
    //     else if(j===2){
    //         console.log(j)
            
    //         if(seen1.has(separatedfile[i][j])){
    //             common1.add(separatedfile)
    //         }
    //         else{
    //             if(separatedfile[i][j].includes(".")){
                    
    //             }
    //             else{
    //             seen1.add(separatedfile[i][j])}
    //         }
        
    //         if(separatedfile[i][j]===separatedfile[separatedfile.length-1][2]){
                
    //             directories["2"] = directories["2"] || [];
    //             directories["2"].push(...Array.from(seen1));
    //         }
            
            
    //     }
    //     else if(j===3){
            
            
            
    //         // console.log(maindirectory,separatedfile[i][j-1])
            
    //         // console.log(separatedfile[i][j-1])
                
            
    //         // if(separatedfile[i][j].includes("."))
    //         // {
    //         //     com++
    //         //     continue;
    //         // }
    //         // else{
    //             com++
                
    //             if(seen2.has(separatedfile[i][j])){
    //                 common2.add(separatedfile)
    //             }
    //             else{
    //                 if(separatedfile[i][j].includes(".")){
                        
    //                 }
    //                 else{seen2.add(separatedfile[i][j])}
                    
    //             }
    //             // console.log("total=",separatedfile[i][j],separatedfile[separatedfile.length-1][3])
    //             if(separatedfile[i][j]===separatedfile[separatedfile.length-1][3]){
                    
    //                 directories["3"] = directories["3"] || [];
    //                 directories["3"].push(...Array.from(seen2));
    //             }
                
    //         // }
    //     }
    //     // else{
    //     //     if(j===2){
    //     //         if(separatedfile[i][j].includes(".")){
    //     //             continue
    //     //         }
    //     //         else{
                    
    //     //             tempval.push(separatedfile[i][j])
    //     //             comvalue++;
    //     //             console.log(tempval)
    //     //             if(comvalue===separatedfile.length){
    //     //                 directories["2nd"]=tempval
    //     //                 comvalue=0
    //     //                 tempval=[]
    //     //             }
                    
    //     //         }
    //     //     }
    //     //     else if(j===3){
    //     //         if(separatedfile[i][j].includes(".")){
    //     //             continue
    //     //         }
    //     //         else{
    //     //             tempval.push(separatedfile[i][j])
    //     //             comvalue++;
    //     //             if(comvalue===separatedfile.length){
    //     //                 directories["3nd"]=tempval
    //     //                 comvalue=0
    //     //                 tempval=[]
    //     //             }
    //     //         }
    //     //     }
    //     // }
        
        
        
        
        
    // }
    // }

    console.log(treeData)
    // console.log(maindirectory);
    // for(let i=0;i<separatedfile.length;i++){

    // }
    function render(element){
        // console.log(directories["3nd"])
        directories["3nd"].map((element1)=>{
            
            let folder=[]
            let files=[]
                for (let i = 0; i < separatedfile.length; i++) {
                    const ele = separatedfile[i]; // Current element in the array
                    if (ele.includes(element)) {
                        let ans = ele.includes(element);
                        console.log(ans);

                        let ind = ele.indexOf(element); // Find index of `element`
                        if (ind !== -1 && ele[ind + 1] === element1) {
                            folder.push(element1); // Add to `folder` if condition matches
                        } else {
                            files.push(ele[ind + 1]); // Add next item to `files`
                        }
                    } else {
                        console.log("hi")
                        // Optional: Do nothing if `element` is not included
                    }
                }
                return(
                    <>
                    <div style={{display:"flex",alignItems:"center",}} onClick={()=>{clicked?setclick(false):setclick(true)}}>
                        <div style={{boxSizing:15,float:"left",color:"white"}} >
                            {clicked?<SlArrowDown color="white" size={15}></SlArrowDown>:<SlArrowRight color="white" size={15} fontWeight={500}></SlArrowRight>}
                        </div>
                        <div style={{color:"white"}}>
                            {folder&&folder?.map((element2)=>element2)}
                        </div>
                    </div>
                    <div>{files&&files?.map((element2)=>element2)}</div></>)
            })
    }
    const level=0
    return(
        
            
        
        <div className={className} style={{...style}}>
            {Object.keys(treeData).map((key)=><TreeNode name={key} key={key} level={level+1} nodes={treeData[key]} clicked={clicked} setclick={setclick}></TreeNode>)}
            
            
                
                 
                {//  directories["2nd"].map((element)=>(
                //     <>
                //     <div key={element} style={{paddingLeft:15,display:"flex",alignItems:"center",}} onClick={()=>{setclicked2nstates((prev)=>({
                //         ...prev,
                //         [element]:!prev[element]
                //     }))}}>
                //         <div style={{boxSizing:15,float:"left",color:"white"}} >
                            
                //             {clicked2ndstates[element]?<SlArrowDown color="white" size={15}></SlArrowDown>:<SlArrowRight color="white" size={15} fontWeight={500}></SlArrowRight>}                                        
                //         </div>
                //         <div style={{color:"white"}}>
                //             {/* {seen.has(element)?
                //                 common.add(element):
                //                 seen.add(element)
                                
                //             }
                //             {Array.from(seen)} */}
                //             {element}
                //         </div>
                //         <div>
                //         {clicked2ndstates[element]&&render(element)}
                //         </div>
                //     </div>
                    
                //     </>
                //  ))
                }  

                
                            
            </div>
            
      
    )
}
export default TreeView1;