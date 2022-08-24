import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { adminActions } from 'store/adminSlice';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { Bricks, Chart, Doughnut, Export, AnalyticsTabs } from 'components';
import { AccountAnalyticsChartColor, AccountAnalyticsChartTextColor } from 'constants/charts';
import { useWindowSize } from 'hooks/useWindowsWidth';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const convertedId = Number(id);
  const windowWidth = useWindowSize();
  const accountById = useAppSelector(accountsSelectors.selectAccountById);
  const accountAssetsChartData = useAppSelector(accountsSelectors.selectAccountAssetChartData);
  const accountTradingPairsChartData = useAppSelector(
    accountsSelectors.selectAccountTradingPairsChartData,
  );
  const accountPerformanceChartData = useAppSelector(
    accountsSelectors.selectAccountPerformanceChartData,
  );
  const accountCapitalChartData = useAppSelector(accountsSelectors.selectAccountCapitalChartData);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <div className={styles.analytics__chart}>
        {accountCapitalChartData.length && windowWidth && (
          <Chart
            data={accountCapitalChartData}
            title='Account Capital Chart'
            subTitle={accountById?.baseCurrency?.name}
            timeField='snapshotDate'
            field='currentCapitalInBaseCurrency'
            width={(windowWidth.width - 240) / 2}
            type='AREA'
            baseCurrency={accountById?.baseCurrency?.name}
          />
        )}
        {accountPerformanceChartData.length && windowWidth && (
          <Chart
            data={accountPerformanceChartData}
            title='P&L Share Chart'
            subTitle='%'
            timeField='snapshotDate'
            field='currentCapitalInBaseCurrency'
            width={(windowWidth.width - 240) / 2}
            type='AREA'
            baseCurrency={accountById?.baseCurrency?.name}
          />
        )}
      </div>
      <div className={styles.analytics__chart}>
        <div className={styles.analytics__chart__inner}>
          <div className={styles.analytics__chart__item}>
            {accountTradingPairsChartData && windowWidth && (
              <Doughnut
                data={accountTradingPairsChartData}
                field={'pairName'}
                value={'relativePercentage'}
                width={(windowWidth.width - 240) / 2}
                header={'Trading Pairs Chart'}
                colors={AccountAnalyticsChartColor()}
                textColor={AccountAnalyticsChartTextColor()}
                tooltipFields={['totalSum', 'toCurrencyName', 'totalBaseSum']}
              />
            )}
          </div>
        </div>
        <div className={styles.analytics__chart__inner}>
          <div className={styles.analytics__chart__item}>
            {accountAssetsChartData && windowWidth && (
              <Doughnut
                data={accountAssetsChartData}
                field={'assetCoin'}
                value={'relativePercentage'}
                width={(windowWidth.width - 240) / 2}
                header={'Account Assets Chart'}
                colors={AccountAnalyticsChartColor()}
                textColor={AccountAnalyticsChartTextColor()}
                tooltipFields={['baseCurrencyValue', 'baseCurrencyName', 'value', 'assetCoin']}
              />
            )}
          </div>
        </div>
      </div>

      <AnalyticsTabs />
    </div>
  );
};

export default AccountsAnalytics;
