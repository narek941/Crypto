import React, { useState } from 'react';

import { useAppDispatch } from 'hooks';
import { filtersUpdate } from 'store/adminSlice/thunks';
import { EmptyData } from 'components';
import { adminActions } from 'store/adminSlice';

import Pagination from '../Pagination';
import Modal from '../Modal';

import TableHead from './TableHead';
import styles from './Table.module.scss';
import TableBody from './TableBody';
import { ITableProps, KeyOfData } from './types';
import TableToolbar from './TableToolbar';

const Table = ({
  rows = [],
  headCells,
  type,
  action,
  linkText,
  linkTo,
  take,
  order,
  totalCount,
}: ITableProps) => {
  const [open, setOpen] = useState(false);

  const toggleAlertOpen = () => setOpen(!open);
  const [page, setPage] = useState(0);
  const [openChart, setOpenChart] = useState(false);
  const dispatch = useAppDispatch();
  const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
    const isAsc = orderBy === property && order === 'ASC';
    const orderText = isAsc ? 'DESC' : 'ASC';
    dispatch(filtersUpdate({ order: orderText }));
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(filtersUpdate({ skip: Number(newPage) * take }));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filtersUpdate({ take: parseInt(event.target.value) }));
  };

  const handleChartAction = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id);
    setOpenChart(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearch = (value: any) => {
    // dispatch(filtersUpdate({ search: value.search }));
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBlock = (id: number) => {
    dispatch(adminActions.blockUser(id));
  };
  const handleUnblock = (id: number) => {
    dispatch(adminActions.unblockUser(id));
  };
  const handleDelete = async (id: number) => {
    await dispatch(adminActions.deleteUser(id)).unwrap();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <TableToolbar linkText={linkText} linkTo={linkTo} onClick={handleSearch} />
        <div className={styles.inner}>
          <div className={styles.table__wrapper}>
            <table className={styles.table}>
              <TableHead
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
                type={type}
              />
              {!!totalCount && (
                <TableBody
                  handleDelete={handleDelete}
                  rows={rows}
                  page={page}
                  type={type}
                  action={action}
                  open={open}
                  handleChartAction={handleChartAction}
                  rowsPerPage={take}
                  handleClose={handleClose}
                  toggleAlertOpen={toggleAlertOpen}
                  handleBlock={handleBlock}
                  handleUnblock={handleUnblock}
                />
              )}
            </table>
            {!totalCount && <EmptyData />}
          </div>
          <Pagination
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            currentPage={page}
            rowsPerPage={take}
            totalCount={totalCount}
          />
        </div>
      </div>
      <Modal open={openChart} setOpen={setOpenChart} />
    </>
  );
};
export default Table;
