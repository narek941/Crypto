import React from 'react';
import classNames from 'classnames';
import { TableCell, TableHead, TableRow } from '@mui/material';

import { VectorIcon } from 'assets/icons';

import styles from '../Table.module.scss';

import { ITableHeadProps } from './types';

const TableHeadWrapper = ({
  sort,
  order,
  headCells,
  onRequestSort,
  type = 'primary',
}: ITableHeadProps) => {
  const headerClass = classNames(styles.table__header, styles.table__header__row, {
    [styles.table__header__secondary]: type === 'secondary',
  });

  return (
    <TableHead>
      <TableRow className={headerClass}>
        {headCells.map(({ id, value, label }) => (
          <TableCell key={id} className={styles.table__header__ceil}>
            {label !== 'Actions' ? (
              <button
                onClick={(e) => onRequestSort(e, value)}
                className={styles.table__header__ceil__sort}
              >
                {label}

                {value === sort && (
                  <span title='Sort' className={styles.table__header__ceil__sort__up}>
                    <VectorIcon
                      className={classNames({
                        [styles.table__header__ceil__sort__up_icon]: order === 'ASC',
                      })}
                    />
                  </span>
                )}
              </button>
            ) : (
              <p>{label}</p>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadWrapper;
