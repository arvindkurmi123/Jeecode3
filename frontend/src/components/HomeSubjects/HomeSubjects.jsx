import React from 'react';
import styles from './HomeSubjects.module.css'
import { GiBookCover } from "react-icons/gi";
const HomeSubjects = ({ subject, sections }) => {
  return (
    <div className={styles.homeSubjectContainer}>
      <div className={styles.titleHolder}>
        <div className={styles.homeSubjectTitle}>{subject}</div>
        <div>Explore</div>
      </div>
      <hr style={{height:2,backgroundColor:'black'}} />
      <br />
      <div className={styles.homeSubjectSections}>
        {sections.map((section) => (
          <HomeSubjectSectionCard
            key={section.title}
            title={section.title}
            description={section.description}
            completion={section.completion}
          />
        ))}
      </div>
    </div>
  );
};

const HomeSubjectSectionCard = ({ title, description, completion }) => {
  const cardColor = completion >= 70 ? '#46AE00' : '#FDB601';
  return (
    <div className={styles.homeSubjectSectionCard} style={{backgroundColor:cardColor}}>
      <div className={styles.homeSubjectSectionCardIcon}>
        <span className={styles.materialIcon} style={{color:cardColor,paddingTop:10}}><GiBookCover/></span>
      </div>
      <div className={styles.homeSubjectSectionCardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.homeSubjectSectionCardCompletion}>
        <span>{completion}%</span>
      </div>
    </div>
  );
};

export default HomeSubjects;