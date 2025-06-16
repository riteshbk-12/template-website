import r from "../static/assets/r letter.png"
import { GoSearch } from "react-icons/go";
import { motion } from "motion/react"

function NavBar(){
    return(
        <div className="navdiv" >
            
                
                    <ul className="navbar-links">
                        <motion.li whileHover={{scale:1.2}}><a href="/">Name</a></motion.li>      
                        <motion.li whileHover={{scale:1.2}}><a href="/docs">Docs</a></motion.li>
                        <motion.li whileHover={{scale:1.2}}><a href="/themes">Themes</a></motion.li>
                        <motion.li whileHover={{scale:1.2}}><a href="/icons">Icons</a></motion.li>
                        <motion.li whileHover={{scale:1.2}}><a href="/add">Add</a></motion.li>
                    </ul>
                    <motion.div className="admin" whileHover={{scale:1.2}}><a href="/admin">Admin</a></motion.div>
                    <div className="searchdiv"> 
                        <GoSearch size={30}></GoSearch>
                        {/* <input type="text" placeholder={"search"}></input> */}
                    </div>
                    <div className="profile">
                        <img src={r}></img>
                    </div>
                
            
        </div>
    )
}
export default NavBar;