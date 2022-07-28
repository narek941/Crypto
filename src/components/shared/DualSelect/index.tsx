import { useState } from 'react';
import classNames from 'classnames';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import useOnClickOutside from 'hooks/useOutsideClick';
import { DropDownIcon } from 'assets/icons';

import styles from './DualSelect.module.scss';

const DualSelect = ({ placeholder = 'BTC/USDT', ref }: any) => {
  const [value, setValue] = useState('BTC');
  const [secondValue, setSecondValue] = useState('USDT');

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const headerClass = classNames(styles.header, { [styles.header__open]: isOpenDropdown });
  const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpenDropdown });

  const handleFirstInputChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const handleSecondInputChange = (event: SelectChangeEvent) => {
    setSecondValue(event.target.value as string);
  };

  const toggleDrop = () => {
    setIsOpenDropdown(true);
  };

  const handleCloseDropDown = () => {
    setIsOpenDropdown(false);
  };

  useOnClickOutside(ref, handleCloseDropDown);

  const headerText = value ? `${value} /  ${secondValue} ` : placeholder;

  return (
    <div className={headerClass}>
      <div role='button' onClick={toggleDrop} className={styles.header__inner}>
        <span> {headerText}</span>
        <div>
          <DropDownIcon />
        </div>
      </div>

      <div className={modalClass} ref={ref}>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <div>
              <Select
                onChange={handleFirstInputChange}
                value={value}
                className={styles.select}
                name='1'
              >
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
            </div>
            <div>
              <Select
                onChange={handleSecondInputChange}
                value={secondValue}
                name='2'
                className={styles.select}
              >
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
};

export default DualSelect;
