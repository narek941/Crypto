import { SyntheticEvent, useState } from 'react';

import { AccountBlockIcon, UnblockIcon } from 'assets/icons';
import { Alert } from 'components';

import styles from '../Table.module.scss';

import { IBlockAction } from './types';

const BlockAction = ({
  status,
  id,
  handleUnblock,
  handleBlock,
  action,
  tooltipClasses,
}: IBlockAction) => {
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (e: SyntheticEvent) => {
    e.stopPropagation();
    setOpenAlert(!openAlert);
  };

  return (
    <>
      {status == 'BLOCKED' ? (
        <div className={styles.table__body__row__ceil__actions__block} onClick={handleCloseAlert}>
          <UnblockIcon />
          <span className={tooltipClasses}>Unblock {action}</span>
        </div>
      ) : (
        <div className={styles.table__body__row__ceil__actions__block} onClick={handleCloseAlert}>
          <AccountBlockIcon />
          <span className={tooltipClasses}>Block {action}</span>
        </div>
      )}
      <Alert
        id={id}
        open={openAlert}
        type={status == 'BLOCKED' ? 'UNBLOCK' : 'BLOCK'}
        handleAction={status === 'BLOCKED' ? handleUnblock : handleBlock}
        handleClose={handleCloseAlert}
      />
    </>
  );
};

export default BlockAction;
