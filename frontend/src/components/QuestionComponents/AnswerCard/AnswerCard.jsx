import React, { useState, useEffect } from 'react';
import './AnswerCard.css';

const AnswerCard = ({ optionA, optionB, optionC, optionD, timer, selectedOption, onOptionChange }) => {
  const { hours, minutes, seconds } = timer;

  const handleOptionChange = (e) => {
    onOptionChange(e.target.value);
  };

  return (
    <div className="answer-card">
      <div className="answer-header">
        <h1>Choose the best option</h1>
        <div className="timer">
          <span className="timer-icon">⏱</span>
          <span className="timer-text">{`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</span>
        </div>
      </div>
      <div className="answer-content">
        <div className="answer-option">
          <input
            type="radio"
            id="option1"
            name="option"
            value="A"
            checked={selectedOption === 'A'}
            onChange={handleOptionChange}
          />
          <label htmlFor="option1">{optionA}</label>
        </div>
        <div className="answer-option">
          <input
            type="radio"
            id="option2"
            name="option"
            value="B"
            checked={selectedOption === 'B'}
            onChange={handleOptionChange}
          />
          <label htmlFor="option2">{optionB}</label>
        </div>
        <div className="answer-option">
          <input
            type="radio"
            id="option3"
            name="option"
            value="C"
            checked={selectedOption === 'C'}
            onChange={handleOptionChange}
          />
          <label htmlFor="option3">{optionC}</label>
        </div>
        <div className="answer-option">
          <input
            type="radio"
            id="option4"
            name="option"
            value="D"
            checked={selectedOption === 'D'}
            onChange={handleOptionChange}
          />
          <label htmlFor="option4">{optionD}</label>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
