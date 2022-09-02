import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';

import { useOnClickOutside } from 'hooks';
import { CloseIcon, DropDownIcon } from 'assets/icons';

import Select from '../Select';

import styles from './DualSelect.module.scss';

const DualSelect = React.forwardRef<any, any>(
  (
    { formMethods, name, placeholder, firstOptions, secondOptions, callback, filterName, closed },
    ref: any,
  ) => {
    const sortedFirstOptions = firstOptions.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label);
    });
    const sortedSecondOptions = secondOptions.sort((a: any, b: any) => {
      return a.label.localeCompare(b.label);
    });
    const customWrapperRef = useRef(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
    const fields = formMethods.watch();
    const selectPairStart = fields[`${name}Start`];
    const selectPairEnd = fields[`${name}End`];
    const headerClass = classNames(styles.header, { [styles.header__open]: isOpenDropdown });
    const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpenDropdown });
    const textClass = classNames(styles.header__input, {
      [styles.header__input__placeholder]: !selectPairStart && !selectPairEnd,
    });

    const toggleDrop = () => {
      setIsOpenDropdown(true);
    };

    const handleClose = () => {
      setIsOpenDropdown(false);
    };

    const handleSubmit = () => {
      if (callback && filterName && selectPairStart && selectPairEnd && isOpenDropdown) {
        callback(filterName, [selectPairStart, selectPairEnd]);
      }
      handleClose();
    };

    const handleClear = (event?: React.FormEvent<SVGSVGElement>) => {
      event?.stopPropagation();
      formMethods.resetField(`${name}Start`);
      formMethods.resetField(`${name}End`);
      callback(filterName, null);
    };

    useEffect(() => {
      if (closed && filterName) {
        handleClear();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closed]);

    useOnClickOutside(customWrapperRef, handleSubmit);

    return (
      <div className={headerClass}>
        <div role='button' onClick={toggleDrop} className={styles.header__inner}>
          <p className={textClass}>
            {selectPairStart || selectPairEnd
              ? `${firstOptions.find((item: any) => item.value === selectPairStart)?.label || ''} ${
                  secondOptions.find((item: any) => item.value === selectPairEnd)?.label ? '/' : ''
                } ${secondOptions.find((item: any) => item.value === selectPairEnd)?.label || ''}`
              : placeholder}
          </p>
          <div>{(selectPairStart || selectPairEnd) && <CloseIcon onClick={handleClear} />}</div>
          <div>
            <DropDownIcon />
          </div>
        </div>

        <div className={modalClass} ref={customWrapperRef}>
          <div className={styles.wrapper}>
            <div className={styles.inner}>
              <div>
                <Controller
                  control={formMethods.control}
                  name={`${name}End`}
                  {...formMethods.register(`${name}Start`)}
                  render={({ field }) => (
                    <Select
                      options={sortedFirstOptions}
                      {...field}
                      defaultValue={'BTC'}
                      ref={ref}
                      withAction={false}
                      withClear={false}
                    />
                  )}
                ></Controller>
              </div>
              <div>
                <Controller
                  control={formMethods.control}
                  name={`${name}End`}
                  {...formMethods.register(`${name}End`)}
                  render={({ field }) => (
                    <Select
                      options={sortedSecondOptions}
                      {...field}
                      defaultValue={'BTC'}
                      ref={ref}
                      withAction={false}
                      withClear={false}
                    />
                  )}
                ></Controller>
              </div>
            </div>
          </div>
          <div className={styles.action}>
            <div className={styles.action__cancel} role='button' onClick={handleClose}>
              Cancel
            </div>
            <div className={styles.action__select} role='button' onClick={handleSubmit}>
              Select
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default DualSelect;
