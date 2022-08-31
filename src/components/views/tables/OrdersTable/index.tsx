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
import { openOrdersTable } from 'constants/index';
import { EmptyData, Pagination, ScrollWrapper } from 'components';
import { accountsSelectors } from 'store/accountsSlice';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import { walletsActions, walletsSelectors } from 'store/walletsSlice';
import OpenOrdersFilters from 'components/views/filters/OpenOrdersFilters';
import { VectorIcon } from 'assets/icons';

import OrdersTableRow from './OrdersTableRow';
import styles from './OrdersTable.module.scss';

const OrdersTable = ({ filterVisible }: any) => {
  const { filter, list, totalCount } = useSelector(walletsSelectors.selectOpenOrders);
  const accountById = useSelector(accountsSelectors.selectAccountById);
  const walletId = accountById?.wallets?.length && accountById.wallets[0]?.id;

  const dispatch = useAppDispatch();

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(openOrdersFilterUpdate({ skip: Number(newPage) * filter.take }));
  };

  const orderSort = (elem: any): 'DESC' | 'ASC' => (elem.order === 'DESC' ? 'ASC' : 'DESC');

  const handleRequestSort = (_event: MouseEvent<unknown>, sort: any): void => {
    let newOrder = 'DESC';
    if (sort === filter.sort) {
      newOrder = orderSort(filter);
    } else {
      newOrder = 'DESC';
    }
    dispatch(openOrdersFilterUpdate({ sort, order: newOrder as 'DESC' | 'ASC' }));
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
                {openOrdersTable.map(({ id, label, withBaseCurrency, value }) => (
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
        currentPage={filter.skip / filter.take || 0}
        rowsPerPage={filter?.take}
        totalCount={totalCount}
      />
    </>
  );
};
export default OrdersTable;
