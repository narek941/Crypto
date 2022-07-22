import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { isUndefined } from 'lodash';

import { useAppDispatch } from 'hooks';
import { Bricks, Chart, OrdersTable, Doughnut, Export } from 'components';
import { accountsAnalyticsLineChart } from 'utils/table';
import { accountsActions } from 'store/accountsSlice';
import { RootState } from 'types';
import { accountsFilterUpdate } from 'store/accountsSlice/thunks';
import { KeyOfData } from 'components/views/Table/types';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics: React.FC = () => {
  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const convertedId = Number(id);
  const [orderBy, setOrderBy] = useState<KeyOfData>('id');

  const { accountsFilter, accountById } = useSelector((state: RootState) => state.accounts);

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

  const renderLineCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Chart key={index} />
  ));

  const renderDoughnutCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Doughnut key={index} />
  ));

  useEffect(() => {
    dispatch(accountsActions.getWalletOpenOrders({ ...accountsFilter, id: id as string }));
  }, [id, accountsFilter, dispatch]);

  useEffect(() => {
    dispatch(accountsActions.getAccountSummary(convertedId));
    dispatch(accountsActions.getAccountById(convertedId));

    return () => {
      dispatch(accountsActions.removeAccountById());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.analytics}>
      <div className={styles.analytics__export}>
        <Export />
      </div>
      <div className={styles.analytics__bricks__wrapper}>
        <Bricks header='Seed Capital' value={accountById.startCapitalInBaseCurrency} />
        <Bricks
          header='Performance'
          value={
            !isUndefined(accountById.statistics?.productivityInPercent)
              ? `${accountById.statistics?.productivityInPercent}%`
              : ''
          }
        />
        <Bricks
          header='Current Capital, USDT'
          value={accountById.statistics?.startCapitalInBaseCurrency}
          moreText={
            !isUndefined(accountById.statistics?.refreshDate)
              ? `Updated at ${moment(accountById.statistics?.refreshDate).format(
                  'DD.MM.YYYY HH:MM:SS',
                )}`
              : ''
          }
        />
        <Bricks
          header='Current open profit'
          value={accountById.statistics?.currentOpenProfitInBaseCurrency}
        />
        <Bricks
          header='Earned capital, USDT'
          value={accountById.statistics?.earnedCapitalInBaseCurrency}
        />
      </div>
      <div className={styles.analytics__chart}>{renderLineCharts}</div>
      <div className={styles.analytics__chart}>{renderDoughnutCharts}</div>
      <OrdersTable
        handleRequestSort={handleRequestSort}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
      />
    </div>
  );
};

export default AccountsAnalytics;
