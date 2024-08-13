import React from 'react';
import styles from './Loader.module.css';
import Logo from '/images/logo2.svg';
import Cap from '/images/cap.svg'
const Loader = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
                <img
                    src={Logo}
                    alt="Loading"
                    // className={styles.loaderImage}
                    width={200}
                    height={200}
                />
                <img
                    src={Cap} 
                    alt="Loading"
                    className={styles.animatedCapImage}
                    width={50}
                    height={50}
                />
            </div>
        </div>
    );
};

export default Loader;
