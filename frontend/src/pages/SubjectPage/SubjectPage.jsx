import React, { useState } from 'react'
import styles from './SubjectPage.module.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { findUserInfo } from '../../http';
// import Linecharts from '../../components/SubjectPageComponents/TimeSpentcharts/linecharts'
// import Donutchart from '../../components/SubjectPageComponents/ProgressDonutChart/Donutchart'
// import RecommendationCard from '../../components/RecommendationCard/RecommendationCard'
// import SubjectLayout from '../../components/SubjectPageComponents/TimeSpentcharts/subjectlayout'
// import { TbMathSymbols } from "react-icons/tb";
import SubjectStatistics from '../../components/ProgressComponents/SubjectStatistics/SubjectStatistics';
const SubjectPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const { user } = useSelector((state) => state.auth);
  const userInformation = {
    registerDate: "2023-10-12T21:42:22Z",
    rating: 320,
    ranks: [900,743,800,610,620,500,340,350,320],
    level: 4,
    solvedQuestionsUniversal : [1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,45, 46, 47, 48], // submissionId's : Question correct 
    incorrectQuestionsUniversal : [1,2,11,12], // incorrect 
    attempedQuestionsUniversal:[13], // attemped ( attemped means clicked but not submitted anytime)
    levelUpdates: ["2023-10-12T21:42:22Z","2023-11-12T21:42:22Z","2024-01-20T21:42:22Z","2024-05-12T21:42:22Z"],
    physics: {
        solvedQuestions: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], // submissions Id's : correct Question
        attempedQuestions: [13], // submission Id's : Attemped but not submitted Questions ( questions is clicked )
        incorrectQuestions: [1,2,11,12], // submitted but incorrect
        easy: 8,
        medium: 4,
        hard: 3,
    },
    chemistry: {
        solvedQuestions: [16,17,18,19,20,21,22,23,24,25,26,27],
        attempedQuestions: [16,17,17,17,17,18,18,19,21],
        incorrectQuestions: [16,20,22,23,24],
        easy: 4, 
        medium: 3,
        hard: 4
    },
    mathematics:{
        solvedQuestions: [28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],
        attempedQuestions: [28,29,30,31,32,33],
        incorrectQuestions: [28,29,35],
        easy: 10,
        medium: 8,
        hard: 3
    },
  }
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(userInformation);
  useEffect(() => {
    async function getInfo() {
      try {
        const response = await findUserInfo({ username: user.name });
        console.log(response.data.user);
        setUserInfo(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsLoading(false); // Even if there's an error, stop loading
      }
    }
  
    getInfo();
  }, [user]);
  
  return (
    <div className={styles.subjectpagebox}>
      <div className={styles.userWelcome}>
      <div className={styles.welcomeMessage}>Welcome back, <span style={{ color: "#0C7FDA" }}>{user.name}!</span></div>
        <p className={styles.slogan}>Unleash Your Potential with JEECode</p>
      </div>
      <div className={styles.subjectStatistics}>
        <SubjectStatistics 
          userInfo={userInfo} 
          extraInfo={{
            recommendedText: "Kinematics",
            hasSection: true,
          }
          }
        />
      </div>
    </div>
  )
}

export default SubjectPage;
