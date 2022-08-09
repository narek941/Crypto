import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import { RootState } from 'types';
import { useAppDispatch } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { EmptyData, Pagination } from 'components';
import { walletsActions } from 'store/walletsSlice';
import { inflowOutflowTable } from 'constants/index';
import { inflowFilterUpdate } from 'store/walletsSlice/thunks';
import InflowsFilters from 'components/views/filters/InflowsFilters';

import InflowsTableRow from './InflowsTableRow';
import styles from './InflowsTable.module.scss';

const InflowsTable = () => {
  const { accountById } = useSelector((state: RootState) => state.accounts);
  const { filter, list, totalCount } = useSelector((state: RootState) => state.wallets.inflow);
  const walletId = accountById?.wallets?.length && accountById.wallets[0]?.id;
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

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(inflowFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      dispatch(inflowFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
    }
  };

  useEffect(() => {
    if (walletId) {
      dispatch(walletsActions.getWalletInflow({ ...filter, walletId }));
    }
  }, [walletId, filter, dispatch, filter.filter]);

  return (
    <>
      <div className={styles.wrapper}>
        <InflowsFilters />
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {inflowOutflowTable.map(({ id, value, withBaseCurrency }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {!withBaseCurrency
                    ? value
                    : wrapWithBaseCurrency(value, accountById?.baseCurrency?.name)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!!totalCount && (
            <TableBody>
              {list?.map((row) => (
                <InflowsTableRow row={row} key={row.id} />
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
