import React from 'react';
import classNames from 'classnames';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { KeyOfData } from '../types';
import styles from '../Table.module.scss';

import { ITableHeadProps } from './types';

const TableHeadWrapper = ({ onRequestSort, headCells, type = 'primary' }: ITableHeadProps) => {
  const createSortHandler = (property: KeyOfData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const headerClass = classNames(styles.table__header, styles.table__header__row, {
    [styles.table__header__secondary]: type === 'secondary',
  });

  return (
    <TableHead>
      <TableRow className={headerClass}>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} className={styles.table__header__ceil}>
            {headCell.isSort ? (
              <TableSortLabel
                onClick={createSortHandler(headCell.id)}
                className={styles.table__header__ceil__sort}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <div onClick={createSortHandler(headCell.id)}>{headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadWrapper;
