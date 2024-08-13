import React from 'react';
import styles from './hero.module.css';
import Image2 from '/images/Rectangle 10.png';
import Image1 from '/images/Rectangle 12.png';
import Image4 from '/images/Rectangle 13.png';
import Image3 from '/images/Rectangle 14.png';
import Play_Button from '/images/Polygon 1.png';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_left}>
        <div className={styles.topHeading}>Best Personalized and Adaptive Recommendation Platform</div>
        <div className={styles.Find_Perfect_Path}>Find Your Perfect Path</div>
        <div className={styles.content}>We tailor study plan based on individual Strengths and weaknesses. You will get recommendations to enhance Learning.</div>
        <div className={styles.learn}>
          <button className={`${styles.basic} poppins-semibold`}>Get Started</button>
          <div className={`${styles.Learn_More} poppins-semibold`}>
            Learn More
            <button className={`${styles.navigate} ${styles.play}`}><img className={styles.play_button} src={Play_Button} alt="play_button" /></button>
          </div>
        </div>
      </div>
      <div className={styles.hero_right}>
        <div className={styles.upperimage}>
          <img src={Image1} alt="image1" />
          <img src={Image2} alt="image2" />
        </div>
        <div className={styles.lowerimage}>
          <img src={Image3} alt="image3" />
          <img src={Image4} alt="image4" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
