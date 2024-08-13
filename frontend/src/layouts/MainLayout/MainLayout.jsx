import React from 'react'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from "./MainLayout.module.css"
import HomeAfter from '../../pages/HomeAfter/HomeAfter'
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { logout } from '../../http';
import { useNavigate,Outlet } from 'react-router-dom';
const MainLayout = () => {
  const[isOpen ,setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen)
  const navigate = useNavigate();
    const dispatch = useDispatch();

    async function logoutUser() {
        try {
            const { data } = await logout(); // assuming logout returns some data
            dispatch(setAuth(data)); // if no data is returned, use dispatch(setAuth(null)) or similar
            navigate('/authenticate?mode=login');
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} logout={logoutUser}/>
      <div className={styles.mainSection} style={{marginLeft: isOpen?"300px":"100px", transition: "1s"}}>
        <Outlet/>
      </div>
    </>
  )
}

export default MainLayout