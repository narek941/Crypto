import { forwardRef } from 'react';
import classNames from 'classnames';

import { SearchIcon } from 'assets/icons';

import styles from './TableSearch.module.scss';

const TableSearch = forwardRef<any, any>(
  ({ name, className = '', onChange, onFocus, placeholder = 'search', ...rest }, ref) => {
    const inputClass = classNames(styles.search__input, className);

    return (
      <div className={styles.search}>
        <div className={styles.search__icon}>
          <SearchIcon type='submit' role='button' />
        </div>
        <div>
          <input
            {...rest}
            id={name}
            className={inputClass}
            placeholder={placeholder}
            ref={ref}
            name={name}
            autoComplete='off'
            onChange={onChange}
            onFocus={onFocus}
          />
        </div>
      </div>
    );
  },
);
export default TableSearch;
