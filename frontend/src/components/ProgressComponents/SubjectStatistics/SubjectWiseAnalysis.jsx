import {React,useRef} from 'react'
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import styles from './SubjectWiseAnalysis.module.css'
import RecommendationCard from '../../RecommendationCard/RecommendationCard';
import { TbMathIntegralX } from "react-icons/tb";
import { SlChemistry } from "react-icons/sl";
import { SiReactos } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";
import SectionPage from '../../../pages/SectionPage/SectionPage';
const SectionPageContainer=({subject})=>{
    return(
        <div className={styles.sectionContainer}>
            <SectionPage subject={subject} />
        </div>
    )
}
function SubjectWiseAnalysis({ subject, userInfo,extraInfo,hasSection }) {
    const navigate = useNavigate();
     const sectionRef = useRef(null);
    console.log(subject);
    const subjectData = subject=='Physics'?userInfo.physics:subject=='Chemistry'?userInfo.chemistry:userInfo.mathematics; 
    const onTopicClick = ()=>{
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } 

    const easy = subjectData.easy
    const medium = subjectData.medium 
    const hard = subjectData.hard 
    const data = [easy, medium,hard]

    const currectQuestions = subjectData.solvedQuestions?subjectData.solvedQuestions.length:0
    const incorrectQuestions = subjectData.incorrectQuestions?subjectData.incorrectQuestions.length:0

    const totalSubmissions = currectQuestions + incorrectQuestions;
    const accuracy = (currectQuestions / (totalSubmissions==0?1:totalSubmissions))*100

    return (
            <div>
            <div className={styles.mainContainer}>
            <div className={styles.subContainer}>
                <DoughnutChart
                    title={subject}
                    data={{
                        labels: ['Easy', 'Medium', 'Hard'],
                        datasets: [{
                            data: data,
                            backgroundColor: ['#6bdd6b','#FFCE56','#FF6384' ],
                            hoverBackgroundColor: ['#6bdd6b','#FFCE56','#FF6384']
                        }]
                    }}
                    extraDetails={{
                        'Easy': `${easy}`,
                        'Medium': `${medium}`,
                        'Hard': `${hard}`,
                        'Total Submissions': `${totalSubmissions}`,
                        'Accuracy': `${accuracy.toFixed(2)}%`
                    }}
                />
            </div>
            <div className={styles.subContainer}>
            {!extraInfo?"":
                    <div className={styles.extraInfo}>
                        <button 
                            onClick={onTopicClick} 
                            className={styles.topicButton}>
                                Continue {subject} journey 
                                <span style={{fontSize:"20px", marginLeft:"10px", paddingTop:"5px"}}>
                                    <FaArrowCircleRight/>
                                </span>
                        </button>
                        <RecommendationCard 
                            color="#0163FD" 
                            icon={TbMathIntegralX}
                            recommendedText="Projectile Motion"
                            subject={subject}
                            context="Topic"
                        />
                        <RecommendationCard 
                            color="#FD9801" 
                            icon={SiReactos}
                            recommendedText="Kinematics"
                            subject={subject}
                            context="Chapter"
                        />
                    </div>
                    }  
            </div>
        </div>
        <section className={styles.mainContainer} ref={sectionRef}>
            {hasSection?<SectionPageContainer subject={subject} />:null}
        </section>
        </div>
    )
}

export default SubjectWiseAnalysis
