import React from 'react';

import { ArrowLeftIcon, AvatarIcon } from 'icons';

import styles from './Header.module.scss';
import { IHeaderProps } from './types';

const Header = ({ text, isBackBtn = false }: IHeaderProps): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__item__first}>
          {isBackBtn && <ArrowLeftIcon />} <span className={styles.header__item__text}>{text}</span>
        </div>
        <div className={styles.header__item__second}>
          <AvatarIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
