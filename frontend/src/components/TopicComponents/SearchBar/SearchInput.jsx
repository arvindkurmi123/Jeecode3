import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = ({chapterName}) => {
  return (
    <div className={styles.searchContainer}>
        <span style={{fontSize:"20px",fontWeight:"bold",marginLeft:"5px"}}>{chapterName}</span>
      <span className={styles.icon}>🔍</span>
      <input
        type="text"
        placeholder="Search by Topic"
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchInput;