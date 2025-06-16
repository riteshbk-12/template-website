import React from "react";
import "../static/main.css"

function Input(props){
    return(
        <div className="field">
            <label {...props.labelprop} >{props.name}</label><br />
            <input {...props.inputprop} required className={props.isvalidate?"input":"error"} onChange={props.func}></input>
        </div>
    )
}
export default Input;