import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EmptyData, Pagination } from 'components';
import { RootState } from 'types';
import { alertsTable } from 'constants/index';
import { useAppDispatch } from 'hooks';
import { accountsActions } from 'store/accountsSlice';

// import FilterWrapper from '../FilterWrapper';

import AnalyticsAlertTableRow from './AnalyticsAlertTableRow';
import styles from './AnalyticsAlertTable.module.scss';

const AnalyticsAlertTable = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { filter, list, totalCount } = useSelector((state: RootState) => state.accounts.alerts);

  const [page, setPage] = useState(0);

  const convertedId = Number(id);

  // const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
  //   const isAsc = orderBy === property && filter.order === 'ASC';
  //   const orderText = isAsc ? 'DESC' : 'ASC';

  //   dispatch(accountsFilterUpdate({ order: orderText }));

  //   setOrderBy(property);
  // };

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(accountsActions.accountsAlertsFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      dispatch(
        accountsActions.accountsAlertsFilterUpdate({ take: parseInt(event.target.value), skip: 0 }),
      );
    }
  };

  useEffect(() => {
    dispatch(accountsActions.getAccountAlerts({ ...filter, id: convertedId as string | any }));
  }, [convertedId, filter, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        {/* <FilterWrapper /> */}
        <Table className={styles.inner}>
          <TableHead className={styles.container__header}>
            <TableRow className={styles.container__header__row}>
              {alertsTable.accountAnalyticsTable.map(({ id, value }) => (
                <TableCell align='left' className={styles.container__header__ceil} key={id}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <AnalyticsAlertTableRow row={row} key={row.id} />
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

export default AnalyticsAlertTable;
