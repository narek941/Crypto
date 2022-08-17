import React, { useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';
import { charts } from 'constants/index';
import { wrapWithBaseCurrency } from 'utils';
import { adminActions } from 'store/adminSlice';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { Bricks, Chart, Doughnut, Export, AnalyticsTabs } from 'components';
import { parseChartLabels } from 'utils/parseChartLabels';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const convertedId = Number(id);

  const accountById = useAppSelector(accountsSelectors.selectAccountById);
  const accountAssetsChartData = useAppSelector(accountsSelectors.selectAccountAssetChartData);
  const accountTradingPairsChartData = useAppSelector(
    accountsSelectors.selectAccountTradingPairsChartData,
  );
  const accountPerformanceChartData = useAppSelector(
    accountsSelectors.selectAccountPerformanceChartData,
  );
  const accountCapitalChartData = useAppSelector(accountsSelectors.selectAccountCapitalChartData);

  const assetsLabel = parseChartLabels(
    accountAssetsChartData,
    'assetCoin',
    'relativePercentage',
  ).map(({ key, value }: any) => `${key} - ${value}%`);
  const assetsData = parseChartLabels(
    accountAssetsChartData,
    'assetCoin',
    'relativePercentage',
  ).map(({ value }: any) => value);

  const tradingPairsLabel = parseChartLabels(
    accountTradingPairsChartData,
    'pairName',
    'relativePercentage',
  ).map(({ key, value }: any) => `${key} - ${value}%`);
  const tradingPairsData = parseChartLabels(
    accountTradingPairsChartData,
    'pairName',
    'relativePercentage',
  ).map(({ value }: any) => value);

  const renderLineCharts = charts.accountsAnalyticsChart.lineChart.map((_, index) => (
    <Chart key={index} />
  ));

  useEffect(() => {
    dispatch(adminActions.getCoins());
    dispatch(adminActions.getTradingPairs());
    dispatch(accountsActions.getAccountById(convertedId));
    dispatch(accountsActions.getAccountSummary(convertedId));
    accountAssetsChartData.length ||
      dispatch(accountsActions.getAccountAssetsChartData(convertedId));
    accountCapitalChartData.length ||
      dispatch(accountsActions.getAccountCapitalChartData(convertedId));
    accountPerformanceChartData.length ||
      dispatch(accountsActions.getAccountPerformanceChartData(convertedId));
    accountTradingPairsChartData.length ||
      dispatch(accountsActions.getAccountTradingPairsChartData(convertedId));

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
      <div className={styles.analytics__chart}>
        {accountTradingPairsChartData && (
          <Doughnut
            labels={tradingPairsLabel}
            data={tradingPairsData}
            header={'Trading Pairs Chart'}
          />
        )}
        {accountAssetsChartData && (
          <Doughnut labels={assetsLabel} data={assetsData} header={'Account Assets Chart'} />
        )}
      </div>

      <AnalyticsTabs />
    </div>
  );
};

export default AccountsAnalytics;
