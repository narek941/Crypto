import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'hooks';
import { Bricks, Chart, CollapsibleTable, Doughnut, Export } from 'components';
import { accountsAnalyticsData, accountsAnalyticsLineChart } from 'utils/table';
import { accountsActions } from 'store/accountsSlice';
import { RootState } from 'types';
import { accountsFilterUpdate } from 'store/accountsSlice/thunks';
import { KeyOfData } from 'components/views/Table/types';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics: React.FC = () => {
  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  const { accountsFilter } = useSelector((state: RootState) => state.accounts);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: KeyOfData) => {
    const isAsc = orderBy === property && accountsFilter.order === 'ASC';
    const orderText = isAsc ? 'DESC' : 'ASC';

    dispatch(accountsFilterUpdate({ order: orderText }));

    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(accountsFilterUpdate({ skip: Number(newPage) * accountsFilter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(accountsFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
  };

  const renderBricks = accountsAnalyticsData.map(({ name, value, moreInfo }: any, index) => (
    <Bricks key={index} header={name} value={value} moreText={moreInfo} />
  ));

  const renderLineCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Chart key={index} />
  ));

  const renderDoughnutCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Doughnut key={index} />
  ));

  useEffect(() => {
    dispatch(accountsActions.getAccountsAnalytics(accountsFilter));
  }, [accountsFilter, dispatch]);

  return (
    <div className={styles.analytics}>
      <div className={styles.analytics__export}>
        <Export />
      </div>
      <div className={styles.analytics__bricks__wrapper}>{renderBricks}</div>
      <div className={styles.analytics__chart}>{renderLineCharts}</div>
      <div className={styles.analytics__chart}>{renderDoughnutCharts}</div>
      <CollapsibleTable
        handleRequestSort={handleRequestSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
      />
    </div>
  );
};

export default AccountsAnalytics;
