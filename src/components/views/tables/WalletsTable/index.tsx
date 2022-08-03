import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { EmptyData, Typography, Pagination } from 'components';
import { RootState } from 'types';
import { walletTable } from 'constants/index';
import { useAppDispatch } from 'hooks';
import { walletsActions } from 'store/walletsSlice';
import { wrapWithBaseCurrency } from 'utils';
import WalletsFilters from 'components/views/filters/WalletsFilters';

import WalletsTableRow from './WalletsTableRow';
import styles from './WalletsTable.module.scss';
import WalletsSummaryTableRow from './WalletsSummaryTableRow';

const WalletsTable = () => {
  const dispatch = useAppDispatch();
  const { accountById } = useSelector((state: RootState) => state.accounts);
  const summary = useSelector((state: RootState) => state.wallets.summary);
  const { filter, list, totalCount } = useSelector((state: RootState) => state.wallets.records);

  const [page, setPage] = useState(0);

  const walletId = accountById?.wallets?.length && accountById.wallets[0]?.id;

  // const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
  //   const isAsc = orderBy === property && filter.order === 'ASC';
  //   const orderText = isAsc ? 'DESC' : 'ASC';

  //   dispatch(accountsFilterUpdate({ order: orderText }));

  //   setOrderBy(property);
  // };

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(walletsActions.recordsFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
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
              {walletTable.summaryTable.map(({ id, value, withBaseCurrency }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {!withBaseCurrency
                    ? value
                    : wrapWithBaseCurrency(value, accountById?.baseCurrency?.name)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <WalletsSummaryTableRow walletId={walletId} row={summary} />
          </TableBody>
        </Table>
        <div className={styles.filter}>
          <WalletsFilters />
        </div>
        <Typography className={styles.wrapper__title}>Assets</Typography>
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {walletTable.assetsTable.map(({ id, value, withBaseCurrency }) => (
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
