import React, { useState } from 'react';

import Pagination from '../Pagination';
import Modal from '../Modal';

import TableHead from './TableHead';
import styles from './Table.module.scss';
import TableBody from './TableBody';
import { ITableProps, Order, KeyOfData } from './types';
import TableToolbar from './TableToolbar';

const Table = ({ rows, headCells, type, action, linkText, linkTo }: ITableProps) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<KeyOfData>('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openChart, setOpenChart] = useState(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChartAction = () => {
    setOpenChart(true);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <TableToolbar linkText={linkText} linkTo={linkTo} />
        <div className={styles.inner}>
          <div className={styles.table__wrapper}>
            <table className={styles.table}>
              <TableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
                type={type}
              />
              <TableBody
                order={order}
                orderBy={orderBy}
                rows={rows}
                page={page}
                type={type}
                action={action}
                handleChartAction={handleChartAction}
                rowsPerPage={rowsPerPage}
              />
            </table>
          </div>
          <Pagination
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            currentPage={page}
            rowsPerPage={rowsPerPage}
            totalCount={rows.length}
          />
        </div>
      </div>
      <Modal open={openChart} setOpen={setOpenChart} />
    </>
  );
};
export default Table;
