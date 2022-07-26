import React, { useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';

import { Routes } from 'types';
import { charts } from 'constants/index';
import { CloseModalIcon } from 'assets/icons';
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './Modal.module.scss';
import { IModalProps } from './types';

const Modal = ({ id, open, setOpen, modalList }: IModalProps): JSX.Element => {
  const ref = useRef(null);

  const headerClass = classNames(styles.item, styles.item__header);
  const linkClass = classNames(styles.link, styles.item);
  const modalClass = classNames(styles.wrapper, {
    [styles.wrapper__open]: open,
  });

  const handleClickOutside = (): void => setOpen(false);

  const options: any = {
    cutout: '85%',
    responsive: false,
    spacing: 4,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

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

  const renderAccountOverviewCharts = charts.accountOverviewChart.map(({ id, header, data }) => (
    <div className={styles.chart} key={id}>
      <p className={styles.chart__header}>{header}</p>
      <div className={styles.chart__inner}>
        <div className={styles.chart__inner__doughnut}>
          <Doughnut data={data} options={options} width='71px' height='71px' />
        </div>
        <div className={styles.chart__inner__label}>
          {data.labels.map((item, index) => (
            <div key={index} className={styles.chart__inner__label__item}>
              <span style={{ backgroundColor: charts.chartColor[index] }} />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
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
        <div>{renderAccountOverviewCharts}</div>
        <Link className={linkClass} to={`${Routes.Accounts}/analytics/${id}`}>
          more details
        </Link>
      </div>
    </div>
  );
};
export default Modal;
