import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArrowLeftIcon, AvatarIcon } from 'assets/icons';
import useOnClickOutside from 'hooks/useOutsideClick';
import { Popup } from 'components';

import styles from './Header.module.scss';
import { IHeaderProps } from './types';
import '../../../i18';

const Header = ({ text, isBackBtn = false }: IHeaderProps): JSX.Element => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOutside = (): void => setOpen(false);

  const navigateHandler = () => navigate(-1);
  const handleClick = (): void => setOpen(!open);

  useOnClickOutside(ref, handleClickOutside);

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div>
          <div role='button' className={styles.header__item__first}>
            {isBackBtn && <ArrowLeftIcon onClick={navigateHandler} />}
            <span className={styles.header__item__text}>{t(text)}</span>
          </div>
        </div>
        <div ref={ref} className={styles.header__item__second}>
          <AvatarIcon onClick={handleClick} />
          <Popup open={open} />
        </div>
      </div>
    </header>
  );
};

export default Header;
