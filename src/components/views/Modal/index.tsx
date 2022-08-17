import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Routes } from 'types';
import { CloseModalIcon } from 'assets/icons';
import useOnClickOutside from 'hooks/useOutsideClick';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Doughnut } from 'components';
import { parseChartLabels } from 'utils/parseChartLabels';
import { AccountModalChartColor } from 'constants/charts';

import styles from './Modal.module.scss';
import { IModalProps } from './types';

const Modal = ({ id, open, setOpen, modalList }: IModalProps): JSX.Element => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const accountAssetsChartData = useAppSelector(accountsSelectors.selectAccountAssetChartData);
  const accountTradingPairsChartData = useAppSelector(
    accountsSelectors.selectAccountTradingPairsChartData,
  );
  useEffect(() => {
    accountAssetsChartData.length ||
      dispatch(accountsActions.getAccountAssetsChartData(Number(id)));
    accountTradingPairsChartData.length ||
      dispatch(accountsActions.getAccountTradingPairsChartData(Number(id)));
  }, [id, dispatch]);

  const handleClickOutside = (): void => setOpen(false);

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

  const headerClass = classNames(styles.item, styles.item__header);
  const linkClass = classNames(styles.link, styles.item);
  const modalClass = classNames(styles.wrapper, {
    [styles.wrapper__open]: open,
  });

  useOnClickOutside(ref, handleClickOutside);

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
          <div className={styles.chart}>
            <div className={styles.chart__inner}>
              <div className={styles.chart__inner__doughnut}>
                <Doughnut
                  header='Trading Pairs Chart'
                  width='224px'
                  height='241px'
                  data={tradingPairsData}
                  legendPosition='bottom'
                  labels={tradingPairsLabel}
                  wrapperClassName={styles.chart__wrapper}
                  colors={AccountModalChartColor()}
                  pointStyle='circle'
                />
              </div>
            </div>
          </div>
          <div className={styles.chart}>
            <div className={styles.chart__inner}>
              <div className={styles.chart__inner__doughnut}>
                <Doughnut
                  header='Asset Chart'
                  width='224px'
                  height='241px'
                  data={assetsData}
                  legendPosition='bottom'
                  labels={assetsLabel}
                  wrapperClassName={styles.chart__wrapper}
                  colors={AccountModalChartColor()}
                  pointStyle='circle'
                />
              </div>
            </div>
          </div>
        </div>
        <Link className={linkClass} to={`${Routes.Accounts}/analytics/${id}`}>
          more details
        </Link>
      </div>
    </div>
  );
};
export default Modal;
