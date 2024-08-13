// DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './DoughnutChart.module.css';

const DoughnutChart = ({title,data,extraDetails}) => {


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div className={styles.doughnutContainer}>
            <h2>{title}</h2>
            <div className={styles.doughnut}>
                <Doughnut data={data} options={options} />
            </div>
            <div className={styles.details}>
                {
                    Object.entries(extraDetails).map(([key,value],index)=>(
                        <div><p>{key}</p> <p>{value}</p></div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default DoughnutChart;