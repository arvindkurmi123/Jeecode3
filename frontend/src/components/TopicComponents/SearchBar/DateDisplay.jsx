import React from 'react';
import styles from './DateDisplay.module.css';

const DateDisplay = () => {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const options2 = {weekday: 'long'}
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const weekDay =  currentDate.toLocaleDateString('en-US', options2);

  return (
    <div className={styles.dateContainer}>
      <div>{formattedDate}</div>
      <div style={{fontSize:"20px",fontWeight:"bold"}}>{weekDay}</div>
    </div>
  );
};

export default DateDisplay;