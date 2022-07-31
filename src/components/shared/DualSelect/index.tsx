import { useState, forwardRef, useRef } from 'react';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';

import useOnClickOutside from 'hooks/useOutsideClick';
import { DropDownIcon } from 'assets/icons';

import Select from '../Select';

import styles from './DualSelect.module.scss';

const DualSelect = forwardRef<any, any>(
  (
    { formMethods, name, placeholder, firstOptions, secondOptions, callback, filterName },
    ref: any,
  ) => {
    const customRef = useRef(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
    const { selectPairStart, selectPairEnd } = formMethods.watch();

    const headerClass = classNames(styles.header, { [styles.header__open]: isOpenDropdown });
    const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpenDropdown });
    const textClass = classNames(styles.header__input, {
      [styles.header__input__placeholder]: !selectPairStart && !selectPairEnd,
    });

    const toggleDrop = () => {
      setIsOpenDropdown(true);
    };

    const handleCloseDropDown = () => {
      setIsOpenDropdown(false);
    };

    useOnClickOutside(customRef, handleCloseDropDown);

    const handleSubmit = () => {
      if (callback && filterName && selectPairStart && selectPairEnd) {
        callback(filterName, [selectPairStart, selectPairEnd]);
      }
      handleCloseDropDown();
    };

    return (
      <div className={headerClass}>
        <div role='button' onClick={toggleDrop} className={styles.header__inner}>
          <p className={textClass}>
            {selectPairStart && selectPairEnd
              ? `${firstOptions[Number(selectPairStart) - 1].label} / ${
                  secondOptions[Number(selectPairEnd) - 1].label
                }`
              : placeholder}
          </p>
          <div>
            <DropDownIcon />
          </div>
        </div>

        <div className={modalClass} ref={customRef}>
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
            <div className={styles.action__cancel} role='button' onClick={handleCloseDropDown}>
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
