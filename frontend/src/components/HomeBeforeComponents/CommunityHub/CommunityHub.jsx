import React from 'react';
import styles from './CommunityHub.module.css';
import Image2 from '/images/Rectangle 19.png';
import Image1 from '/images/Rectangle 20.png';
import Vector from '/images/Vector 13.png';

const CommunityHub = () => {
  return (
    <div className={styles.community_hub}>
      <div className={styles.community_hub_left}>
        <div className={styles.heading1}>COMMUNITY HUB DISCUSSION FORUM</div>
        <div className={styles.heading2}>Discussion Forum for Sharing, Learning, and Helping</div>
        <div className={styles.content_community_hub}>
          "Dive into our dynamic Community Hub – a central space for rich discussions, shared experiences, and mutual support. Connect with a diverse community of learners, where knowledge knows no bounds. Join us in the journey of collaborative learning and growth! 🌐🚀"
        </div>
        <div>
          <button className={`${styles.basic} poppins-semibold`}>Get Started</button>
        </div>
      </div>

      <div className={styles.community_hub_right}>
        <div className={styles.Images_right_side}>
          <img className={styles.Image2} src={Image2} alt="Image2" />
          <img className={styles.Image1} src={Image1} alt="Image1" />
          <img className={styles.Vector} src={Vector} alt="Vector" />
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;
