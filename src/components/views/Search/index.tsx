import * as React from 'react';

import { SearchIcon } from 'assets/icons';

import styles from './Search.module.scss';

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.search__icon}>
        <SearchIcon />
      </div>
      <div>
        <input className={styles.search__input} placeholder='Search'></input>
      </div>
    </div>
  );
};
export default Search;
