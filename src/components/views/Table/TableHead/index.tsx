import React from 'react';
import classNames from 'classnames';
import { TableCell, TableHead, TableRow } from '@mui/material';

import { Vector } from 'assets/icons';

import { KeyOfData } from '../types';
import styles from '../Table.module.scss';

import { ITableHeadProps } from './types';

const TableHeadWrapper = ({
  sort,
  order,
  headCells,
  onRequestSort,
  type = 'primary',
}: ITableHeadProps) => {
  const createSortHandler = (property?: KeyOfData | any) => (event: React.MouseEvent<unknown>) => {
    if (property) {
      onRequestSort(event, property);
    }
  };

  const headerClass = classNames(styles.table__header, styles.table__header__row, {
    [styles.table__header__secondary]: type === 'secondary',
  });

  return (
    <TableHead>
      <TableRow className={headerClass}>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} className={styles.table__header__ceil}>
            {headCell.label !== 'Actions' ? (
              <button
                onClick={createSortHandler(headCell?.value)}
                className={styles.table__header__ceil__sort}
              >
                {headCell.label}

                {headCell?.value === sort && (
                  <span title='Sort' className={styles.table__header__ceil__sort__up}>
                    <Vector
                      className={classNames({
                        [styles.table__header__ceil__sort__up_icon]: order === 'ASC',
                      })}
                    />
                  </span>
                )}
              </button>
            ) : (
              <p>{headCell.label}</p>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadWrapper;
