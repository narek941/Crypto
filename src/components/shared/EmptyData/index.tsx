import classNames from 'classnames';

import styles from './EmptyData.module.scss';
import { IEmptyData } from './types';

const EmptyData = ({ className, text }: IEmptyData): JSX.Element => {
  const emptyDataClass: string = classNames(styles.container, className);

  return (
    <div className={emptyDataClass}>
      <span>{text ? text : 'No data available in table!'}</span>
    </div>
  );
};
export default EmptyData;
