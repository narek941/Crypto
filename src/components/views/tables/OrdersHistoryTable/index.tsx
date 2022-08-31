import React, { useEffect, MouseEvent } from 'react';
import Table from '@mui/material/Table';
import { useSelector } from 'react-redux';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import classNames from 'classnames';

import { useAppDispatch } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { EmptyData, Pagination, ScrollWrapper } from 'components';
import { ordersHistoryTable } from 'constants/index';
import { accountsSelectors } from 'store/accountsSlice';
import { walletsActions, walletsSelectors } from 'store/walletsSlice';
import OrdersHistoryFilters from 'components/views/filters/OrdersHistoryFilters';
import { VectorIcon } from 'assets/icons';

import styles from './OrdersHistoryTable.module.scss';
import OrdersHistoryTableRow from './OrdersHistoryTableRow';

const OrdersHistoryTable = ({ filterVisible }: any) => {
  const accountById = useSelector(accountsSelectors.selectAccountById);
  const { filter, list, totalCount } = useSelector(walletsSelectors.selectOrders);

  const walletId = accountById?.wallets?.length && accountById.wallets[0]?.id;

  const dispatch = useAppDispatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(walletsActions.ordersFilterUpdate({ skip: Number(newPage) * filter.take }));
  };

  const orderSort = (elem: any): 'DESC' | 'ASC' => (elem.order === 'DESC' ? 'ASC' : 'DESC');

  const handleRequestSort = (_event: MouseEvent<unknown>, sort: any): void => {
    let newOrder = 'DESC';
    if (sort === filter.sort) {
      newOrder = orderSort(filter);
    } else {
      newOrder = 'DESC';
    }
    dispatch(walletsActions.ordersFilterUpdate({ sort, order: newOrder as 'DESC' | 'ASC' }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      dispatch(walletsActions.ordersFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
    }
  };

  useEffect(() => {
    dispatch(walletsActions.getWalletOrders({ ...filter, id: walletId }));
  }, [walletId, filter, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        {filterVisible && <OrdersHistoryFilters />}
        <ScrollWrapper>
          <Table className={styles.inner}>
            <TableHead className={styles.container__header}>
              <TableRow className={styles.container__header__row}>
                {ordersHistoryTable.map(({ id, label, withBaseCurrency, value }) => (
                  <TableCell align='left' className={styles.container__header__ceil} key={id}>
                    <div
                      role='button'
                      onClick={(e) => handleRequestSort(e, value)}
                      className={styles.container__header__ceil__sort}
                    >
                      <span style={{ position: 'relative' }}>
                        {!withBaseCurrency
                          ? label
                          : wrapWithBaseCurrency(label, accountById?.baseCurrency?.name)}
                        {value === filter.sort && (
                          <span title='Sort' className={styles.container__header__ceil__sort__up}>
                            <VectorIcon
                              className={classNames({
                                [styles.container__header__ceil__sort__up_icon]:
                                  filter.order === 'ASC',
                              })}
                            />
                          </span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <OrdersHistoryTableRow row={row} key={row.id} />
              ))}
            </TableBody>
          </Table>
          {!totalCount && <EmptyData />}
        </ScrollWrapper>
      </div>

      <Pagination
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        currentPage={filter.skip / filter.take || 0}
        rowsPerPage={filter?.take}
        totalCount={totalCount}
      />
    </>
  );
};
export default OrdersHistoryTable;
