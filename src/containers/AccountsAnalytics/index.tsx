import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import moment from 'moment';

import { useBeforeLoad, useWindowSize } from 'hooks';
import { useAppDispatch, useAppSelector } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { adminActions } from 'store/adminSlice';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { Bricks, Chart, Doughnut, Export, AnalyticsTabs, Loader } from 'components';
import { AccountAnalyticsChartColor } from 'constants/charts';
import { ExportType } from 'components/shared/Export/types';
import { BrowserStorageKeys, BrowserStorageService } from 'services';
import { TabType } from 'components/views/AnalyticsTabs/types';

import styles from './AccountsAnalytics.module.scss';
import { ICapitalChartLimit } from './types';

const AccountsAnalytics = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const convertedId = Number(id);
  const windowSize = useWindowSize();

  const [isLoading, setIsLoading] = useState(true);
  const [capitalChartLimit, setCapitalChartLimit] = useState<ICapitalChartLimit>();

  const accountById = useAppSelector(accountsSelectors.selectAccountById);
  const accountAssetsChartData = useAppSelector(accountsSelectors.selectAccountAssetChartData);
  const walletId = useAppSelector(accountsSelectors.selectAccountByIdPlatform);

  const accountTradingPairsChartData = useAppSelector(
    accountsSelectors.selectAccountTradingPairsChartData,
  );
  // const accountPerformanceChartData = useAppSelector(
  //   accountsSelectors.selectAccountPerformanceChartData,
  // );
  const accountCapitalChartData = useAppSelector(accountsSelectors.selectAccountCapitalChartData);
  const canvasWidth = (windowSize.width - 240) / 2 < 580 ? 580 : (windowSize.width - 240) / 2;

  const handleExportSubmit = (credentials: any) => {
    if (credentials.type === ExportType.pdf) {
      dispatch(accountsActions.exportAccountTrades({ id, ...credentials })).unwrap();
    } else {
      dispatch(accountsActions.exportAccountTrades({ id, ...credentials })).unwrap();
    }
  };

  const handleScroll = () => {
    BrowserStorageService.set(BrowserStorageKeys.Scroll, window.scrollY.toString(), {
      session: true,
    });
  };

  useEffect(() => {
    const scrollPosition = BrowserStorageService.get(BrowserStorageKeys.Scroll, {
      session: true,
    });
    window.scrollTo(0, Number(scrollPosition));
  });

  useEffect(() => {
    const scrollPosition = BrowserStorageService.get(BrowserStorageKeys.Scroll, {
      session: true,
    });
    window.scrollTo(0, Number(scrollPosition));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('tab')]);

  useEffect(() => {
    const getAccountsAnalytics = async () => {
      try {
        await dispatch(accountsActions.getAccountById(convertedId)).unwrap();
        await dispatch(accountsActions.getAccountCapitalChartData(convertedId)).unwrap();
        await dispatch(accountsActions.getAccountTradingPairsChartData(convertedId)).unwrap();
        const { data } = await dispatch(
          accountsActions.getAccountsFilterValues(convertedId),
        ).unwrap();
        setCapitalChartLimit(data);
        setIsLoading(false);
        await dispatch(accountsActions.getAccountSummary(convertedId)).unwrap();
        await dispatch(adminActions.getCoins()).unwrap();
        await dispatch(adminActions.getTradingPairs(walletId)).unwrap();
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

  useBeforeLoad(handleScroll());

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.analytics}>
        <div className={styles.analytics__export}>
          <Export callback={handleExportSubmit} />
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
        <div className={styles.analytics__inner}>
          <div className={styles.analytics__chart}>
            <div className={styles.analytics__chart__item}>
              <Chart
                data={accountCapitalChartData}
                title='Account Capital Chart'
                subTitle={accountById?.baseCurrency?.name}
                timeField='snapshotDate'
                field='currentCapitalInBaseCurrency'
                width={canvasWidth}
                minValue={Number(capitalChartLimit?.minCurrentCapitalInBaseCurrency)}
                maxValue={Number(capitalChartLimit?.maxCurrentCapitalInBaseCurrency)}
                type='AREA'
                baseCurrency={accountById?.baseCurrency?.name}
              />
            </div>
            <div className={styles.analytics__chart__item}>
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
                field2='earnedCapitalInBaseCurrency'
                minValue={Number(capitalChartLimit?.minEarnedCapitalInPercent)}
                maxValue={Number(capitalChartLimit?.maxEarnedCapitalInPercent)}
              />
            </div>
          </div>
          <div className={styles.analytics__chart}>
            <div className={styles.analytics__chart__inner}>
              <div className={styles.analytics__chart__item}>
                {accountById?.baseCurrency?.coin && (
                  <Doughnut
                    data={accountTradingPairsChartData}
                    field={'pairName'}
                    value={'relativePercentage'}
                    width={canvasWidth}
                    header={'Trading Pairs Chart'}
                    colors={AccountAnalyticsChartColor}
                    baseCurrency={accountById?.baseCurrency?.name}
                    navigateTo={TabType.history}
                    tooltipFields={[
                      'totalBaseSum',
                      'baseCurrencyName',
                      'totalSum',
                      'toCurrencyName',
                    ]}
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
                    width={canvasWidth}
                    header={'Account Assets Chart'}
                    colors={AccountAnalyticsChartColor}
                    baseCurrency={accountById?.baseCurrency?.name}
                    navigateTo={TabType.wallet}
                    tooltipFields={['baseCurrencyValue', 'baseCurrencyName', 'value', 'assetCoin']}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <AnalyticsTabs />
      </div>
    </>
  );
};

export default AccountsAnalytics;
