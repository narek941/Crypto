import classNames from 'classnames';
import { useLocation, useParams } from 'react-router-dom';

import { Routes } from 'types';

import styles from './Container.module.scss';
import { IContainer } from './types';

const MainTablePaths = [Routes.Accounts, Routes.Users, Routes.Alerts];

const Container = ({ children, className }: IContainer): JSX.Element => {
  const params = useParams();
  const { pathname } = useLocation();

  const containerClass: string = classNames(
    styles.container,
    {
      [styles.container__table]: MainTablePaths.includes(pathname as Routes),
      [styles.container__analytics]: pathname === `${Routes.Accounts}/${params.id}`,
    },
    className,
  );

  return <div className={containerClass}>{children}</div>;
};

export default Container;
