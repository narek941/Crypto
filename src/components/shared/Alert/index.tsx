import { SyntheticEvent, useState } from 'react';
import classNames from 'classnames';

import styles from './Alert.module.scss';
import { AlertProps } from './types';

const Alert = ({
  open,
  handleClose,
  handleAction,
  id,
  type,
  text,
  isActionIsDone = false,
}: AlertProps) => {
  const [actionIsDone, setActionIsDone] = useState<boolean>(isActionIsDone);

  const popUpClasses = classNames(styles.wrapper, { [styles.wrapper__open]: open });

  const renderText = () => {
    switch (type) {
      case 'DELETE':
        return {
          question: 'Are you sure you want to delete this user?',
          answer: `You successfully deleted account!`,
        };
      case 'DELETE_INFLOW':
        return {
          question: `Are you sure you want to delete this record?`,
          answer: `You successfully deleted record!`,
        };
      case 'BLOCK':
        return {
          question: 'Are you sure you want to block this user?',
          answer: `You successfully unblocked account!`,
        };
      case 'SYNCING':
        return {
          answer: `Synchronization of account is not finished yet...`,
        };
      case 'SYNCING_ADD':
        return {
          answer: `You can’t add new account because synchronization of account is not finished yet...`,
        };
      default:
        return {
          question: 'Are you sure you want to unblock this user?',
          answer: `You successfully blocked account!`,
        };
    }
  };

  const handleDeleteClick = async () => {
    if (id && handleAction) {
      await handleAction(id);
      setActionIsDone(true);
    }
  };

  const handleContinueClick = (e: SyntheticEvent) => {
    handleClose(e);
    !isActionIsDone && setActionIsDone(false);
  };

  return (
    <div className={popUpClasses}>
      <div className={styles.popup}>
        <p className={styles.popup__header}>
          {!actionIsDone && !isActionIsDone ? renderText().question : renderText().answer}
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
                {text || type}
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
