import React from 'react';
import News_Background from '/images/Vector 12.png';
import styles from './News.module.css';

const News = () => {
  return (
    <div>
      <div className={styles.news}>
        <img src={News_Background} alt="news" />
      </div>
    </div>
  );
}

export default News;
