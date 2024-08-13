import React from 'react';
import styles from "./Profile.module.css";
import { BiSolidQuoteLeft,BiSolidQuoteRight  } from "react-icons/bi";
import { useSelector } from 'react-redux'
import { findUserInfo } from '../../http';
import { useState,useEffect } from 'react';

const ProfileHeader = ({name,email,img,classs}) => {
    return (
        <div className={styles.profileHeader}>
            <div className={styles.profileCard}>
                <div className={styles.profileImage}>
                    <img src={img || "/images/userIcon1.jpeg"} alt='profile'/>
                </div>
                <div className={styles.profileInfo}>
                    <h2 className={styles.profileName}>{name}</h2>
                    <p className={styles.profileTitle}>student</p>
                    <p className={styles.profileEmail}>Email: {email}</p>
                    <p className={styles.profileGrade}>Class: {classs || "12th"}</p>
                </div>
                <div className={styles.buttonHolder}>
                    <button className={styles.submit}>Edit</button>
                </div>
            </div>
        </div>
    );
};
const StatsCard = ({ totalQuestionsAttempted,
    totalQuizesAttempted,
    rating }) => {
    return (
        <div className={styles.statsCard}>
            <div className={styles.statItem}>
                <div className={styles.statTitle}>Total Questions Attempted</div>
                <p className={styles.statValue}>{totalQuestionsAttempted}</p>
            </div>
            <hr className={styles.divider} />
            <div className={styles.statItem}>
                <div className={styles.statTitle}>Total Quizes Attempted</div>
                <p className={styles.statValue}>{totalQuizesAttempted}</p>
            </div>
            <hr className={styles.divider} />
            <div className={styles.statItem}>
                <div className={styles.statTitle}>Rating</div>
                <p className={styles.statValue}>{rating.toFixed(2)}</p>
            </div>
        </div>
    );
};

const Badge = ({status}) => {
    return (
    <div className={styles.statsCard}>
        <div className={styles.statItem}>
            <div className={styles.statTitle}>Badges</div>    
        </div>
        <div className={styles.badges}>
            <img src=
                {!status ? "/images/badge1.png"
                    : status==="starter" ? "/images/badge2.png" 
                    : status==="mediocre" ? "/images/badge3.png"
                    : "/images/badge4.png"}
                alt="Badge Image" 
            />
        </div>
        <div className={styles.statTitle}>{status || "Registered"}</div>
        
    </div>
    );
};

const ProfileBio = ({ bio }) => {
  return (
    <div className={styles.quoteContainer}>
      <div className={styles.quoteMarksLeft}>
        <span className={styles.quoteMark}><BiSolidQuoteLeft/></span>
      </div>
      <p className={styles.quoteText}>
        {bio || "I love learning as well as playing."}
      </p>
      <div className={styles.quoteMarksRight}>
        <span className={styles.quoteMark}><BiSolidQuoteRight/></span>
      </div>
    </div>
  );
};

const ProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    const userInfoFirst = {
        registerDate: "2023-10-12T21:42:22Z",
        rating: 320,
        ranks: [900, 743, 800, 610, 620, 500, 340, 350, 320],
        level: 4,
        solvedQuestionsUniversal: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
          22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
          40, 41, 42, 43, 44, 45, 46, 47, 48,
        ], // submissionId's : Question correct
        incorrectQuestionsUniversal: [1, 2, 11, 12], // incorrect
        attempedQuestionsUniversal: [13], // attemped ( attemped means clicked but not submitted anytime)
        levelUpdates: [
          "2023-10-12T21:42:22Z",
          "2023-11-12T21:42:22Z",
          "2024-01-20T21:42:22Z",
          "2024-05-12T21:42:22Z",
        ],
        physics: {
          solvedQuestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // submissions Id's : correct Question
          attempedQuestions: [13], // submission Id's : Attemped but not submitted Questions ( questions is clicked )
          incorrectQuestions: [1, 2, 11, 12], // submitted but incorrect
          easy: 8,
          medium: 4,
          hard: 3,
        },
        chemistry: {
          solvedQuestions: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
          attempedQuestions: [16, 17, 17, 17, 17, 18, 18, 19, 21],
          incorrectQuestions: [16, 20, 22, 23, 24],
          easy: 4,
          medium: 3,
          hard: 4,
        },
        mathematics: {
          solvedQuestions: [
            28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
            46, 47, 48,
          ],
          attempedQuestions: [28, 29, 30, 31, 32, 33],
          incorrectQuestions: [28, 29, 35],
          easy: 10,
          medium: 8,
          hard: 3,
        },
      };
    const [userInfo,setUserInfo] = useState(userInfoFirst);
    const [isLoading, setIsLoading] = useState(true);
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
    return isLoading? 
    <div>loading</div>:(
        <div className={styles.profilePage}>
            <ProfileHeader name={user.name} email={user.email} />
            <div className={styles.profileContent}>
                <StatsCard
                    totalQuestionsAttempted={320}
                    totalQuizesAttempted={30}
                    rating={userInfo.rating}
                />
                <Badge status="starter" />
            </div>
            
            <ProfileBio bio="I love deals. The cheaper the better, I also never look for fancy accomodations." />
        </div>
    );
};

export default ProfilePage;