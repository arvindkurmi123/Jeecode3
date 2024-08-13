import React, { useState, useEffect } from 'react';
import styles from "./RankChart.module.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    defaults,
    Legend,
  } from 'chart.js';
// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
import { Line,Bar } from 'react-chartjs-2';

defaults.maintainAspectRatio=false;
defaults.responsive=true;


function RankChart({userInfo}){
  useEffect(() => {
    console.log(userInfo.createdAt);
  }, [userInfo]);
    if(!userInfo || !userInfo.rating){
      return;
    } 

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const startMonth = Number(userInfo.createdAt.substring(5,7))-1
    const startYear = Number(userInfo.createdAt.substring(0,4))
    const labels = []
    const length = userInfo.rating.length
    for(let i=0; i<Math.max(12,length); i++){
        let month = (startMonth+i)%12
        labels.push(months[month])
    } 
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Rank',
            data: userInfo.rating,
            borderColor: '#FDB61E',
            backgroundColor: '#FDB61E',
            tension: 0.4, // Cubic interpolation (monotone)
            fill: false,
            pointStyle: 'circle',
            pointBackgroundColor: '#FDB61E',
          },
        ],
      };
    const [chartData, setChartData] = useState(data);
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            type: 'category',
            grid: {
              display: false,
            },
          },
          y: {
            reverse: true,
            grid: {
              display: false,
            },
            ticks: {
                stepSize: 200, // Adjust to have 5 rows (1000 / 200 = 5 steps)
            },
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
        },
      };

    return (
      <div className={styles.rankCardContainer}>
        <div className={styles.rankTitle}>Rank</div>
        <div className={styles.rankChartContainer}>
            <Line data={chartData} options={options} />
        </div>
      </div>
    );
  };


  export default RankChart;