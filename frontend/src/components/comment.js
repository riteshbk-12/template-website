import r from "../static/assets/r letter.png"

function Comment({ class1 }) {
    return (
        <>
            <div style={{display:"flex",height:100,width:300,backgroundColor:" #29282b"}}>
                <div style={{marginLeft:10,marginTop:20}}>
                    <img src={r} style={{borderRadius:"50%",height:30,width:30}}></img>
                    <span style={{color:'white'}}>ritesh4115</span>
                    <span style={{color:"white",paddingLeft:5}}>msg</span>
                </div>
            </div>
            <div className={class1} style={{display:"flex", height: 80, width: 300, backgroundColor:" #29282b",alignItems:"center", borderRadius:10 }} >
                <input type="text" style={{ marginLeft: 15, marginRight: 5, fontFamily: " Georgia, serif" }} placeholder="Add Comments"></input>
                <div style={{ fontFamily: " Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center", height: 30, width: 80, backgroundColor: "black", borderRadius: 10, color: "white" }}>post</div>
            </div>
            
        </>
    );
}
export default Comment;