import React from 'react'
import TopicList from '../../components/TopicComponents/TopicList/TopicList'
import SearchBar from '../../components/TopicComponents/SearchBar/SearchBar'
import styles from './TopicPage.module.css'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { findTopics,findFirstQuestionByTopic,findTopicsForUser } from '../../http';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader';
function TopicPage() {
  const chapterName = "Kinematics"; // Extracting the chapterName from the URL
  const [topics, setTopics] = useState([]);
  const [Loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchTopics = async () => {
        try {
            const { data } = await findTopicsForUser({chapter:chapterName,userName:user.name});
            console.log(data.data);
            setTopics(data.result);
        } catch (err) {
            console.error('Error fetching topics:', err);
        }
    };

    fetchTopics();
    setLoading(false);
}, []);

  const handleStartClick = async (topic) => {
    try {
        const { data } = await findFirstQuestionByTopic({ topic });
        if (data.question) {
            navigate(`/Kinematics/${data.question._id}`);
        }
    } catch (err) {
        console.error('Error fetching first question:', err);
    }
};
  return (
    <div className={styles.mainContainer }>
      {Loading?<Loader/>
      :
        <div className={styles.subcontainer}>
          <SearchBar chapterName={chapterName} />
          <TopicList topics={topics} start={handleStartClick}/>
        </div>
      }
    </div>
  )
}

export default TopicPage;




    
    