import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ title,labels,data }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Questions Solved',
                data: data.map(day => day.questions),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderRadius: 5,
            },
            {
                label: 'Time Taken (minutes)',
                data: data.map(day => day.time),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderRadius: 5,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `${title} Report of User`,
            }
        },
        scales: {
            x:{
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10, 
                },
                grid: {
                    display: false,
                },
            }
        }
    };

    return (
        <div style={{height:"400px"}}>
            <Bar data={chartData} options={options}/>
        </div>
    )
};

export default BarChart;