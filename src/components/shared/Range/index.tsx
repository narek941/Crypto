import { useState, useRef } from 'react';
import Slider from '@mui/material/Slider';
import classNames from 'classnames';

import useOnClickOutside from 'hooks/useOutsideClick';
import { DollarIcon } from 'assets/icons';

import Input from '../Input';

import styles from './Range.module.scss';

const RangeSwipe = () => {
  const [value, setValue] = useState<number[]>([0, 100]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const headerClass = classNames(styles.header, { [styles.header__open]: isOpen });
  const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpen });

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleFirstInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([Number(event.target.value), value[1]]);
  };

  const handleSecondInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([value[0], Number(event.target.value)]);
  };

  const toggleDrop = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClose);

  const headerText = value[0] ? `${value[0]} -  ${value[1]} ` : 'Select Value';

  return (
    <div role='button' onClick={toggleDrop} className={headerClass}>
      <span> {headerText}</span>
      <div>
        <DollarIcon />
      </div>
      <div className={modalClass} ref={ref}>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <Input
              value={value[0]}
              onChange={handleFirstInputChange}
              name={'firstInput'}
              type='number'
              className={styles.input}
            />
            <span>-</span>
            <Input
              value={value[1]}
              onChange={handleSecondInputChange}
              name={'secondInput'}
              type='number'
              className={styles.input}
            />
          </div>
          <div className={styles.slider}>
            <Slider value={value} onChange={handleChange} aria-labelledby='input-slider' />
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.action__cancel} onClick={handleClose}>
            cancel
          </div>
          <div className={styles.action__select} onClick={handleClose}>
            select
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSwipe;
