import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SignupLoginBox from '../../components/SignupLoginBox/SignupLoginBox';
import styles from './Authenticate.module.css';
import Navigation from '../../components/shared/Navigation/Navigation';
import Footer from '../../components/shared/Navigation/Footer/Footer';

const Authenticate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');
  const [isSignup, setIsSignup] = useState(mode === 'signup');

  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.authenticateContainer}>
        <SignupLoginBox isSignup={isSignup} onToggle={handleToggle} />
      </div>
      <Footer/>
    </div>
  );
};

export default Authenticate;
