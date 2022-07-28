import { useState } from 'react';
import classNames from 'classnames';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import useOnClickOutside from 'hooks/useOutsideClick';
import { DropDownIcon } from 'assets/icons';

import styles from './DualSelect.module.scss';

const DualSelect = ({ placeholder = 'BTC/USDT', ref }: any) => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const headerClass = classNames(styles.header, { [styles.header__open]: isOpenDropdown });
  const modalClass = classNames(styles.modal, { [styles.modal__open]: isOpenDropdown });

  const handleFirstInputChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const handleSecondInputChange = (event: SelectChangeEvent) => {
    setValue2(event.target.value as string);
  };

  const toggleDrop = () => {
    setIsOpenDropdown(true);
  };

  const handleClose = () => {
    setIsOpenDropdown(false);
  };

  useOnClickOutside(ref, handleClose);

  const headerText = value ? `${value} /  ${value2} ` : placeholder;

  return (
    <div role='button' onClick={toggleDrop} className={headerClass}>
      <span> {headerText}</span>
      <div>
        <DropDownIcon />
      </div>
      <div className={modalClass} ref={ref}>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <div>
              <Select onChange={handleFirstInputChange} value={value} className={styles.select}>
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
              <Select onChange={handleSecondInputChange} value={value2} className={styles.select}>
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
          <div className={styles.action__cancel} onClick={handleClose}>
            cancel
          </div>
          <div className={styles.action__select} onClick={handleClose}>
            select
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualSelect;
