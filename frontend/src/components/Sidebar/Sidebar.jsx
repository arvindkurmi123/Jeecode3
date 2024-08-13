import React, { useState } from 'react';
import { FaBars,FaUserAlt}from "react-icons/fa";
import { AiFillHome,AiFillMessage  } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from "./Sidebar.module.css";
const Sidebar = ({isOpen, toggle,logout}) => {

    const {user} = useSelector((state)=> state.auth);

    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<AiFillHome/>
        },
        {
            path:"/subject",
            name:"Subjects",
            icon:<FaBook/>
        },
        {
          path:`/profile/${user.name}`,
          name:"Profile",
          icon:<FaUserAlt/>
        },
        {
            path:"/progress",
            name:"Progress",
            icon:<MdAnalytics/>
        },
        {
            path:"/post",
            name:"Posts",
            icon:<AiFillMessage/>
        },
        {
            path:"/setting",
            name:"Settings",
            icon:<IoMdSettings/>
        }
    ]
    return (
        <div className={styles.container}>
           <div style={{width: isOpen ? "250px" : "55px"}} className={styles.sidebar}>

                {/* logo  */}
               <div className={styles.top_section}>
                   <div style={{display: isOpen ? "inline" : "none"}} className={styles.logo}>Logo</div>
                   <div style={{marginLeft: isOpen ? "130px" : "0px", transition:"0.7s"}} className={styles.bars}>
                       <FaBars onClick={toggle}/>
                   </div>
               </div>

               {/* navlinks */}
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className={styles.link}>
                           <div className={styles.icon}>{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.link_text}>{item.name}</div>
                       </NavLink>
                   ))
               }

               {/* logout  */}
               <NavLink onClick={logout} key="8" className={styles.logout}>
                  <div className={styles.icon}><IoLogOut/></div>
                  <div style={{display: isOpen ? "block" : "none"}} className={styles.link_text}>Logout</div>
              </NavLink>

           </div>
        </div>
    );
};

export default Sidebar;