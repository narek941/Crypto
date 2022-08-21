import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import { useSelector } from 'react-redux';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import { useAppDispatch } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { openOrdersTable } from 'constants/index';
import { EmptyData, Pagination, ScrollWrapper } from 'components';
import { accountsSelectors } from 'store/accountsSlice';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import { walletsActions, walletsSelectors } from 'store/walletsSlice';
import OpenOrdersFilters from 'components/views/filters/OpenOrdersFilters';

import OrdersTableRow from './OrdersTableRow';
import styles from './OrdersTable.module.scss';

const OrdersTable = ({ filterVisible }: any) => {
  const { filter, list, totalCount } = useSelector(walletsSelectors.selectOpenOrders);
  const accountById = useSelector(accountsSelectors.selectAccountById);
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
    dispatch(walletsActions.getWalletOpenOrders({ ...filter, id: walletId }));
  }, [walletId, filter.search, filter, dispatch, filter.filter]);

  return (
    <>
      <div className={styles.wrapper}>
        {filterVisible && <OpenOrdersFilters />}
        <ScrollWrapper>
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
        </ScrollWrapper>
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
