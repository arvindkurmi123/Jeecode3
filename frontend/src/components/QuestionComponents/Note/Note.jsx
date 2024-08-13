import React, { useState, useEffect } from 'react';
import './Note.css';
import { FiX, FiSave } from 'react-icons/fi';

const Note = ({ onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="note-card"
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
    >
      <div className="note-header">
        <FiSave className="note-icon" />
        <FiX className="note-icon" onClick={onClose} />
      </div>
      <textarea className="note-textarea" placeholder="Write your note here..."></textarea>
    </div>
  );
};

export default Note;
