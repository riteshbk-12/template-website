import { easeOut } from "motion";
import { motion } from "motion/react"
function Para({text,className,style1}){ 
    return (
        <div className={className} style={{...style1, fontFamily: " Georgia, serif", }}>
        {text.split("").map((char, index) => (
            
        <motion.span
          key={index}
          initial={{ opacity: 0.001,  color:"white",scale: 1.8, filter: "blur(8px)",}}
          animate={{ opacity: 1, color:"white",scale: 1, filter: "blur(0px)",}}
          transition={{ delay: index * 0.08, duration: 0.5,ease:[0.25, 0.1, 0.25, 1] }}
          style={{ display: "inline-block", marginRight: "2px" }} // Add some spacing
        >
          
            {char===" " ? "\u00A0":char}
        {console.log(char)}
        </motion.span>))}
        </div>
  );
};
export default Para;