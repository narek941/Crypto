import React, { useState, useRef } from 'react';
import Slider from '@mui/material/Slider';
import classNames from 'classnames';

import useOnClickOutside from 'hooks/useOutsideClick';
import { DollarIcon } from 'assets/icons';

import Input from '../Input';

import styles from './Range.module.scss';

const RangeSwipe = React.forwardRef<any, any>(
  (
    {
      name,
      placeholder = 'search',
      Icon,
      onChange,
      value: propsValue,
      callback,
      filterName,
      ...rest
    }: any,
    ref,
  ) => {
    const value = propsValue || [];
    const customRef = useRef(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const headerClass = classNames(styles.header, { [styles.header__open]: isOpen });
    const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpen });
    const textClass = classNames(styles.header__input, {
      [styles.header__input__placeholder]: !value[0] && !value[1],
    });

    const toggleDrop = () => {
      if (!isOpen) setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleSubmit = () => {
      if (callback && filterName && !!value[1] && isOpen) {
        callback(filterName, [Number(value[0]), Number(value[1])]);
      }
      handleClose();
    };

    useOnClickOutside(customRef, handleSubmit);

    return (
      <div role='button' onClick={toggleDrop} className={headerClass}>
        <p className={textClass}>
          {!value?.includes(undefined) ? `${value[0]} / ${value[1]}` : placeholder}
        </p>
        <div>{Icon ? <Icon /> : <DollarIcon />}</div>
        <div className={modalClass} ref={customRef}>
          <div className={styles.wrapper}>
            <div className={styles.inner}>
              <Input
                value={value[0]}
                name={'firstInput'}
                type='number'
                className={styles.input}
                placeholder={'0'}
              />
              <span>-</span>
              <Input
                value={value[1]}
                name={'secondInput'}
                type='number'
                className={styles.input}
                placeholder={'0'}
              />
            </div>
            <div className={styles.slider}>
              <Slider
                value={value}
                onChange={onChange}
                aria-labelledby='input-slider'
                {...rest}
                id={name}
                ref={ref}
                min={0}
                max={100000}
                step={100}
                name={name}
                autoComplete='off'
              />
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.action__cancel} role='button' onClick={handleClose}>
              cancel
            </div>
            <div className={styles.action__select} role='button' onClick={handleSubmit}>
              select
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default RangeSwipe;
