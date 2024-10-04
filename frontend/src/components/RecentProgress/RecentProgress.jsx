import React,{useState, useEffect} from 'react';
import styles from "./RecentProgress.module.css";
import { TbMathIntegralX } from "react-icons/tb";
import { SlChemistry } from "react-icons/sl";
import { SiReactos } from "react-icons/si";
import { findRecentActivity } from '../../http';
function RecentProgress({user}) {
    const data = [
        {
            icon: TbMathIntegralX,
            topic: 'Algebra',
            completed: 74,
            total: 100,
            color: '#FFC107'
        },
        {
            icon: SiReactos,
            topic: 'Thermodynamics',
            completed: 52,
            total: 100,
            color: '#FFC107'
        },
        {
            icon: SlChemistry,
            topic: 'Organic Chemistry',
            completed: 36,
            total: 100,
            color: '#FFC107'
        },
    ];
    const [recentProgress, setRecentProgress] = useState(data);

    useEffect( ()=>{
        async function getRecActivity(){
            try{
                // console.log({email:user.email});
                const response = await findRecentActivity({email:user.email});
                console.log(response.data);
                let newData = []
                response.data.forEach((item,index) => {
                    if(item.status){
                        newData.push({
                            icon: data[index].icon,
                            topic: item.topic,
                            completed: item.completed,
                            total: item.total,
                            color: data[index].color
                            })
                        }
                    });
                setRecentProgress(newData);
            }catch(error){
                console.error(error);
            }
        }
        getRecActivity();
    },[])
    console.log(user);

    return (
        <div className={styles.container}>
            {recentProgress.map((item, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.iconHolder} style={{backgroundColor:item.color}}>
                        <div className={styles.icon}><item.icon/></div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.topic}>{item.topic}</div>
                        <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: `${((item.completed*100)/item.total).toFixed(0)}%` }}></div>
                        </div>
                    </div>
                    
                    <div className={styles.completion}>
                        <span className={styles.number}>{((item.completed*100)/item.total).toFixed(0)}%</span>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default RecentProgress;