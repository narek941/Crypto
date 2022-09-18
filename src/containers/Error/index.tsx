import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LogoIcon } from 'assets/icons';
import { ExternalImage } from 'components';
import { authSelectors } from 'store/authSlice';
import { useAppSelector } from 'hooks';
import { Routes } from 'types';

import img from '../../assets/images/404.png';
import imgLight from '../../assets/images/404-light.png';

import styles from './Error.module.scss';

import '../../i18';

const Error: React.FC = () => {
  const { t } = useTranslation();
  const isDarkMode = useAppSelector(authSelectors.selectIsDarkMode);
  const firstInnerClassNames = classNames(styles.error__inner, styles.error__inner__first);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link to={Routes.Login} className={styles.copyright}>
          <LogoIcon />
        </Link>
      </div>
      <div className={styles.error}>
        <div className={firstInnerClassNames}>
          <div className={styles.error__item}>
            <h1 className={styles.error__item__title}>404</h1>
            <p className={styles.error__item__subTitle}>{t('page_not_found')}</p>
            <div className={styles.error__item__form}></div>
          </div>
        </div>

        <div className={styles.error__inner}>
          <ExternalImage
            src={isDarkMode ? img : imgLight}
            className={styles.error__inner__second}
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
