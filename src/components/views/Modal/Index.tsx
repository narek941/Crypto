import React, { ComponentType } from 'react';

import { CloseIcon } from 'icons';

import styles from './Modal.module.scss';

const Modal: ComponentType = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>
        <div className={styles.modal__header__item}>Account overview </div>
        <div className={styles.modal__header__item}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};
export default Modal;
