import { React, useState, useEffect } from "react";
import TopicItem from "../TopicItem/TopicItem";
import styles from "./TopicList.module.css";
import { useSelector } from "react-redux";

const TopicList = ({ topics, start }) => {
  const { user } = useSelector((state) => state.auth);
  console.log("topics",topics) 
  // if (!Array.isArray(topics)) {
  //   console.error('topics is not an array');
  //   return null;
  // }
  return (
    <div>
      <h1>&nbsp;</h1>
      <h2 className={styles.heading}>Topics</h2>

      {topics ? (
        <div className={styles.itemContainer}>
          <TopicItem topic={"Name"} count={"Total Question"} solved={"solved Questions"} />
          {topics.map((topic, index) => (
            <TopicItem key={index} topic={topic.topic} start={start} count={topic.count} solved={topic.solved} />
          ))}
        </div>
      ) : (
        <p>Loading chapter data...</p>
      )}
    </div>
  );
};

export default TopicList;
