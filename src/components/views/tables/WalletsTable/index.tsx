import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import React, { useState, useEffect, MouseEvent } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { walletTable } from 'constants/index';
import { accountsSelectors } from 'store/accountsSlice';
import { EmptyData, Typography, Pagination } from 'components';
import { walletsActions, walletsSelectors } from 'store/walletsSlice';
import WalletsFilters from 'components/views/filters/WalletsFilters';
import { VectorIcon } from 'assets/icons';

import styles from './WalletsTable.module.scss';
import WalletsTableRow from './WalletsTableRow';
import WalletsSummaryTableRow from './WalletsSummaryTableRow';

const WalletsTable = ({ filterVisible }: any) => {
  const dispatch = useAppDispatch();
  const accountById = useSelector(accountsSelectors.selectAccountById);
  const summary = useSelector(walletsSelectors.selectSummary);
  const { filter, list, totalCount } = useSelector(walletsSelectors.selectRecords);

  const [page, setPage] = useState(0);

  const walletId = accountById?.wallets?.length && accountById.wallets[0]?.id;

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(walletsActions.recordsFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
  };

  const orderSort = (elem: any): 'DESC' | 'ASC' => (elem.order === 'DESC' ? 'ASC' : 'DESC');

  const handleRequestSort = (_event: MouseEvent<unknown>, sort: any): void => {
    let newOrder = 'DESC';
    if (sort === filter.sort) {
      newOrder = orderSort(filter);
    } else {
      newOrder = 'DESC';
    }
    dispatch(walletsActions.recordsFilterUpdate({ sort, order: newOrder as 'DESC' | 'ASC' }));
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      dispatch(walletsActions.recordsFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
    }
  };

  useEffect(() => {
    dispatch(walletsActions.getWalletSummary(walletId));
    dispatch(walletsActions.getWalletRecords({ ...filter, id: walletId }));
  }, [walletId, dispatch, filter, filter.filter]);

  return (
    <>
      <div className={styles.wrapper}>
        <Typography className={styles.wrapper__title}>In total</Typography>
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {walletTable.summaryTable.map(({ id, label, withBaseCurrency }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {!withBaseCurrency
                    ? label
                    : wrapWithBaseCurrency(label, accountById?.baseCurrency?.name)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <WalletsSummaryTableRow row={summary} />
          </TableBody>
        </Table>
        {filterVisible && (
          <div className={styles.filter}>
            <WalletsFilters />
          </div>
        )}
        <Typography className={styles.wrapper__title}>Assets</Typography>
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {walletTable.assetsTable.map(({ id, value, withBaseCurrency, label }) => (
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
              <WalletsTableRow row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
        {!totalCount && <EmptyData className={styles.empty} />}
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
export default WalletsTable;
