import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EmptyData, Pagination } from 'components';
import { RootState } from 'types';
import { orderTradesHeader } from 'utils/table';
import { useAppDispatch } from 'hooks';
import { accountsActions } from 'store/accountsSlice';
import { accountsFilterUpdate } from 'store/accountsSlice/thunks';

import OrdersTableRow from './OrdersTableRow';
import styles from './OrdersTable.module.scss';

const OrdersTable = () => {
  const { accountsFilter, openOrders, openOrdersTotalCount } = useSelector(
    (state: RootState) => state.accounts,
  );
  const { id } = useParams();
  const convertedId = Number(id);

  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  // const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
  //   const isAsc = orderBy === property && accountsFilter.order === 'ASC';
  //   const orderText = isAsc ? 'DESC' : 'ASC';

  //   dispatch(accountsFilterUpdate({ order: orderText }));

  //   setOrderBy(property);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(accountsFilterUpdate({ skip: Number(newPage) * accountsFilter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(accountsFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
  };

  useEffect(() => {
    dispatch(
      accountsActions.getWalletOpenOrders({ ...accountsFilter, id: convertedId as string | any }),
    );
  }, [convertedId, accountsFilter, dispatch]);
  return (
    <>
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
    </>
  );
};
export default OrdersTable;