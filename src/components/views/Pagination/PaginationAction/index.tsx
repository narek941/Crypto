import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ChevronLeftIcon, ChevronRightIcon, SkipToFirstIcon, SkipToLastIcon } from 'assets/icons';
import { usePaginationRange, DOTS } from 'hooks/usePaginationRange';

import { TablePaginationActionsProps } from './types';
import styles from './PaginationAction.module.scss';

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  const [totalPageCount, setTotalPageCount] = useState(Math.ceil(count / rowsPerPage));
  const isEmptyCount = count === 0;

  useEffect(() => {
    setTotalPageCount(Math.ceil(count / rowsPerPage));
  }, [rowsPerPage, count]);

  const paginationRange = usePaginationRange({
    totalPageCount,
    page,
  });
  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handleChangePageButtonClick = (event: any) => {
    onPageChange(event, Number(event.target.innerText) - 1);
  };

  return (
    <div className={styles.action}>
      <button
        className={styles.action__item}
        onClick={handleFirstPageButtonClick}
        disabled={isEmptyCount || page === 0}
        aria-label='first page'
      >
        <SkipToFirstIcon />
      </button>
      <button
        className={styles.action__item}
        onClick={handleBackButtonClick}
        disabled={isEmptyCount || page === 0}
        aria-label='Prev'
      >
        <ChevronLeftIcon />
        <span className={styles.action__item__text}>Prev</span>
      </button>

      {paginationRange?.map((item, index) => {
        if (item === DOTS) {
          return (
            <span key={index} className={styles.action__item}>
              &#8230;
            </span>
          );
        }

        return (
          <span
            key={index}
            onClick={handleChangePageButtonClick}
            className={classNames(styles.action__item, {
              [styles.action__item__active]: page === Number(item) - 1,
            })}
          >
            {item}
          </span>
        );
      })}

      <button
        className={styles.action__item}
        onClick={handleNextButtonClick}
        disabled={isEmptyCount || page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Next'
      >
        <span className={styles.action__item__text}>Next</span>
        <ChevronRightIcon />
      </button>
      <button
        className={styles.action__item}
        onClick={handleLastPageButtonClick}
        disabled={isEmptyCount || page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        <SkipToLastIcon />
      </button>
    </div>
  );
};
export default TablePaginationActions;
