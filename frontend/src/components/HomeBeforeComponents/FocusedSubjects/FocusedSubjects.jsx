import React from 'react'
import styles from "./FocusedSubjects.module.css"
import { TbMathIntegralX } from "react-icons/tb";
import { FaComputer } from "react-icons/fa6";
import { SlChemistry } from "react-icons/sl";
import { SiReactos } from "react-icons/si";

const SubjectCard = (props) => {
    return (
      <div className={styles.subContainerOne}>
        <div className={styles.iconHolder} style={{backgroundColor:props.color}}>
            <div className={styles.icon}><props.icon/></div>
        </div>
        <div className={styles.subheading}>{props.subject}</div>
      </div>
    );
};


function FocusedSubjects() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>OUR FOCUSED SUBJECTS</div>
        <h1 className={styles.subtitle}>Learn Different Chapters of Each Subject</h1>
        <p>Complete the journey with prerequisite recommendation</p>
        <div className={styles.subjectsContainer}>
            <SubjectCard icon={TbMathIntegralX} subject="Mathematics" color="#CB01FD" />
            <SubjectCard icon={SlChemistry} subject="Chemistry" color="#FD011F" />
            <SubjectCard icon={SiReactos} subject="Physics" color="#01A2FD" />
            <SubjectCard icon={FaComputer} subject="Mock Tests" color="#0163FD" />
        </div>
      </div>
    </>
  )
}

export default FocusedSubjects