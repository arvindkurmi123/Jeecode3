import React from 'react'
import styles from "./Benefits.module.css"
import { SiReactos } from "react-icons/si";

function Card(props){
    return(
        <>
            <div className={styles.card} style={{background: `linear-gradient(${props.color},${props.color}) top right/60% 40% no-repeat`}}>
                <div className={styles.card2} style={{background: `linear-gradient(${props.color}, ${props.color}) bottom left/60% 40% no-repeat`}}>
                    <div className={styles.card3}>
                    <div className={styles.subContainerOne}>
                        <div className={styles.iconHolder} style={{backgroundColor:props.color}}>
                            <div className={styles.icon}>
                            <props.icon/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.subContainerTwo}>
                        <h4>recommended topic of subject</h4>
                        <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores ipsam.
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
const Benefits = () => {
  return (
    <>
    <div className={styles.container}>
        <div className={styles.title}>WHY CHOSE US</div>
        <h1 className={styles.subtitle}>Benefits of practicing with us</h1>
        <div className={styles.cardContainer}  >
            <Card color="#FAAB00" icon={SiReactos}/>
            <Card color="#0163FD" icon={SiReactos}/>
            <Card color="#FAAB00" icon={SiReactos}/>
            <Card color="#FAAB00" icon={SiReactos}/>

        </div>
        <div className={styles.BenefitsContainer}>
            
        </div>
    </div>
    </>
  )
}

export default Benefits