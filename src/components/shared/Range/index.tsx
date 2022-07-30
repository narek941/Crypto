import { useState, forwardRef, useRef } from 'react';
import Slider from '@mui/material/Slider';
import classNames from 'classnames';

import useOnClickOutside from 'hooks/useOutsideClick';
import { DollarIcon } from 'assets/icons';

import Input from '../Input';

import styles from './Range.module.scss';

const RangeSwipe = forwardRef<any, any>(
  ({ name, placeholder = 'search', Icon, onChange, value, ...rest }: any, ref) => {
    const customRef = useRef(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const headerClass = classNames(styles.header, { [styles.header__open]: isOpen });
    const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpen });
    const textClass = classNames(styles.header__input, {
      [styles.header__input__placeholder]: !value[0] && !value[1],
    });

    const toggleDrop = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
    };

    useOnClickOutside(customRef, handleClose);

    return (
      <div role='button' onClick={toggleDrop} className={headerClass}>
        <p className={textClass}>
          {!value.includes(undefined) ? `${value[0]} / ${value[1]}` : placeholder}
        </p>
        <div>{Icon ? <Icon /> : <DollarIcon />}</div>
        <div className={modalClass} ref={customRef}>
          <div className={styles.wrapper}>
            <div className={styles.inner}>
              <Input value={value[0]} name={'firstInput'} type='number' className={styles.input} />
              <span>-</span>
              <Input value={value[1]} name={'secondInput'} type='number' className={styles.input} />
            </div>
            <div className={styles.slider}>
              <Slider
                value={value}
                onChange={onChange}
                aria-labelledby='input-slider'
                {...rest}
                id={name}
                ref={ref}
                name={name}
                autoComplete='off'
                placeholder={placeholder}
              />
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.action__cancel} role='button' onClick={handleClose}>
              cancel
            </div>
            <div className={styles.action__select} role='button' onClick={handleClose}>
              select
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default RangeSwipe;
