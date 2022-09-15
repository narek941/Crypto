import React, { useState, useRef, useEffect, ForwardedRef } from 'react';
import Slider from '@mui/material/Slider';
import classNames from 'classnames';

import { useOnClickOutside } from 'hooks';
import { CloseIcon, RangeIcon } from 'assets/icons';

import Input from '../Input';

import styles from './Range.module.scss';

const RangeSwipe = React.forwardRef(
  (
    {
      name,
      placeholder = 'search',
      Icon,
      onChange,
      min = 0,
      max = 100000,
      value: propsValue,
      callback,
      filterName,
      closed,
      isPercent = false,
      ...rest
    }: any,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const value = propsValue;
    const customRef = useRef(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [firstInput, setFirstInput] = useState<any>(Number(min));
    const [secondInput, setSecondInput] = useState<any>(Number(max));

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

    const handleFirstBlur = () => {
      if (!isNaN(firstInput)) {
        if (Number(firstInput) > Number(min)) {
          onChange([firstInput, value[1]]);
          setFirstInput(NaN);
        } else {
          onChange([Number(min), value[1]]);
          setFirstInput(NaN);
        }
      }
    };

    const handleSecondBlur = () => {
      if (!isNaN(secondInput)) {
        if (Number(secondInput) < Number(max)) {
          onChange([value[0], secondInput]);
          setSecondInput(NaN);
        } else {
          onChange([value[0], Number(max)]);
          setSecondInput(NaN);
        }
      }
    };

    const handleFirstChange = ({ target }: any) => {
      setFirstInput(target.value);
    };

    const handleRangeChange = ({ target }: any) => {
      setFirstInput(NaN);
      setSecondInput(NaN);
      onChange(target.value);
    };

    const handleSecondChange = ({ target }: any) => {
      setSecondInput(target.value);
    };

    const handleClear = (event?: React.FormEvent<HTMLElement>) => {
      event?.stopPropagation();
      onChange(['', '']);
      callback && callback(filterName, null);
    };
    useEffect(() => {
      setFirstInput(Number(min));
      setSecondInput(Number(max));
    }, [min, max]);

    useEffect(() => {
      if (closed && callback) {
        handleClear();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closed]);

    useOnClickOutside(customRef, handleSubmit);

    return (
      <div role='button' onClick={toggleDrop} className={headerClass}>
        <p className={textClass}>
          {value[0] === '' && value[1] === '' ? placeholder : `${value[0]} / ${value[1]}`}
        </p>
        <div className={styles.icon__wrapper}>
          <div className={styles.icon} onClick={handleClear}>
            {(value[0] === '' && value[1] === '') || <CloseIcon />}
          </div>
          <div className={styles.icon}>{Icon ? <Icon /> : <RangeIcon />}</div>
        </div>
        <div className={modalClass} ref={customRef}>
          <div className={styles.wrapper}>
            <div className={styles.inner}>
              <Input
                value={!isNaN(firstInput) ? firstInput : value[0]}
                name={'firstInput'}
                type='number'
                className={styles.input}
                placeholder={min}
                onChange={handleFirstChange}
                onBlur={handleFirstBlur}
              />
              <span>-</span>
              <Input
                value={!isNaN(secondInput) ? secondInput : value[1]}
                name={'secondInput'}
                type='number'
                className={styles.input}
                placeholder={max}
                onChange={handleSecondChange}
                onBlur={handleSecondBlur}
              />
            </div>
            <div className={styles.slider}>
              <Slider
                value={value}
                onChange={handleRangeChange}
                aria-labelledby='input-slider'
                {...rest}
                id={name}
                ref={ref}
                min={Number(min)}
                max={Number(max)}
                step={isPercent ? 0.01 : 0.0001}
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
