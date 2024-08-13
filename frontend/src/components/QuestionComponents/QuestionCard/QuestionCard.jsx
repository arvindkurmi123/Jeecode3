import React, { useState } from 'react';
import './QuestionCard.css';
import flagIcon from '/images/flag-icon.png';
import noteIcon from '/images/note-icon.png';
import Note from '../Note/Note';

const difficultyStyles = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
};

const QuestionCard = ({ description, difficulty }) => {
  const [showNote, setShowNote] = useState(false);

  const handleNoteClick = () => {
    setShowNote(true);
  };

  const handleCloseNote = () => {
    setShowNote(false);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h1>Kinematics</h1>
        <div className="question-icons">
          <span className={`difficulty-tag ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
          <img src={noteIcon} alt="Note Icon" onClick={handleNoteClick} />
          <img src={flagIcon} alt="Flag Icon" />
        </div>
      </div>
      <div className="question-content">
        <p>{description}</p>
      </div>
      {showNote && <Note onClose={handleCloseNote} />}
    </div>
  );
};

export default QuestionCard;
