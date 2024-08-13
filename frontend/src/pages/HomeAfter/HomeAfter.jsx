import React from 'react'
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard'
import RecentProgress from '../../components/RecentProgress/RecentProgress'
import HomeSubjects from '../../components/HomeSubjects/HomeSubjects'
import styles from "./HomeAfter.module.css"
import { TbMathSymbols } from "react-icons/tb";
import { useSelector } from 'react-redux'

const HomeAfter = () => {
const { user } = useSelector((state) => state.auth);

  return (
    <div>
        <div className={styles.userWelcome}>
            <div className={styles.welcomeMessage}>Welcome back, <span style={{color:"#0C7FDA"}}>{user.name}!</span></div>
            <p className={styles.slogan}>Unleash Your Potential with JEECode</p>
        </div>
        <h2>Recommended for you</h2>
        <div className={styles.cardContainer}>
          <RecommendationCard color="#0163FD" icon={TbMathSymbols}/>
          <RecommendationCard color="#FD0101" icon={TbMathSymbols}/>
          <RecommendationCard color="#FD9801" icon={TbMathSymbols}/>
          <RecommendationCard color="#FD017A" icon={TbMathSymbols}/>
        </div>
        <br /><br />
        <h2>Recent Activities</h2>
        <div className={styles.activityContainer}>
          <RecentProgress/>
        </div>
        <h2>Sections of the Subjects</h2>
        <div className={styles.sectionContainer}>
          <div className={styles.subjectContainer}>
            <HomeSubjects
              subject="Mathematics"
              sections={[
                { title: 'Algebra', description: 'Information about Algebra', completion: 78 },
                { title: 'Differentiation', description: 'Information about Differentiation', completion: 88 },
                { title: 'Integration', description: 'Information about Integration', completion: 79 },
                { title: 'Statistics', description: 'Information about Statistics', completion: 60 },
              ]}
            />
          </div>
          <div className={styles.subjectContainer}>
            <HomeSubjects
              subject="Mathematics"
              sections={[
                { title: 'Algebra', description: 'Information about Algebra', completion: 78 },
                { title: 'Differentiation', description: 'Information about Differentiation', completion: 88 },
                { title: 'Integration', description: 'Information about Integration', completion: 79 },
                { title: 'Statistics', description: 'Information about Statistics', completion: 60 },
              ]}
            />
          </div>
          <div className={styles.subjectContainer}>
            <HomeSubjects
              subject="Mathematics"
              sections={[
                { title: 'Algebra', description: 'Information about Algebra', completion: 78 },
                { title: 'Differentiation', description: 'Information about Differentiation', completion: 88 },
                { title: 'Integration', description: 'Information about Integration', completion: 79 },
                { title: 'Statistics', description: 'Information about Statistics', completion: 60 },
              ]}
            />
          </div>
          <div className={styles.subjectContainer}>
            <HomeSubjects
              subject="Mathematics"
              sections={[
                { title: 'Algebra', description: 'Information about Algebra', completion: 78 },
                { title: 'Differentiation', description: 'Information about Differentiation', completion: 88 },
                { title: 'Integration', description: 'Information about Integration', completion: 79 },
                { title: 'Statistics', description: 'Information about Statistics', completion: 60 },
              ]}
            />
          </div>
        </div>
     

    </div>
  )
}

export default HomeAfter;

