import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { CloseIcon, SearchIcon } from 'assets/icons';
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
      debouncedTime = 700,
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
      if (callback && filterName) {
        callback(filterName, state);
      }
    };

    const handleClear = () => {
      setState('');
      callback(filterName, null);
    };

    useEffect(() => handleClear(), [clearAll]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handleSubmit, [debouncedValue]);

    return (
      <div className={styles.search}>
        <div className={styles.search__icon}>
          {!state ? <SearchIcon /> : <CloseIcon onClick={handleClear} />}
        </div>
        <div>
          <input
            {...rest}
            id={name}
            className={inputClass}
            placeholder={placeholder}
            ref={ref}
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
