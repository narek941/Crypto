import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArrowLeftIcon, AvatarIcon } from 'assets/icons';
import { useOnClickOutside } from 'hooks';
import { Popup } from 'components';
import { accountsSelectors } from 'store/accountsSlice';

import styles from './Header.module.scss';
import { IHeaderProps } from './types';
import '../../../i18';

const Header = ({
  text,
  isBackBtn = false,
  withMail = false,
  to = -1,
}: IHeaderProps): JSX.Element => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOutside = (): void => setOpen(false);
  const accountByID = useSelector(accountsSelectors.selectAccountById);

  const navigateHandler = () => navigate(to);
  const handleClick = (): void => setOpen(!open);

  useOnClickOutside(ref, handleClickOutside);

  // const email = accountByID?.alertsDestinations?.find(
  //   (item: any) => item.type === 'EMAIL',
  // )?.emailAddress;

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__inner}>
          <div role='button' className={styles.header__item__first}>
            {isBackBtn && <ArrowLeftIcon onClick={navigateHandler} />}
            <div className={styles.header__item}>
              <span className={styles.header__item__text}>{t(text)}</span>

              {withMail && accountByID && (
                <div className={styles.header__item__text__footer}>
                  <span>{accountByID.name}</span>
                  {/* {email && <span>{hideLetters(email)}</span>} */}
                </div>
              )}
            </div>
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
