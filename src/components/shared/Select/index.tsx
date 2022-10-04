import React, { ForwardedRef, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { isString } from 'lodash';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CloseIcon, DropDownIcon } from 'assets/icons';
import { useOnClickOutside } from 'hooks';

import styles from './Select.module.scss';
import { ColorType, ISelect } from './types';

const Select = React.forwardRef(
  (
    {
      id,
      name,
      error,
      label,
      value,
      onBlur,
      closed,
      tooltip,
      callback,
      onChange,
      className,
      filterName,
      placeholder,
      options = [],
      numeric = false,
      withClear = true,
      viewOnly = false,
      color = 'default',
      withAction = false,
      transformLabel = false,
      ...props
    }: ISelect,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const { t } = useTranslation();
    const selectRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const transformedOption = transformLabel
      ? options?.map((item: any) => ({
          value: item?.value,
          label: item?.label.replace('_', ' ').toLowerCase(),
        }))
      : options;

    const sortedOption = numeric
      ? transformedOption
      : transformedOption?.sort((a: any, b: any) => {
          return a.label.localeCompare(b.label);
        });

    const [filteredOption, setFilteredOption] = useState(sortedOption);

    const currentOption = sortedOption?.find((option) => option.value === value);

    const getSelectClassName = (color: ColorType): string => {
      const selectClass: string = classNames(styles['select-wrapper'], className, {
        [styles['select-primary']]: color === 'primary',
        [styles['select-default']]: color === 'default',
      });
      return selectClass;
    };

    const dropClass: string = classNames(styles.select__dropdown, {
      [styles.select__dropdown__open]: isOpen && sortedOption.length >= 1,
      [styles.select__dropdown__disable]: viewOnly || sortedOption.length < 1,
    });

    const optionClass: string = classNames(styles.select__option, {
      [styles.select__option__open]: isOpen && sortedOption.length >= 1,
    });

    const headerClass: string = classNames(styles.header, {
      [styles.header__open]: isOpen && sortedOption.length >= 1,
      [styles.select__placeholder]: !currentOption?.label,
      [styles.header__error]: !!error,
    });

    const inputClass: string = classNames(styles.header__input, {
      [styles.header__input__selected]: currentOption,
    });

    const selectClassName: string = getSelectClassName(color);

    const selectClass: string = classNames(selectClassName);

    const openDropdown = () => {
      !viewOnly && setIsOpen(true);
    };

    const closeDropdown = () => {
      setIsOpen(false);
      setFilteredOption(sortedOption);
    };

    const handleCancel = () => {
      onChange('');
      onBlur();
      closeDropdown();
    };

    const handleSelect = (selectedItem: string | number) => {
      // eslint-disable-next-line no-console
      setFilteredOption(sortedOption);
      onChange(selectedItem);
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
      const newOption = sortedOption.filter((item) =>
        item.label.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setFilteredOption(newOption);
    };

    const handleClearSearch = () => {
      !currentOption && onChange(null);
    };

    const handleClear = (event?: React.FormEvent<HTMLElement>) => {
      event?.stopPropagation();
      onChange('');
      callback(filterName, null);
    };

    useEffect(() => {
      if (closed && filterName) {
        handleClear();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closed]);

    useOnClickOutside(selectRef, handleSubmit);

    return (
      <>
        <div className={selectClass}>
          {label && (
            <label htmlFor={name} className={styles.label}>
              {label}
            </label>
          )}
          <div ref={selectRef} className={styles.wrapper} id={id} {...props}>
            <div role='button' onClick={openDropdown} className={headerClass}>
              <Tooltip followCursor={true} placement='bottom' title={t(tooltip)}>
                <input
                  ref={ref}
                  name={name}
                  className={inputClass}
                  onChange={handleSearch}
                  onBlur={handleClearSearch}
                  placeholder={placeholder}
                  autoComplete='none'
                  readOnly={sortedOption.length < 1 || viewOnly}
                  defaultValue={props.defaultValue}
                  value={value ? currentOption?.label : ''}
                />
              </Tooltip>
              <div>
                {withClear && (
                  <div className={styles.select__clear} onClick={handleClear}>
                    {currentOption && callback && <CloseIcon />}
                  </div>
                )}
                <DropDownIcon role='button' className={dropClass} />
              </div>
            </div>
            <div className={optionClass}>
              <div className={styles.select__option__select_container}>
                {filteredOption.map((item) => (
                  <div
                    key={item?.value}
                    role='button'
                    onClick={() => handleSelect(item.value)}
                    className={classNames(styles.select__option__item, {
                      [styles.select__option__item__selected]: item === value,
                    })}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
              {withAction && (
                <div className={styles.select__option__action}>
                  <button className={styles.select__option__action__cancel} onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className={styles.select__option__action__select} onClick={handleSubmit}>
                    Select
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {isString(error) && <div className={styles['select-errorMsg']}>{error}</div>}
      </>
    );
  },
);
Select.displayName = 'Select';

export default Select;
