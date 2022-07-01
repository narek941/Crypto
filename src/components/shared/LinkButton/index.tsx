import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './LinkButton.module.scss';
import { ILink } from './types';

const LinkButton = ({
  children,
  to,
  className,
  color = 'primary',
  size = 's',
}: ILink): JSX.Element => {
  const btnClassNames = classNames(className, styles.btn, {
    [styles.btn__small]: size === 's',
    [styles.btn__middle]: size === 'm',
    [styles.btn__large]: size === 'l',
    [styles.btn__primary]: color === 'primary',
    [styles.btn__secondary]: color === 'secondary',
  });

  return (
    <Link className={btnClassNames} to={to}>
      {children}
    </Link>
  );
};
export default LinkButton;
