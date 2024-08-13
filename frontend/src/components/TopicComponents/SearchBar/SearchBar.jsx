import React from 'react';
import styles from './SearchBar.module.css';
import SearchInput from './SearchInput';
import DateDisplay from './DateDisplay';

const SearchBar = ({chapterName}) => {
  return (
    <div className={styles.mainContainer}>
      <SearchInput chapterName={chapterName} />
      <DateDisplay />
    </div>
  );
};

export default SearchBar;