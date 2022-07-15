import { FC } from 'react';
import classNames from 'classnames';

import { IBricks } from './types';
import styles from './Bricks.module.scss';

const Bricks: FC<IBricks> = ({ className, header, value, moreText }) => {
  const bricksClass: string = classNames(styles.bricks, className);

  return (
    <div className={bricksClass}>
      <p className={styles.bricks__header}>{header}</p>
      <p className={styles.bricks__value}>
        {value}
        {moreText && <span className={styles.bricks__moreText}>{moreText}</span>}
      </p>
    </div>
  );
};

export default Bricks;
