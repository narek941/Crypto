import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from 'types';
import { LogoIcon } from 'icons';
import Copyright from 'components/shared/Copyright';
import ExternalImage from 'components/shared/ExternalImage';
import SignInForm from 'components/views/SignInForm/SignInForm';

import img from '../../assets/images/image-with-man.png';

import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <LogoIcon />
        </header>
        <div className={styles.signIn}>
          <div className={styles.signIn__item}>
            <h1 className={styles.signIn__item__title}>Welcome back!</h1>
            <p className={styles.signIn__item__subTitle}>
              Log in to continue monitoring securely and easily
            </p>
            <div className={styles.signIn__item__form}>
              <SignInForm />
            </div>
          </div>
          <div className={styles.signIn__item}>
            <ExternalImage src={img} />
          </div>
        </div>
        <Link to={Routes.SignIn} className={styles.copyright}>
          <Copyright />
        </Link>
      </div>
    </>
  );
};

export default SignIn;
