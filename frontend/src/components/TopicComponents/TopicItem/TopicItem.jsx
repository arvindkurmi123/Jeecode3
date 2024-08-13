import React from 'react';
import styles from './TopicItem.module.css';

const TopicItem = ({ topic,start, count, solved}) => {

    const progress = (topic!="Name")?((solved/count)*100):0;
    console.log("progress",progress)
    return (
        <div className={styles.topicItem}>
            <div className={styles.topicName}>{topic}</div>
            <div className={styles.progressContainer}>
                {topic=="Name"?
                <span className={styles.progressPercent} style={{width:"70%"}}>Progress</span>
                :
                <div className={styles.progressBar}>
                    <div 
                        className={styles.progressFill} 
                        style={{ width: `${progress.toFixed(0)}%` }} 
                    ></div>
                </div>
                }
                <span className={styles.progressPercent}>{solved}</span>
                <span className={styles.progressPercent}>{count}</span>
            </div>
            {
                topic=="Name"?<span className={styles.progressPercent} style={{width:"20%"}}>Status</span>
                :
                <button onClick={() => start(topic)} className={styles.topicButton}>
                    {progress>0?"Continue":"Start"}
                </button>
            }
            
        </div>
    );
};

export default TopicItem;