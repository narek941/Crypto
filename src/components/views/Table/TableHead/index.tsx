import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames';

import { KeyOfData } from '../types';
import styles from '../Table.module.scss';

import { ITableHeadProps } from './types';

const TableHead = ({
  order,
  orderBy,
  onRequestSort,
  headCells,
  type = 'primary',
}: ITableHeadProps) => {
  const createSortHandler = (property: KeyOfData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const headerClass = classNames(styles.table__header, styles.table__header__row, {
    [styles.table__header__secondary]: type === 'secondary',
  });

  return (
    <TableRow className={headerClass}>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          className={styles.table__header__ceil}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <div onClick={createSortHandler(headCell.id)}>{headCell.label}</div>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableHead;
