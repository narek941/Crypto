import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

import { EmptyData, Pagination } from 'components';
import { RootState } from 'types';
import { orderTradesHeader } from 'utils/table';

import styles from './OrdersTable.module.scss';
import OrdersTableRow from './OrdersTableRow';

const OrdersTable = ({ handleChangePage, handleChangeRowsPerPage, page }: any) => {
  const { accountsFilter, openOrders, openOrdersTotalCount } = useSelector(
    (state: RootState) => state.accounts,
  );

  return (
    <TableContainer component={Paper} className={styles.container}>
      <div className={styles.tabs}>
        <span className={styles.tabs__selected}>Open orders</span>
        <span>Wallet</span>
        <span>Inflows & Outflows</span>
        <span>Orders History</span>
        <span>Trades</span>
        <span>Alerts</span>
      </div>
      <div className={styles.wrapper}>
        <Table aria-label='collapsible table' className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              <TableCell className={styles.container__header__ceil}>More</TableCell>
              {orderTradesHeader.map(({ id, value }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {openOrders.map((row) => (
              <OrdersTableRow row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
        {!openOrdersTotalCount && <EmptyData />}
      </div>

      <Pagination
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        currentPage={page}
        rowsPerPage={accountsFilter?.take}
        totalCount={openOrdersTotalCount}
      />
    </TableContainer>
  );
};
export default OrdersTable;
