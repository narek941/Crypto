import classNames from 'classnames';

import styles from './EmptyData.module.scss';
import { IEmptyData } from './types';

const EmptyData = ({ className }: IEmptyData) => {
  const emptyDataClass = classNames(styles.container, className);
  return (
    <div className={emptyDataClass}>
      <span>No data available in table!</span>
    </div>
  );
};
export default EmptyData;
