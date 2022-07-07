import React, { ForwardedRef, forwardRef, useState, useRef } from 'react';
import classNames from 'classnames';

import { DropDownIcon } from 'icons';
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './Select.module.scss';
import { ISelect } from './types';

const Select = forwardRef(
  (
    {
      id,
      name,
      label,
      error,
      className,
      color,
      placeholder,
      data = ['admin', 'user'],
      ...props
    }: ISelect,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const getSelectClassName = (color: any): string => {
      const selectClass: string = classNames(styles['select-wrapper'], className, {
        [styles['select-primary']]: color === 'primary',
        [styles['select-default']]: color === 'default',
      });
      return selectClass;
    };

    const selectRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [selectText, setSelectText] = useState(placeholder);

    const toggleDrop = () => {
      setIsOpen(!isOpen);
    };

    const handleClickOutside = () => {
      setIsOpen(false);
    };

    const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setSelectText(e.currentTarget.innerText);
      handleClickOutside();
    };

    const dropClassName: string = classNames(styles.select__dropdown, {
      [styles.select__dropdown__open]: isOpen,
    });

    const optionClassName: string = classNames(styles.select__option, {
      [styles.select__option__open]: isOpen,
    });

    const headerClassName: string = classNames(styles.header, {
      [styles.header__open]: isOpen,
    });

    const selectClassName: string = getSelectClassName(color);

    const selectClass: string = classNames(selectClassName);

    useOnClickOutside(selectRef, handleClickOutside);

    return (
      <div className={selectClass} ref={ref}>
        <label htmlFor={name} className={styles['select-label']}>
          {label}
        </label>
        <div ref={selectRef} className={styles.wrapper} id={id} {...props}>
          <div onClick={toggleDrop} className={headerClassName}>
            {selectText}
            <DropDownIcon role='button' className={dropClassName} />
          </div>
          <div className={optionClassName}>
            {data.map((item, index) => (
              <div
                key={index}
                className={styles.select__option__item}
                onClick={(e) => handleSelect(e)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {error && <span className={styles['select-errorMsg']}>{error.message}</span>}
      </div>
    );
  },
);
Select.displayName = 'Select';

export default Select;
