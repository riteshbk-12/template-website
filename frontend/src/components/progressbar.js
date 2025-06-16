

function ProgressBar(){
    return(<>
        <div style={{display:"flex",alignItems:"center"}}>
            <span style={{color:"white"}}>send</span>
            <div style={{height:10,width:400,backgroundColor:"white",borderRadius:10}}></div>
            <span style={{color:"white"}}>verified</span>
        </div>
        </>
    );
}
export default ProgressBar;