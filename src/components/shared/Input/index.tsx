import React, { useMemo, useState, useCallback } from 'react';
import classNames from 'classnames';

import { EyeOpenIcon } from 'assets/icons';
import { EyeCloseIcon } from 'assets/icons';

import Typography from '../Typography';

import { IInputProps } from './types';
import styles from './Input.module.scss';

const Input = React.forwardRef<any, IInputProps>(
  (
    {
      name,
      error,
      disabled,
      RightIcon = EyeOpenIcon,
      RightToggledIcon = EyeCloseIcon,
      placeholder,
      type = 'text',
      className = '',
      innerClassName = '',
      haveRightIcon = false,
      label,
      isSmall,
      onChange,
      onFocus,
      ...rest
    },
    ref,
  ) => {
    const inputClasses = classNames(styles.container, {
      [className]: className,
      [styles.container__error]: !!error,
      [styles.container__isLabel]: label,
      [styles.container_with_icon]: haveRightIcon,
      [styles.container__small]: isSmall,
    });

    const inputInnerClasses = classNames(styles.container__inner, {
      [innerClassName]: innerClassName,
      [styles.container__inner__error]: !!error,
      [styles.container__inner_disabled]: disabled,
    });

    const [isToggledIcon, setIsToggledIcon] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
      if (haveRightIcon) {
        setIsToggledIcon(!isToggledIcon);
      }
    }, [haveRightIcon, isToggledIcon]);

    const RightIconComponent = useMemo(
      () =>
        (haveRightIcon ? (isToggledIcon ? RightToggledIcon : RightIcon) : RightIcon) as React.FC<
          React.SVGProps<SVGSVGElement>
        >,
      [RightIcon, RightToggledIcon, haveRightIcon, isToggledIcon],
    );

    return (
      <>
        <div className={inputInnerClasses}>
          <label htmlFor={name} className={styles.container__inner__label}>
            {label}
          </label>
          <div className={styles.input}>
            <input
              {...rest}
              id={name}
              ref={ref}
              name={name}
              autoComplete='off'
              disabled={disabled}
              className={inputClasses}
              placeholder={placeholder}
              onChange={onChange}
              onFocus={onFocus}
              type={isToggledIcon ? 'text' : type}
            />
            {haveRightIcon && (
              <RightIconComponent
                role='button'
                className={styles.container__right_icon}
                onClick={togglePasswordVisibility}
                style={{
                  cursor: haveRightIcon ? 'pointer' : 'auto',
                }}
              />
            )}
          </div>
          {error && (
            <Typography type='Small' className={styles.container__error__text}>
              {error}
            </Typography>
          )}
        </div>
      </>
    );
  },
);

export default Input;
