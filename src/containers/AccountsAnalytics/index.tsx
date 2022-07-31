import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from 'types';
import { useAppDispatch } from 'hooks';
import { charts } from 'constants/index';
import { wrapWithBaseCurrency } from 'utils';
import { accountsActions } from 'store/accountsSlice';
import { Bricks, Chart, Doughnut, Export, AnalyticsTabs } from 'components';
import { adminActions } from 'store/adminSlice';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const convertedId = Number(id);

  const { accountById } = useSelector((state: RootState) => state.accounts);

  const renderLineCharts = charts.accountsAnalyticsChart.lineChart.map((item: any, index) => (
    <Chart key={index} />
  ));

  const renderDoughnutCharts = charts.accountsAnalyticsChart.lineChart.map((item: any, index) => (
    <Doughnut key={index} />
  ));

  useEffect(() => {
    dispatch(accountsActions.getAccountSummary(convertedId));
    dispatch(accountsActions.getAccountById(convertedId));
    dispatch(adminActions.getCoins());

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
        <Bricks header='Seed Capital' value={accountById.startCapitalInBaseCurrency || 0} />
        <Bricks
          header='Performance'
          value={`${accountById.statistics?.productivityInPercent || 0}%`}
        />
        <Bricks
          value={accountById.statistics?.startCapitalInBaseCurrency || 0}
          header={wrapWithBaseCurrency('Current Capital', accountById?.baseCurrency?.name)}
          moreText={moment(accountById.statistics?.refreshDate).format('DD.MM.YYYY HH:MM:SS')}
        />
        <Bricks
          value={accountById.statistics?.currentOpenProfitInBaseCurrency || 0}
          header={wrapWithBaseCurrency('Current open profit', accountById?.baseCurrency?.name)}
        />
        <Bricks
          value={accountById.statistics?.earnedCapitalInBaseCurrency || 0}
          header={wrapWithBaseCurrency('Earned capital', accountById?.baseCurrency?.name)}
        />
      </div>

      <div className={styles.analytics__chart}>{renderLineCharts}</div>
      <div className={styles.analytics__chart}>{renderDoughnutCharts}</div>

      <AnalyticsTabs />
    </div>
  );
};

export default AccountsAnalytics;
