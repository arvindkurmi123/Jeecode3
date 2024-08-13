import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findQuestionById, nextQuestion, checkAnswer } from '../../http';
import styles from './QuestionPage.module.css';
import QuestionCard from '../../components/QuestionComponents/QuestionCard/QuestionCard';
import Navigation from '../../components/QuestionComponents/Navigation/Navigation';
import AnswerCard from '../../components/QuestionComponents/AnswerCard/AnswerCard';
import Footer from '../../components/QuestionComponents/Footer/Footer';
import { useSelector } from 'react-redux';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const QuestionPage = () => {
  const [dividerX, setDividerX] = useState(window.innerWidth / 2);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const dividerRef = useRef(null);
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [timer, setTimer] = useState(0); // Time spent in seconds
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth); // Assuming user data is stored in Redux

  const minCardWidth = 300;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await findQuestionById({ questionId });
        setQuestion(data.question);
      } catch (err) {
        console.error('Error fetching question:', err);
      }
    };

    fetchQuestion();
  }, [questionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNextClick = async () => {
    try {
      const { data } = await nextQuestion({ questionId });
      if (data.question) {
        setQuestion(data.question);
        setQuestionHistory((prevHistory) => [...prevHistory, questionId]);
        navigate(`/Kinematics/${data.question._id}`);
        setTimer(0); // Reset timer when moving to the next question
        setSelectedOption(''); // Reset selected option for the next question
      } else {
        alert('No more questions or move to the next topic.');
      }
    } catch (err) {
      console.error('Error fetching next question:', err);
    }
  };

  const handlePreviousClick = () => {
    if (questionHistory.length > 0) {
      const previousQuestionId = questionHistory.pop();
      setQuestionHistory([...questionHistory]);
      navigate(`/Kinematics/${previousQuestionId}`);
      setTimer(0); // Reset timer when moving to the previous question
      setSelectedOption(''); // Reset selected option for the previous question
    } else {
      alert('No previous question.');
    }
  };

  const handleCheckAnswer = async () => {
    try {
        const payload = {
            questionId,
            username: user.name,
            optionSelected: selectedOption,
            timeSpent: timer,
        };
        const { data } = await checkAnswer(payload);
        console.log(data);
        if (data.correct) {
            toast.success('Correct Answer!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: true,
                transition: Slide,
                icon: '🎉',
            });
        } else {
            toast.error('Wrong Answer!', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: true,
                transition: Slide,
                icon: '❌',
            });
        }
    } catch (err) {
        console.error('Error checking answer:', err);
    }
};

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newDividerX = e.clientX - containerRect.left;

        if (newDividerX < minCardWidth) {
          setDividerX(minCardWidth);
        } else if (newDividerX > containerRect.width - minCardWidth) {
          setDividerX(containerRect.width - minCardWidth);
        } else {
          setDividerX(newDividerX);
        }
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e) => {
    setDragging(true);
  };

  return (
    <div className={styles.layoutContainer} ref={containerRef}>
      <div className={styles.topDiv}><Navigation /></div>
      <div className={styles.contentContainer}>
        <div className={styles.questions} style={{ width: dividerX }}>
          {question && (
            <QuestionCard description={question.description} difficulty={question.difficulty} />
          )}
        </div>
        <div className={styles.divider} ref={dividerRef} style={{ left: dividerX }} onMouseDown={handleMouseDown}></div>
        <div className={styles.answers} style={{ width: `calc(100% - ${dividerX}px - 3px)` }}>
          <div className={styles.answersContent}>
            {question && (
              <AnswerCard
                optionA={question.options.optiona}
                optionB={question.options.optionb}
                optionC={question.options.optionc}
                optionD={question.options.optiond}
                timer={{
                  hours: Math.floor(timer / 3600),
                  minutes: Math.floor((timer % 3600) / 60),
                  seconds: timer % 60,
                }}
                selectedOption={selectedOption}
                onOptionChange={handleOptionChange}
              />
            )}
          </div>
        </div>
      </div>
      <div><Footer onNext={handleNextClick} onPrevious={handlePreviousClick} onCheck={handleCheckAnswer} /></div>
    </div>
  );
};

export default QuestionPage;
