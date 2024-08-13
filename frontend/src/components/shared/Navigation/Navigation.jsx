import React, { useState } from 'react';
import styles from './Navigation.module.css';
import Logo from '/images/logo (2).png';

const Navigation = ({login,register}) => {
  const [menu, setMenu] = useState('home');

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <ul className={`${styles.navLinks} poppins-semibold`}>
        <li onClick={() => setMenu('home')} className={menu === 'home' ? styles.active : ''}>Home</li>
        <li onClick={() => setMenu('FAQs')} className={menu === 'FAQs' ? styles.active : ''}>FAQs</li>
        <li onClick={() => setMenu('Resources')} className={menu === 'Resources' ? styles.active : ''}>Resources</li>
        <li onClick={() => setMenu('AboutUs')} className={menu === 'AboutUs' ? styles.active : ''}>About Us</li>
        <li onClick={() => setMenu('ContactUs')} className={menu === 'ContactUs' ? styles.active : ''}>Contact Us</li>
      </ul>
      <div className={styles.navButtons}>
        <button className={`${styles.navigate} poppins-semibold`} onClick={login}>Sign in</button>
        <button className={`${styles.submit} poppins-semibold`} onClick={register}>Register</button>
      </div>
    </nav>
  );
};

export default Navigation;
