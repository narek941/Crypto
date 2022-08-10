import React, { ForwardedRef, useState, useRef } from 'react';
import classNames from 'classnames';

import { DropDownIcon } from 'assets/icons';
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './Select.module.scss';
import { ColorType, ISelect } from './types';

const Select = React.forwardRef(
  (
    {
      id,
      name,
      error,
      label,
      className,
      color = 'default',
      placeholder,
      options,
      onChange,
      onBlur,
      value,
      callback,
      filterName,
      withAction = true,
      ...props
    }: ISelect,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const selectRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOption, setFilteredOption] = useState(options);

    const currentOption = options.find((option) => option.value === value);

    const getSelectClassName = (color: ColorType): string => {
      const selectClass: string = classNames(styles['select-wrapper'], className, {
        [styles['select-primary']]: color === 'primary',
        [styles['select-default']]: color === 'default',
      });
      return selectClass;
    };

    const dropClass: string = classNames(styles.select__dropdown, {
      [styles.select__dropdown__open]: isOpen,
    });

    const optionClass: string = classNames(styles.select__option, {
      [styles.select__option__open]: isOpen,
    });

    const headerClass: string = classNames(styles.header, {
      [styles.header__open]: isOpen,
      [styles.select__placeholder]: !currentOption?.label,
    });

    const inputClass: string = classNames(styles.header__input, {
      [styles.header__input__selected]: currentOption,
    });

    const selectClassName: string = getSelectClassName(color);

    const selectClass: string = classNames(selectClassName);

    const openDropdown = () => {
      setIsOpen(true);
    };

    const closeDropdown = () => {
      setIsOpen(false);
      setFilteredOption(options);
    };

    const handleCancel = () => {
      onChange('');
      onBlur();
      closeDropdown();
    };

    const handleSelect = (selectedItem: string) => {
      onChange(selectedItem);

      setFilteredOption(options);
      if (!callback) {
        closeDropdown();
      }
    };

    const handleSubmit = () => {
      if (callback && filterName && currentOption && isOpen) {
        callback(filterName, currentOption?.value);
      }

      closeDropdown();
      onBlur();
    };

    const handleSearch = (e: any) => {
      onChange(e.target.value);
      const newOption = options.filter((item) =>
        item.label.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setFilteredOption(newOption);
    };

    useOnClickOutside(selectRef, handleSubmit);

    return (
      <div className={selectClass}>
        <label htmlFor={name} className={styles.select__label}>
          {label}
        </label>
        <div ref={selectRef} className={styles.wrapper} id={id} {...props}>
          <div onClick={openDropdown} className={headerClass}>
            <input
              placeholder={placeholder}
              value={value ? currentOption?.label : ''}
              onChange={handleSearch}
              className={inputClass}
              name={name}
              ref={ref}
            />
            <DropDownIcon role='button' className={dropClass} />
          </div>
          <div className={optionClass}>
            <div
              style={{
                maxHeight: 211,
                overflowY: 'scroll',
              }}
            >
              {filteredOption.map((item, index) => (
                <div
                  key={index}
                  className={classNames(styles.select__option__item, {
                    [styles.select__option__item__selected]: item === value,
                  })}
                  onClick={() => handleSelect(item.value)}
                >
                  {item.label}
                </div>
              ))}
            </div>
            {withAction && (
              <div className={styles.select__option__action}>
                <div className={styles.select__option__action__cancel} onClick={handleCancel}>
                  cancel
                </div>
                <div className={styles.select__option__action__select} onClick={handleSubmit}>
                  select
                </div>
              </div>
            )}
          </div>
        </div>

        {error && <span className={styles['select-errorMsg']}>{error}</span>}
      </div>
    );
  },
);
Select.displayName = 'Select';

export default Select;
