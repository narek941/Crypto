import { MouseEvent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { ParamsWithId } from 'types';
import { useAppDispatch } from 'hooks';
import { alertsTable } from 'constants/index';
import { EmptyData, Pagination, ScrollWrapper } from 'components';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import AnalyticsAlertsFilters from 'components/views/filters/AnalyticsAlertsFilters';
import { VectorIcon } from 'assets/icons';

import AnalyticsAlertTableRow from './AnalyticsAlertTableRow';
import styles from './AnalyticsAlertTable.module.scss';

const AnalyticsAlertTable = ({ filterVisible }: any) => {
  const { id } = useParams<ParamsWithId>();
  const dispatch = useAppDispatch();
  const { filter, list, totalCount } = useSelector(accountsSelectors.selectAccountAccountsAlerts);

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(accountsActions.accountsAlertsFilterUpdate({ skip: Number(newPage) * filter.take }));
  };

  const orderSort = (elem: any): 'DESC' | 'ASC' => (elem.order === 'DESC' ? 'ASC' : 'DESC');

  const handleRequestSort = (_event: MouseEvent<unknown>, sort: any): void => {
    let newOrder = 'DESC';
    if (sort === filter.sort) {
      newOrder = orderSort(filter);
    } else {
      newOrder = 'DESC';
    }
    dispatch(
      accountsActions.accountsAlertsFilterUpdate({ sort, order: newOrder as 'DESC' | 'ASC' }),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      dispatch(
        accountsActions.accountsAlertsFilterUpdate({ take: parseInt(event.target.value), skip: 0 }),
      );
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(accountsActions.getAccountAlerts({ ...filter, id }));
    }
  }, [id, filter, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        {filterVisible && <AnalyticsAlertsFilters />}
        <ScrollWrapper>
          <Table className={styles.inner}>
            <TableHead className={styles.container__header}>
              <TableRow className={styles.container__header__row}>
                {alertsTable.accountAnalyticsTable.map(({ id, label, value }) => (
                  <TableCell align='left' className={styles.container__header__ceil} key={id}>
                    <div
                      role='button'
                      onClick={(e) => handleRequestSort(e, value)}
                      className={styles.container__header__ceil__sort}
                    >
                      <span style={{ position: 'relative' }}>
                        {label}
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
                <AnalyticsAlertTableRow row={row} key={row.id} />
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

export default AnalyticsAlertTable;
