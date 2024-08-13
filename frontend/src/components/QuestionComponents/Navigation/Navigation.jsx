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
      
    </nav>
  );
};

export default Navigation;
