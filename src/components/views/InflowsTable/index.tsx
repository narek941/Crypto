import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { v4 as uuid4 } from 'uuid';

import { EmptyData, Pagination } from 'components';
import { RootState } from 'types';
import { inflowHeader } from 'utils/table';
import { useAppDispatch } from 'hooks';
import { walletsActions } from 'store/walletsSlice';
import { inflowFilterUpdate } from 'store/walletsSlice/thunks';

import InflowsTableRow from './InflowsTableRow';
import styles from './InflowsTable.module.scss';

const InflowsTable = () => {
  const accounts = useSelector((state: RootState) => state.accounts);
  const { filter, list, totalCount } = useSelector((state: RootState) => state.wallets.inflow);
  const walletId = accounts.accountById?.wallets?.length && accounts.accountById.wallets[0]?.id;
  // const { id } = useParams();
  // const convertedId = Number(id);
  const [page, setPage] = useState(0);

  const dispatch = useAppDispatch();
  // const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
  //   const isAsc = orderBy === property && filter.order === 'ASC';
  //   const orderText = isAsc ? 'DESC' : 'ASC';

  //   dispatch(inflowFilterUpdate({ order: orderText }));

  //   setOrderBy(property);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(inflowFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inflowFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
  };

  useEffect(() => {
    dispatch(walletsActions.getWalletInflow({ ...filter, walletId: walletId as string | any }));
  }, [walletId, filter, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {inflowHeader.map(({ id, value }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {totalCount && (
            <TableBody>
              {list?.map((row) => (
                <InflowsTableRow row={row} key={uuid4()} />
              ))}
            </TableBody>
          )}
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
export default InflowsTable;
