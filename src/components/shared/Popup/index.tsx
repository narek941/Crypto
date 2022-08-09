import { useRef } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks';
import { authActions, authSelectors } from 'store/authSlice';

import ToggleSwitch from '../ToggleSwitch';

import styles from './Popup.module.scss';
import { PopupProps } from './types';

const Popup = ({ open }: PopupProps) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector(authSelectors.selectIsDarkMode);
  const popUpClasses = classNames(styles.popup, { [styles.popup__able]: open });
  const isEnglish = useSelector(authSelectors.selectIsEnglish);

  const handleChange = () => {
    dispatch(authActions.setTheme());
  };

  const handleChangeLang = () => {
    dispatch(authActions.setLang());
  };

  const handleLogOut = () => {
    dispatch(authActions.signOut());
  };

  return (
    <div className={popUpClasses} ref={ref}>
      <div className={styles.popup__header}>{t('welcome')}</div>
      <div className={styles.popup__switcher}>
        <span>{t('light')}</span>
        <ToggleSwitch checked={isDarkMode} onChange={handleChange} />
        <span>{t('dark')}</span>
      </div>
      <div className={styles.popup__switcher}>
        <span>EN</span>
        <ToggleSwitch checked={!isEnglish} onChange={handleChangeLang} />
        <span>RU</span>
      </div>

      <div className={styles.popup__logout}>
        <div role='button' onClick={handleLogOut}>
          {t('log_out')}
        </div>
      </div>
    </div>
  );
};
export default Popup;
