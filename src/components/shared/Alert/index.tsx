import { useState } from 'react';
import classNames from 'classnames';

import styles from './Alert.module.scss';
import { AlertProps } from './types';

const Alert = ({ open, handleClose, handleAction, id, type }: AlertProps) => {
  const [actionIsDone, setActionIsDone] = useState<boolean>(false);
  const popUpClasses = classNames(styles.wrapper, { [styles.wrapper__open]: open });

  const renderText = () => {
    switch (type) {
      case 'DELETE':
        return {
          question: 'Are you sure you want to delete this user?',
          answer: `You successfully deleted account!`,
        };
      case 'BLOCK':
        return {
          question: 'Are you sure you want to block this user?',
          answer: `You successfully unblocked account!`,
        };

      default:
        return {
          question: 'Are you sure you want to unblock this user?',
          answer: `You successfully blocked account!`,
        };
    }
  };

  const handleDeleteClick = async () => {
    if (id) {
      await handleAction(id);
      setActionIsDone(true);
    }
  };

  const handleContinueClick = () => {
    handleClose();
    setActionIsDone(false);
  };

  return (
    <div className={popUpClasses}>
      <div className={styles.popup}>
        <p className={styles.popup__header}>
          {!actionIsDone ? renderText().question : renderText().answer}
        </p>
        <div className={styles.popup__action}>
          {!actionIsDone ? (
            <>
              <div className={styles.popup__action__cancel} onClick={handleClose} role='button'>
                Cancel
              </div>
              <div
                role='button'
                onClick={handleDeleteClick}
                className={styles.popup__action__confirm}
              >
                {type}
              </div>
            </>
          ) : (
            <div
              role='button'
              onClick={handleContinueClick}
              className={styles.popup__action__continue}
            >
              Continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
