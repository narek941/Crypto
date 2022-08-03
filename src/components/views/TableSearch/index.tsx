import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { CancelIcon, SearchIcon } from 'assets/icons';
import useDebounce from 'hooks/useDebounce';

import styles from './TableSearch.module.scss';

const TableSearch = React.forwardRef<any, any>(
  (
    {
      name,
      className = '',
      onFocus,
      placeholder = 'search',
      callback,
      filterName,
      debouncedTime = 2000,
      clearAll,
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
      if (callback && filterName && state) {
        callback(filterName, state);
      }
    };

    const handleClear = () => setState('');

    useEffect(() => handleClear(), [clearAll]);

    useEffect(handleSubmit, [debouncedValue]);

    return (
      <div className={styles.search}>
        <div className={styles.search__icon}>
          {!state ? <SearchIcon /> : <CancelIcon onClick={handleClear} />}
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
