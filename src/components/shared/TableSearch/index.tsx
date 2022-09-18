import React, { ForwardedRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CloseIcon, SearchIcon } from 'assets/icons';
import { useDebounce } from 'hooks';

import styles from './TableSearch.module.scss';
import { ITableSearch } from './types';

const TableSearch = React.forwardRef<any, any>(
  (
    {
      name,
      type,
      closed,
      onFocus,
      tooltip,
      callback,
      clearAll,
      filterName,
      debouncedTime = 700,
      placeholder = 'search',
      className = '',
      ...rest
    }: ITableSearch,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const { t } = useTranslation();
    const inputClass = classNames(styles.search__input, className);
    const [state, setState] = useState<string>('');
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => handleClear(), [clearAll]);

    useEffect(() => {
      if (closed) {
        handleClear();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closed]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(handleSubmit, [debouncedValue]);

    return (
      <div className={styles.search}>
        <div className={styles.search__icon}>
          <Tooltip followCursor={true} placement='bottom' title={t(tooltip)}>
            <div>{state && <CloseIcon onClick={handleClear} />}</div>
          </Tooltip>
          <div>
            <SearchIcon />
          </div>
        </div>
        <div>
          <input
            {...rest}
            id={name}
            ref={ref}
            type={type}
            value={state}
            onFocus={onFocus}
            autoComplete='off'
            className={inputClass}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  },
);
export default TableSearch;
