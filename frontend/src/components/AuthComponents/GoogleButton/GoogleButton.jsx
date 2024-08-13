// src/components/AuthComponents/GoogleButton/GoogleButton.js

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setAuth } from '../../../store/authSlice'; // Adjust path if necessary
import { googleLogin } from '../../../http'; // Adjust path if necessary
import styles from './GoogleButton.module.css';

const GoogleButton = ({login}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.googlebutton} onClick={() => login()}>
      <div className={styles.googlebuttonChild} />
      <img
        className={styles.image56Icon}
        loading="lazy"
        alt=""
        src="./icons/Google.png"
      />
      <div className={styles.googleButton}>
        <div className={styles.continueWithGoogle}>
          Continue with Google
        </div>
      </div>
    </div>
  );
};

export default GoogleButton;
