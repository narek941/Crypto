import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import { CancelIcon, SearchIcon } from 'assets/icons';
import useDebounce from 'hooks/useDebounce';

import styles from './TableSearch.module.scss';

const TableSearch = forwardRef<any, any>(
  (
    {
      name,
      className = '',
      onFocus,
      placeholder = 'search',
      callback,
      filterName,
      debouncedTime = 2000,
      ...rest
    },
    ref,
  ) => {
    const inputClass = classNames(styles.search__input, className);
    const [state, setState] = useState('');
    const debouncedValue = useDebounce<string>(state, debouncedTime);

    const handleChange = (e: any) => {
      setState(e.target.value);
    };

    const handleSubmit = () => {
      if (callback && filterName) {
        callback(filterName, state);
      }
    };

    useEffect(handleSubmit, [debouncedValue]);

    return (
      <div className={styles.search}>
        <div className={styles.search__icon}>
          {!state ? <SearchIcon /> : <CancelIcon onClick={() => setState('')} />}
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
            onChange={handleChange}
            onFocus={onFocus}
            value={state}
          />
        </div>
      </div>
    );
  },
);
export default TableSearch;
