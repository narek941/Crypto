import { useRef } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'types';
import { useAppDispatch } from 'hooks';
import { authActions } from 'store/authSlice';

import ToggleSwitch from '../ToggleSwitch';

import styles from './Popup.module.scss';
import { PopupProps } from './types';

const Popup = ({ open }: PopupProps) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isDarkMode = useSelector((state: RootState) => state.auth.isDarkMode);
  const popUpClasses = classNames(styles.popup, { [styles.popup__able]: open });

  const handleChange = () => {
    dispatch(authActions.setTheme());
  };

  const handleLogOut = () => {
    dispatch(authActions.signOut());
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
        <div role='button' onClick={handleLogOut}>
          Log out
        </div>
      </div>
    </div>
  );
};
export default Popup;
