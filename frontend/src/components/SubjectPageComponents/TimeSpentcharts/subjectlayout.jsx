import React from 'react';
import styles from './subjectlayout.module.css'; // Import the CSS module

const SubjectLayout = ({ setSelectedSubject }) => {
  const menuItem = [
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Mathematics" },
  ];

  // Handle dropdown change event
  const handleChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className={styles['dropdown-container']}>
      <nav>
        <select 
          className={styles['dropdown']} 
          onChange={handleChange} 
          defaultValue="Physics"
        >
          {menuItem.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </nav>
    </div>
  );
};

export default SubjectLayout;