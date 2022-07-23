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
import { orderHistoryTradesHeader } from 'utils/table';
import { useAppDispatch } from 'hooks';
import { walletsActions } from 'store/walletsSlice';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';

import styles from './OrdersHistoryTable.module.scss';
import OrdersHistoryTableRow from './OrdersHistoryTableRow';

const OrdersHistoryTable = () => {
  const { filter, list, totalCount } = useSelector((state: RootState) => state.wallets.openOrders);
  const { id } = useParams();
  const convertedId = Number(id);

  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  // const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
  //   const isAsc = orderBy === property && accountsFilter.order === 'ASC';
  //   const orderText = isAsc ? 'DESC' : 'ASC';

  //   dispatch(openOrdersFilterUpdate({ order: orderText }));

  //   setOrderBy(property);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(openOrdersFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(openOrdersFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
  };

  useEffect(() => {
    dispatch(walletsActions.getWalletOpenOrders({ ...filter, id: convertedId as string | any }));
  }, [convertedId, filter, dispatch]);
  return (
    <>
      <div className={styles.wrapper}>
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              <TableCell className={styles.container__header__ceil}>More</TableCell>
              {orderHistoryTradesHeader.map(({ id, value }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(({ row }: any) => (
              <OrdersHistoryTableRow row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
        {!totalCount && <EmptyData />}
      </div>

      <Pagination
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        currentPage={page}
        rowsPerPage={filter?.take}
        totalCount={totalCount}
      />
    </>
  );
};
export default OrdersHistoryTable;
