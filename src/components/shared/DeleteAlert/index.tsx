import { useState } from 'react';
import classNames from 'classnames';

import styles from './DeleteAlert.module.scss';
import { AlertProps } from './types';

const DeleteAlert = ({ open, handleClose, handleDelete, id }: AlertProps) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const popUpClasses = classNames(styles.wrapper, { [styles.wrapper__open]: open });

  // eslint-disable-next-line no-console
  console.log(deleted, 'deleted');
  const handleDeleteClick = async () => {
    if (id) {
      await handleDelete(id);
      setDeleted(true);
    }
  };

  return (
    <div className={popUpClasses}>
      <div className={styles.popup}>
        <p className={styles.popup__header}>
          {!deleted
            ? 'Are you sure you want to delete this user?'
            : 'You succesefully deleted account!'}
        </p>
        <div className={styles.popup__action}>
          {!deleted ? (
            <>
              <div className={styles.popup__action__cancel} onClick={handleClose} role='button'>
                Cancel
              </div>
              <div
                role='button'
                onClick={handleDeleteClick}
                className={styles.popup__action__confirm}
              >
                Delete
              </div>
            </>
          ) : (
            <div role='button' onClick={handleClose} className={styles.popup__action__continue}>
              Continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DeleteAlert;
