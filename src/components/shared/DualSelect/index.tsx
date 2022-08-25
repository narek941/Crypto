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
      if (callback && filterName && selectPairStart && selectPairEnd) {
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
    }, [closed]);

    useOnClickOutside(customWrapperRef, handleSubmit);

    return (
      <div className={headerClass}>
        <div role='button' onClick={toggleDrop} className={styles.header__inner}>
          <p className={textClass}>
            {selectPairStart && selectPairEnd
              ? `${firstOptions[Number(selectPairStart) - 1]?.label || ''} / ${
                  secondOptions[Number(selectPairEnd) - 1]?.label || ''
                }`
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
                      options={firstOptions}
                      {...field}
                      defaultValue={'BTC'}
                      ref={ref}
                      withAction={false}
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
                      options={secondOptions}
                      {...field}
                      defaultValue={'BTC'}
                      ref={ref}
                      withAction={false}
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
