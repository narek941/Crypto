import React, { ForwardedRef } from 'react';
import classNames from 'classnames';

import { CheckIcon } from 'assets/icons';

import styles from './Checkbox.module.scss';
import { ICheckbox } from './types';

const Checkbox = React.forwardRef(
  (
    { id, name, text, error, defaultChecked = false, className, color, ...props }: ICheckbox,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const getCheckboxClassName = (color: any): string => {
      const checkboxClass: string = classNames(styles['checkbox-wrapper'], className, {
        [styles['checkbox-primary']]: color === 'primary',
        [styles['checkbox-default']]: color === 'default',
        [styles['checkbox-secondary']]: color === 'secondary',
      });
      return checkboxClass;
    };

    const checkboxClassName: string = getCheckboxClassName(color);

    const checkboxClass: string = classNames(checkboxClassName);
    return (
      <div className={checkboxClass}>
        <input
          type='checkbox'
          id={id}
          name={name}
          ref={ref}
          defaultChecked={defaultChecked}
          {...props}
        />
        <CheckIcon className={styles.icon} />
        <label htmlFor={id} className={styles['checkbox-label']}>
          {text}
        </label>
        {error && <span className={styles['checkbox-errorMsg']}>{error.message}</span>}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export default Checkbox;
