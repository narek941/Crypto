import { FC } from 'react';
import classNames from 'classnames';
import Slider from '@mui/material/Slider';

import { IRange } from './types';
import styles from './Bricks.module.scss';

const Range: FC<IRange> = ({ className }) => {
  const RangeClass: string = classNames(styles.range, className);

  return (
    <div className={RangeClass}>
      <Slider defaultValue={30} aria-label='Disabled slider' />
    </div>
  );
};

export default Range;
