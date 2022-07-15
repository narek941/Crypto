import { ForwardedRef, forwardRef, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import { DropDownIcon } from 'assets/icons';
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './Select.module.scss';
import { ColorType, ISelect } from './types';

const Select = forwardRef(
  (
    {
      id,
      name,
      label,
      error,
      className,
      color = 'default',
      placeholder,
      options = ['administrator', 'analyst', 'viewer'],
      onChange,
      onBlur,
      value,
      ...props
    }: ISelect,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const getSelectClassName = (color: ColorType): string => {
      const selectClass: string = classNames(styles['select-wrapper'], className, {
        [styles['select-primary']]: color === 'primary',
        [styles['select-default']]: color === 'default',
      });
      return selectClass;
    };

    useEffect(() => {
      onChange(options[0]);
    }, []);

    const selectRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

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

    const toggleDrop = () => {
      setIsOpen(!isOpen);
    };

    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false);
        onBlur();
      }
    };

    const handleCancel = () => {
      onChange('');
      setIsOpen(false);
      onBlur();
    };
    const handleSelect = (selectedItem: string) => {
      onChange(selectedItem);
    };

    useOnClickOutside(selectRef, handleClickOutside);

    return (
      <div className={selectClass} ref={ref}>
        <label htmlFor={name} className={styles['select-label']}>
          {label}
        </label>
        <div ref={selectRef} className={styles.wrapper} id={id} {...props}>
          <div onClick={toggleDrop} className={headerClassName}>
            {value || placeholder}
            <DropDownIcon role='button' className={dropClassName} />
          </div>
          <div className={optionClassName}>
            {options.map((item, index) => (
              <div
                key={index}
                className={classNames(styles.select__option__item, {
                  [styles.select__option__item__selected]: item === value,
                })}
                onClick={() => handleSelect(item)}
              >
                {item}
              </div>
            ))}
            <div className={styles.select__option__action}>
              <div className={styles.select__option__action__cancel} onClick={handleCancel}>
                cancel
              </div>
              <div className={styles.select__option__action__select} onClick={toggleDrop}>
                select
              </div>
            </div>
          </div>
        </div>

        {error && <span className={styles['select-errorMsg']}>{error.message}</span>}
      </div>
    );
  },
);
Select.displayName = 'Select';

export default Select;
