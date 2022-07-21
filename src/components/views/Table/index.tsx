import React, { useState } from 'react';
import moment from 'moment';

import { useAppDispatch } from 'hooks';
import { usersFilterUpdate } from 'store/adminSlice/thunks';
import { EmptyData } from 'components';
import { adminActions } from 'store/adminSlice';
import { accountsFilterUpdate } from 'store/accountsSlice/thunks';

import Pagination from '../Pagination';
import Modal from '../Modal';

import TableHead from './TableHead';
import styles from './Table.module.scss';
import TableBody from './TableBody';
import { ITableProps, KeyOfData } from './types';
import TableToolbar from './TableToolbar';
import TableAccountBody from './TableAccountsBody';

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
  const [selectedAccountData, setSelectedAccountData] = useState<{
    id: number | null;
    statistics: any | null;
    startCapitalInBaseCurrency: any | null;
  }>({
    id: null,
    statistics: null,
    startCapitalInBaseCurrency: null,
  });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
    const isAsc = orderBy === property && order === 'ASC';
    const orderText = isAsc ? 'DESC' : 'ASC';
    if (action === 'users') {
      dispatch(usersFilterUpdate({ order: orderText }));
    } else {
      dispatch(accountsFilterUpdate({ order: orderText }));
    }

    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    if (action === 'users') {
      dispatch(usersFilterUpdate({ skip: Number(newPage) * take }));
    } else {
      dispatch(accountsFilterUpdate({ skip: Number(newPage) * take }));
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (action === 'users') {
      dispatch(usersFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
    } else {
      dispatch(accountsFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
    }
  };

  const handleChartAction = (accountData: any) => {
    setSelectedAccountData(accountData);
    setOpenChart(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearch = (value: any) => {
    if (action === 'users') {
      dispatch(
        usersFilterUpdate({
          search: {
            role: value.search,
            email: value.search,
            status: value.search,
            username: value.search,
            id: Number(value.search) || -1,
          },
        }),
      );
    } else {
      dispatch(
        accountsFilterUpdate({ search: { id: Number(value.search) || -1, name: value.search } }),
      );
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBlock = async (id: number) => {
    if (action === 'users') {
      await dispatch(adminActions.blockUser(id)).unwrap();
    } else {
      await dispatch(adminActions.blockAccount(id)).unwrap();
    }
  };

  const handleUnblock = async (id: number) => {
    if (action === 'users') {
      await dispatch(adminActions.unblockUser(id)).unwrap();
    } else {
      await dispatch(adminActions.unblockAccount(id)).unwrap();
    }
  };

  const handleDelete = async (id: number) => {
    if (action === 'users') {
      await dispatch(adminActions.deleteUser(id)).unwrap();
    } else {
      await dispatch(adminActions.deleteAccount(id)).unwrap();
    }
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
              {!!totalCount && action === 'users' ? (
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
              ) : (
                <TableAccountBody
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
        </div>
        <Pagination
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          currentPage={page}
          rowsPerPage={take}
          totalCount={totalCount}
        />
      </div>
      <Modal
        open={openChart}
        id={selectedAccountData.id}
        setOpen={setOpenChart}
        modalList={[
          {
            id: 1,
            key: 'Seed Capital',
            value: selectedAccountData.startCapitalInBaseCurrency,
          },
          {
            id: 2,
            key: 'Current open profit, USDT',
            value: selectedAccountData.statistics?.currentOpenProfitInBaseCurrency,
          },
          {
            id: 3,
            key: 'Earned capital, USDT',
            value: selectedAccountData.statistics?.earnedCapitalInBaseCurrency,
          },
          {
            id: 4,
            key: 'Performance',
            value: `${selectedAccountData.statistics?.productivityInPercent}%`,
          },
          {
            id: 5,
            key: 'Current Capital, USDT',
            value: selectedAccountData.statistics?.startCapitalInBaseCurrency,
            info: `Updated at ${moment(selectedAccountData.statistics?.refreshDate).format(
              'DD.MM.YYYY HH:MM:SS',
            )}`,
          },
        ]}
      />
    </>
  );
};
export default Table;
