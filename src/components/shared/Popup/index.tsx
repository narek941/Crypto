import { useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState, Routes } from 'types';
import { setTheme } from 'store/themeSlice/actions';

import ToggleSwitch from '../ToggleSwitch';

import styles from './Popup.module.scss';
import { PopupProps } from './types';

const Popup = ({ open }: PopupProps) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.themeSlice?.isDarkMode);
  const popUpClasses = classNames(styles.popup, { [styles.popup__able]: open });

  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(setTheme());
  };

  return (
    <div className={popUpClasses} ref={ref}>
      <div className={styles.popup__header}>{t('welcome')}</div>
      <div className={styles.popup__switcher}>
        <span>Light</span>
        <ToggleSwitch checked={isDarkMode} onChange={handleChange} />
        <span>Dark</span>
      </div>
      <div className={styles.popup__logout}>
        <Link to={Routes.SignIn}>Log out</Link>
      </div>
    </div>
  );
};
export default Popup;
