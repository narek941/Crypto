import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Routes } from 'types';
import { CloseModalIcon } from 'assets/icons';
import { useOnClickOutside } from 'hooks';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Doughnut } from 'components';
import { AccountAnalyticsChartTextColor, AccountModalChartColor } from 'constants/charts';

import styles from './Modal.module.scss';
import { IModalProps } from './types';

const Modal = ({ id, open, setOpen, modalList }: IModalProps): JSX.Element => {
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
  const accountAnalyticsChartColors = AccountModalChartColor();
  const accountAnalyticsChartTextColors = AccountAnalyticsChartTextColor();

  const handleClickOutside = (): void => setOpen(false);

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    dispatch(accountsActions.getAccountAssetsChartData(Number(id)));
    dispatch(accountsActions.getAccountTradingPairsChartData(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const renderModalList = modalList.map(({ id, key, value, info }) => (
    <div className={styles.item} key={id}>
      <p className={styles.item__key}>
        {key}
        {info && <span className={styles.info}>{info}</span>}
      </p>
      <p className={styles.item__value}>{value}</p>
    </div>
  ));

  return (
    <div ref={ref} className={modalClass}>
      <div className={headerClass}>
        <p className={styles.item__header__text}>Account overview</p>
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
                    width='253px'
                    field={'pairName'}
                    className={styles.doughnut}
                    value={'relativePercentage'}
                    data={accountTradingPairsChartData}
                    legendPosition='bottom'
                    colors={accountAnalyticsChartColors}
                    pointStyle='circle'
                    font={10}
                    textColor={accountAnalyticsChartTextColors}
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
                    data={accountAssetsChartData}
                    field={'assetCoin'}
                    value={'relativePercentage'}
                    width='253px'
                    className={styles.doughnut}
                    legendPosition='bottom'
                    tooltipFields={['baseCurrencyValue', 'baseCurrencyName', 'value', 'assetCoin']}
                    wrapperClassName={styles.chart__wrapper}
                    colors={accountAnalyticsChartColors}
                    pointStyle='circle'
                    font={10}
                    textColor={accountAnalyticsChartTextColors}
                    radius={40}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <Link className={linkClass} to={`${Routes.Accounts}/analytics/${id}`}>
          more details
        </Link>
      </div>
    </div>
  );
};
export default Modal;
