import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames';

import { BinIcon, ChartIcon, SettingIcon } from 'icons';

import styles from '../Table.module.scss';

import { ITableBodyProps } from './types';

const TableBody = ({
  rows,
  page,
  rowsPerPage,
  action = false,
  handleChartAction,
}: ITableBodyProps) => {
  const actionCellClassnames = classNames(
    styles.table__body__row__ceil,
    styles.table__body__row__ceil__actions,
  );
  return (
    <tbody className={styles.table__body}>
      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => {
        return (
          <TableRow className={styles.table__body__row} tabIndex={-1} key={index}>
            {row.map((item: string) => {
              return (
                <TableCell className={styles.table__body__row__ceil} key={item} align='left'>
                  {item}
                </TableCell>
              );
            })}

            {action && (
              <TableCell className={actionCellClassnames} align='left'>
                <ChartIcon
                  className={styles.table__body__row__ceil__actions__chart}
                  onClick={handleChartAction}
                />
                <SettingIcon className={styles.table__body__row__ceil__actions__setting} />
                <BinIcon className={styles.table__body__row__ceil__actions__bin} />
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </tbody>
  );
};

export default TableBody;
