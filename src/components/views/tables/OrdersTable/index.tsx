import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import { useSelector } from 'react-redux';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import { RootState } from 'types';
import { useAppDispatch } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { openOrdersTable } from 'constants/index';
import { EmptyData, Pagination } from 'components';
import { walletsActions } from 'store/walletsSlice';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import OpenOrdersFilters from 'components/views/filters/OpenOrdersFilters';

import OrdersTableRow from './OrdersTableRow';
import styles from './OrdersTable.module.scss';

const OrdersTable = () => {
  const { filter, list, totalCount } = useSelector((state: RootState) => state.wallets.openOrders);
  const { accountById } = useSelector((state: RootState) => state.accounts);
  const walletId = accountById?.wallets?.length && accountById.wallets[0]?.id;

  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  // const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
  //   const isAsc = orderBy === property && filter.order === 'ASC';
  //   const orderText = isAsc ? 'DESC' : 'ASC';

  //   dispatch(openOrdersFilterUpdate({ order: orderText }));

  //   setOrderBy(property);
  // };

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(openOrdersFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      dispatch(openOrdersFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
    }
  };

  useEffect(() => {
    dispatch(walletsActions.getWalletOrders({ ...filter, id: walletId }));
  }, [walletId, filter.filter, filter, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        <OpenOrdersFilters />
        <Table aria-label='collapsible table' className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              <TableCell className={styles.container__header__ceil}>More</TableCell>
              {openOrdersTable.map(({ id, value, withBaseCurrency }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {!withBaseCurrency
                    ? value
                    : wrapWithBaseCurrency(value, accountById?.baseCurrency?.name)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <OrdersTableRow row={row} key={row.id} />
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
export default OrdersTable;
