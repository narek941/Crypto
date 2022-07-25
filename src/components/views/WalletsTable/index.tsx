import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { EmptyData, Typography, Pagination } from 'components';
import { RootState } from 'types';
import { walletAssetsHeader, walletHeader } from 'utils/table';
import { useAppDispatch } from 'hooks';
import { walletsActions } from 'store/walletsSlice';

import WalletsTableRow from './WalletsTableRow';
import styles from './WalletsTable.module.scss';
import WalletsSummaryTableRow from './WalletsSummaryTableRow';

const WalletsTable = () => {
  const dispatch = useAppDispatch();
  const accounts = useSelector((state: RootState) => state.accounts);
  const summary = useSelector((state: RootState) => state.wallets.summary);
  const { filter, list, totalCount } = useSelector((state: RootState) => state.wallets.records);

  const [page, setPage] = useState(0);

  const walletId = accounts.accountById?.wallets?.length && accounts.accountById.wallets[0]?.id;

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
  }, [walletId, dispatch, filter]);

  return (
    <>
      <div className={styles.wrapper}>
        <Typography>In total</Typography>
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {walletHeader.map(({ id, value }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <WalletsSummaryTableRow walletId={walletId} row={summary} />
          </TableBody>
        </Table>

        <Typography>Assets</Typography>
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {walletAssetsHeader.map(({ id, value }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {value}
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
export default WalletsTable;
