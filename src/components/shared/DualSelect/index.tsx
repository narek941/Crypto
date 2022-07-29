import { useState, forwardRef, useRef } from 'react';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { MenuItem, Select } from '@mui/material';

import useOnClickOutside from 'hooks/useOutsideClick';
import { DropDownIcon } from 'assets/icons';

import styles from './DualSelect.module.scss';

const DualSelect = forwardRef<any, any>(({ formMethods, name, placeholder }, ref: any) => {
  const customRef = useRef(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  // eslint-disable-next-line no-console
  const { selectPairStart, selectPairEnd } = formMethods.watch();

  const headerClass = classNames(styles.header, { [styles.header__open]: isOpenDropdown });
  const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpenDropdown });

  const toggleDrop = () => {
    setIsOpenDropdown(true);
  };

  const handleCloseDropDown = () => {
    setIsOpenDropdown(false);
  };

  useOnClickOutside(customRef, handleCloseDropDown);

  return (
    <div className={headerClass}>
      <div role='button' onClick={toggleDrop} className={styles.header__inner}>
        <p className={styles.header__input}>
          {selectPairStart && selectPairEnd ? `${selectPairStart} / ${selectPairEnd}` : placeholder}
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
                  <Select {...field} className={styles.select} defaultValue={'BTC'} ref={ref}>
                    <MenuItem className={styles.select__item} value={'BTC'}>
                      BTC
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'ETH'}>
                      ETH
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'USDT'}>
                      USDT
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'XRP'}>
                      XRP
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'BNB'}>
                      BNB
                    </MenuItem>
                  </Select>
                )}
              ></Controller>
            </div>
            <div>
              <Controller
                control={formMethods.control}
                name={`${name}End`}
                {...formMethods.register(`${name}End`)}
                render={({ field }) => (
                  <Select {...field} className={styles.select} defaultValue={'BTC'} ref={ref}>
                    <MenuItem className={styles.select__item} value={'BTC'}>
                      BTC
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'ETH'}>
                      ETH
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'USDT'}>
                      USDT
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'XRP'}>
                      XRP
                    </MenuItem>
                    <MenuItem className={styles.select__item} value={'BNB'}>
                      BNB
                    </MenuItem>
                  </Select>
                )}
              ></Controller>
            </div>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.action__cancel} role='button' onClick={handleCloseDropDown}>
            Cancel
          </div>
          <div className={styles.action__select} role='button' onClick={handleCloseDropDown}>
            Select
          </div>
        </div>
      </div>
    </div>
  );
});

export default DualSelect;
