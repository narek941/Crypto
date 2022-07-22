import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { isUndefined } from 'lodash';

import { useAppDispatch } from 'hooks';
import { Bricks, Chart, Doughnut, Export } from 'components';
import { accountsAnalyticsLineChart } from 'utils/table';
import { accountsActions } from 'store/accountsSlice';
import { RootState } from 'types';
import AnalyticsTabs from 'components/views/AnalyticsTabs';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const convertedId = Number(id);

  const { accountById } = useSelector((state: RootState) => state.accounts);

  const renderLineCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Chart key={index} />
  ));

  const renderDoughnutCharts = accountsAnalyticsLineChart.map((item: any, index) => (
    <Doughnut key={index} />
  ));

  useEffect(() => {
    dispatch(accountsActions.getAccountSummary(convertedId));
    dispatch(accountsActions.getAccountById(convertedId));

    return () => {
      dispatch(accountsActions.removeAccountById());
    };
  }, [convertedId, dispatch]);

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
      <AnalyticsTabs />
    </div>
  );
};

export default AccountsAnalytics;
