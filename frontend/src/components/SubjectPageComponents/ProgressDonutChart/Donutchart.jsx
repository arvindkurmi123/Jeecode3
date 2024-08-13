import React from 'react'
import Chart from 'react-apexcharts'
const Donutchart = ({subject,section}) => {
  return (
    <React.Fragment>
        <Chart type='donut'
        width={330}
        height={200}
        series={[100,20]}
        background="#0163FD"
        options={{
            labels:['NotAttempted','Attempted'],
            title:{text:subject,align: 'center',color:'#0163FD'},
            colors: [section.color1,section.color2],
            chart: {
              background: '#FFFAFA',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '65%',
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      label:'Total',
                      style: {
                        fontSize: '16px', 
                        fontWeight: 'bold',
                        color: '#0163FD' 
                      }
                    }

                  }
                }
              }
            },
            dataLabels: {
              enabled: false 
            },
            legend: {
              show: false
            }
        }}

        >
        </Chart>
    </React.Fragment>
  )
}

export default Donutchart