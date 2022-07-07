import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { Routes } from 'types';
import { LogoIcon } from 'icons';
import Copyright from 'components/shared/Copyright';
import ExternalImage from 'components/shared/ExternalImage';
import SignInForm from 'components/views/SignInForm/SignInForm';

import img from '../../assets/images/image-with-man.png';

import styles from './SignIn.module.scss';

import '../../i18';

const SignIn: React.FC = () => {
  const firstInnerClassNames = classNames(styles.signIn__inner, styles.signIn__inner__first);
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.signIn}>
          <div className={firstInnerClassNames}>
            <div className={styles.header}>
              <LogoIcon />
            </div>
            <div className={styles.signIn__item}>
              <h1 className={styles.signIn__item__title}>{t('welcome')}</h1>
              <p className={styles.signIn__item__subTitle}>
                Log in to continue monitoring securely and easily
              </p>
              <div className={styles.signIn__item__form}>
                <SignInForm />
              </div>
            </div>
            <Link to={Routes.SignIn} className={styles.copyright}>
              <Copyright />
            </Link>
          </div>

          <div className={styles.signIn__inner}>
            <ExternalImage src={img} className={styles.signIn__inner__second} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
