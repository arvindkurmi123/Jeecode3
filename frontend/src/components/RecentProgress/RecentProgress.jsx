import React from 'react';
import styles from "./RecentProgress.module.css";
import { TbMathIntegralX } from "react-icons/tb";
import { SlChemistry } from "react-icons/sl";
import { SiReactos } from "react-icons/si";
function RecentProgress() {
    const data = [
        {
            icon: TbMathIntegralX,
            topic: 'Algebra',
            completion: 74,
            color: '#FFC107'
        },
        {
            icon: SiReactos,
            topic: 'Thermodynamics',
            completion: 52,
            color: '#FFC107'
        },
        {
            icon: SlChemistry,
            topic: 'Organic Chemistry',
            completion: 36,
            color: '#FFC107'
        },
    ];

    return (
        <div className={styles.container}>
            {data.map((item, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.iconHolder} style={{backgroundColor:item.color}}>
                        <div className={styles.icon}><item.icon/></div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.topic}>{item.topic}</div>
                        <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: `${item.completion}%` }}></div>
                        </div>
                    </div>
                    
                    <div className={styles.completion}>
                        <span className={styles.number}>{item.completion}%</span>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default RecentProgress;