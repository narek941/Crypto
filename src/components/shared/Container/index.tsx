import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './Container.module.scss';
import { IContainer } from './types';

const Container: FC<IContainer> = ({ children, className }) => {
  const containerClass: string = classNames(styles.container, className);
  return <div className={containerClass}>{children}</div>;
};
export default Container;
