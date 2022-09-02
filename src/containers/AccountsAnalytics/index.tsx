import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useWindowSize } from 'hooks';
import { useAppDispatch, useAppSelector } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { adminActions } from 'store/adminSlice';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { Bricks, Chart, Doughnut, Export, AnalyticsTabs, Loader } from 'components';
import { AccountModalChartColor } from 'constants/charts';

import styles from './AccountsAnalytics.module.scss';

const AccountsAnalytics = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const convertedId = Number(id);
  const windowSize = useWindowSize();

  const [isLoading, setIsLoading] = useState(true);

  const accountById = useAppSelector(accountsSelectors.selectAccountById);
  const accountAssetsChartData = useAppSelector(accountsSelectors.selectAccountAssetChartData);

  const accountTradingPairsChartData = useAppSelector(
    accountsSelectors.selectAccountTradingPairsChartData,
  );
  // const accountPerformanceChartData = useAppSelector(
  //   accountsSelectors.selectAccountPerformanceChartData,
  // );
  const accountCapitalChartData = useAppSelector(accountsSelectors.selectAccountCapitalChartData);
  const canvasWidth = (windowSize.width - 290) / 2;
  const accountAnalyticsChartColors = AccountModalChartColor();

  useEffect(() => {
    const getAccountsAnalytics = async () => {
      try {
        await dispatch(accountsActions.getAccountById(convertedId)).unwrap();
        await dispatch(accountsActions.getAccountCapitalChartData(convertedId)).unwrap();
        await dispatch(accountsActions.getAccountTradingPairsChartData(convertedId)).unwrap();

        setIsLoading(false);

        await dispatch(accountsActions.getAccountSummary(convertedId)).unwrap();
        await dispatch(adminActions.getCoins()).unwrap();
        await dispatch(adminActions.getTradingPairs()).unwrap();
        // await dispatch(accountsActions.getAccountPerformanceChartData(convertedId)).unwrap();
        await dispatch(accountsActions.getAccountAssetsChartData(convertedId)).unwrap();
      } catch {
        setIsLoading(false);
      }
    };

    getAccountsAnalytics();

    return () => {
      dispatch(accountsActions.removeAccountById());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convertedId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.analytics}>
        <div className={styles.analytics__export}>
          <Export />
        </div>
        <div className={styles.analytics__bricks__wrapper}>
          <Bricks
            header='Seed Capital'
            value={
              !isNaN(Number(accountById.statistics?.startCapitalInBaseCurrency))
                ? Number(accountById.statistics?.startCapitalInBaseCurrency).toFixed(8)
                : 0
            }
          />
          <Bricks
            header='Performance'
            value={`${
              !isNaN(Number(accountById.statistics?.earnedCapitalInPercent))
                ? Number(accountById.statistics?.earnedCapitalInPercent)
                : 0
            }%`}
          />
          <Bricks
            value={
              !isNaN(Number(accountById.statistics?.currentCapitalInBaseCurrency))
                ? Number(accountById.statistics?.currentCapitalInBaseCurrency).toFixed(8)
                : 0
            }
            header={wrapWithBaseCurrency('Current Capital', accountById?.baseCurrency?.name)}
            moreText={moment(accountById.statistics?.refreshDate).format('DD.MM.YYYY HH:mm:ss')}
          />
          <Bricks
            value={
              !isNaN(Number(accountById.statistics?.currentOpenProfitInBaseCurrency))
                ? Number(accountById.statistics?.currentOpenProfitInBaseCurrency).toFixed(8)
                : 0
            }
            header={wrapWithBaseCurrency('Current open profit', accountById?.baseCurrency?.name)}
          />
          <Bricks
            value={
              !isNaN(Number(accountById.statistics?.earnedCapitalInBaseCurrency))
                ? Number(accountById.statistics?.earnedCapitalInBaseCurrency).toFixed(8)
                : 0
            }
            header={wrapWithBaseCurrency('Earned capital', accountById?.baseCurrency?.name)}
          />
        </div>
        <div className={styles.analytics__chart}>
          <Chart
            data={accountCapitalChartData}
            title='Account Capital Chart'
            subTitle={accountById?.baseCurrency?.name}
            timeField='snapshotDate'
            field='currentCapitalInBaseCurrency'
            width={canvasWidth}
            type='AREA'
            baseCurrency={accountById?.baseCurrency?.name}
            field2='currentOpenProfitInBaseCurrency'
          />
          <Chart
            // data={accountPerformanceChartData}
            data={accountCapitalChartData}
            title='P&L Share Chart'
            subTitle='%'
            timeField='snapshotDate'
            field='earnedCapitalInPercent'
            width={canvasWidth}
            type='AREA'
            baseCurrency='%'
            field2='currentOpenProfitInBaseCurrency'
          />
        </div>
        <div className={styles.analytics__chart}>
          <div className={styles.analytics__chart__inner}>
            <div className={styles.analytics__chart__item}>
              {accountById?.baseCurrency?.coin && (
                <Doughnut
                  data={accountTradingPairsChartData}
                  field={'pairName'}
                  value={'relativePercentage'}
                  width={(windowSize.width - 240) / 2}
                  header={'Trading Pairs Chart'}
                  colors={accountAnalyticsChartColors}
                  baseCurrency={accountById?.baseCurrency?.name}
                  navigateTo={3}
                  tooltipFields={['totalBaseSum', 'baseCurrencyName', 'totalSum', 'toCurrencyName']}
                />
              )}
            </div>
          </div>
          <div className={styles.analytics__chart__inner}>
            <div className={styles.analytics__chart__item}>
              {accountById?.baseCurrency?.coin && (
                <Doughnut
                  data={accountAssetsChartData}
                  field={'assetCoin'}
                  value={'relativePercentage'}
                  width={(windowSize.width - 260) / 2}
                  header={'Account Assets Chart'}
                  colors={accountAnalyticsChartColors}
                  baseCurrency={accountById?.baseCurrency?.name}
                  navigateTo={1}
                  tooltipFields={['baseCurrencyValue', 'baseCurrencyName', 'value', 'assetCoin']}
                />
              )}
            </div>
          </div>
        </div>
        <AnalyticsTabs />
      </div>
    </>
  );
};

export default AccountsAnalytics;
