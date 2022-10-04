import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';

import { useOnClickOutside } from 'hooks';
import { CloseIcon, DropDownIcon } from 'assets/icons';
import { IOptionList } from 'types';

import Select from '../Select';

import styles from './DualSelect.module.scss';
import { IDualSelect } from './types';

const DualSelect = React.forwardRef(
  ({
    name,
    closed,
    callback,
    filterName,
    formMethods,
    placeholder,
    firstOptions,
    secondOptions,
    tooltip = null,
    singleFilterName,
  }: IDualSelect): JSX.Element => {
    const { t } = useTranslation();
    const sortedFirstOptions = firstOptions.sort((a: IOptionList, b: IOptionList) => {
      return a.label.localeCompare(b.label);
    });
    const sortedSecondOptions = secondOptions.sort((a: IOptionList, b: IOptionList) => {
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
      if (filterName && selectPairStart && isOpenDropdown) {
        if (selectPairEnd) {
          callback(filterName, [selectPairStart, selectPairEnd]);
        } else {
          singleFilterName && callback(singleFilterName, selectPairStart);
        }
      }
      handleClose();
    };

    const handleClear = (event?: React.FormEvent<SVGSVGElement>) => {
      event?.stopPropagation();
      if (selectPairEnd) {
        filterName && callback(filterName, null);
      } else {
        singleFilterName && callback(singleFilterName, null);
      }
      formMethods.resetField(`${name}Start`);
      formMethods.resetField(`${name}End`);
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
          <Tooltip followCursor={true} placement='bottom' title={t(tooltip)}>
            <p className={textClass}>
              {selectPairStart || selectPairEnd
                ? `${
                    firstOptions.find((item: IOptionList) => item.value === selectPairStart)
                      ?.label || ''
                  } ${
                    secondOptions.find((item: IOptionList) => item.value === selectPairEnd)?.label
                      ? '/'
                      : ''
                  } ${
                    secondOptions.find((item: IOptionList) => item.value === selectPairEnd)
                      ?.label || ''
                  }`
                : placeholder}
            </p>
          </Tooltip>
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
                      {...field}
                      withClear={false}
                      withAction={false}
                      defaultValue={'BTC'}
                      options={sortedFirstOptions}
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
                      {...field}
                      withClear={false}
                      withAction={false}
                      defaultValue={'BTC'}
                      options={sortedSecondOptions}
                    />
                  )}
                ></Controller>
              </div>
            </div>
          </div>
          {/* <div className={styles.action}>
            <div className={styles.action__cancel} role='button' onClick={handleClose}>
              Cancel
            </div>
            <div className={styles.action__select} role='button' onClick={handleSubmit}>
              Select
            </div>
          </div> */}
        </div>
      </div>
    );
  },
);

export default DualSelect;
