import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Routes } from 'types';
import {
  BinanceFutureCoinIcon,
  BinanceFutureIcon,
  BinanceSpotIcon,
  CloseModalIcon,
} from 'assets/icons';
import { useOnClickOutside } from 'hooks';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Doughnut } from 'components';
import { AccountAnalyticsChartColor } from 'constants/charts';

import { AccountTabType } from '../Table/TableToolbar/types';

import styles from './Modal.module.scss';
import { IModalProps } from './types';

const Modal = ({
  id,
  open,
  setOpen,
  modalList,
  baseCurrency,
  accountName,
  exchangePlatform,
  syncStatus,
}: IModalProps): JSX.Element => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const accountAssetsChartData = useAppSelector(accountsSelectors.selectAccountAssetChartData);
  const accountTradingPairsChartData = useAppSelector(
    accountsSelectors.selectAccountTradingPairsChartData,
  );
  const headerClass = classNames(styles.item, styles.item__header);
  const linkClass = classNames(styles.link, styles.item);
  const modalClass = classNames(styles.wrapper, {
    [styles.wrapper__open]: open,
  });

  const handleClickOutside = (): void => setOpen(false);

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    dispatch(accountsActions.getAccountAssetsChartData(Number(id)));
    dispatch(accountsActions.getAccountTradingPairsChartData(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const renderModalList = modalList?.map(({ id, key, value, info }) => (
    <div className={styles.item} key={id}>
      <p className={styles.item__key}>
        {key}
        {info && <span className={styles.info}>{info}</span>}
      </p>
      <p className={styles.item__value}>{value}</p>
    </div>
  ));

  const renderPlatform = (platform: any) => {
    switch (platform) {
      case AccountTabType.BINANCE_FUTURES_USDTM:
        return (
          <>
            <BinanceFutureIcon className={styles.item__header__text__subtitle__platform__icon} />
            <span>USDT-M</span>
          </>
        );

      case AccountTabType.BINANCE:
        return (
          <>
            <BinanceSpotIcon className={styles.item__header__text__subtitle__platform__icon} />
            <span>Binance Spot</span>
          </>
        );
      case AccountTabType.BINANCE_FUTURES_COINM:
        return (
          <>
            <BinanceFutureCoinIcon
              className={styles.item__header__text__subtitle__platform__icon}
            />
            <span>COIN-M</span>
          </>
        );

      default:
        <></>;
    }
  };

  return (
    <div ref={ref} className={modalClass}>
      <div className={headerClass}>
        <div className={styles.item__header__text}>
          <p className={styles.item__header__text__title}>Account overview</p>
          <div className={styles.item__header__text__subtitle}>
            <p>{accountName}</p>
            <p className={styles.item__header__text__subtitle__platform}>
              {renderPlatform(exchangePlatform)}
            </p>
          </div>
        </div>

        <div className={styles.item__header__icon}>
          <CloseModalIcon onClick={handleClickOutside} />
        </div>
      </div>
      <div className={styles.inner}>
        <div>{renderModalList}</div>
        <div>
          {!!accountTradingPairsChartData.length && (
            <div className={styles.chart}>
              <div className={styles.chart__inner}>
                <div className={styles.chart__inner__doughnut}>
                  <Doughnut
                    header='Trading Pairs Chart'
                    field={'pairName'}
                    className={styles.doughnut}
                    value={'relativePercentage'}
                    data={accountTradingPairsChartData}
                    legendPositionBottom={true}
                    colors={AccountAnalyticsChartColor}
                    baseCurrency={baseCurrency}
                    radius={40}
                    tooltipFields={[
                      'totalBaseSum',
                      'baseCurrencyName',
                      'totalSum',
                      'toCurrencyName',
                    ]}
                  />
                </div>
              </div>
            </div>
          )}
          {!!accountAssetsChartData.length && (
            <div className={styles.chart}>
              <div className={styles.chart__inner}>
                <div className={styles.chart__inner__doughnut}>
                  <Doughnut
                    header='Asset Chart'
                    field={'assetCoin'}
                    data={accountAssetsChartData}
                    value={'relativePercentage'}
                    baseCurrency={baseCurrency}
                    className={styles.doughnut}
                    legendPositionBottom={true}
                    tooltipFields={['baseCurrencyValue', 'baseCurrencyName', 'value', 'assetCoin']}
                    wrapperClassName={styles.chart__wrapper}
                    radius={40}
                    colors={AccountAnalyticsChartColor}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {syncStatus !== 'IMPORTING' ? (
          <Link className={linkClass} to={`${Routes.Accounts}/analytics/${id}`}>
            more details
          </Link>
        ) : (
          <div className={linkClass}> more details</div>
        )}
      </div>
    </div>
  );
};
export default Modal;
