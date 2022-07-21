import React from 'react';

import { IToggleSwitchProps } from './types';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({ checked = false, onChange }: IToggleSwitchProps) => {
  return (
    <label className={styles.toggle__switch}>
      <input type='checkbox' checked={checked} onChange={onChange} />
      <span className={styles.switch} />
    </label>
  );
};

export default ToggleSwitch;
