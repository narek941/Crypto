import classNames from 'classnames';

import { IBricks } from './types';
import styles from './Bricks.module.scss';

const Bricks = ({ className, header, value, moreText }: IBricks): JSX.Element => {
  const bricksClass: string = classNames(styles.bricks, className);

  return (
    <div className={bricksClass}>
      <p className={styles.bricks__header}>{header}</p>
      <p className={styles.bricks__value}>{value}</p>
      {moreText && <span className={styles.bricks__moreText}>{moreText}</span>}
    </div>
  );
};

export default Bricks;
