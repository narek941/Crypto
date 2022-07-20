import { AccountBlockIcon, UnblockIcon } from 'assets/icons';

import styles from '../Table.module.scss';

import { IBlockAction } from './types';

const BlockAction = ({ status, id, handleUnblock, handleBlock }: IBlockAction) => {
  return (
    <>
      {status == 'BLOCKED' ? (
        <div
          className={styles.table__body__row__ceil__actions__block}
          onClick={() => handleUnblock(id)}
        >
          <UnblockIcon />
          <span>Unblock account</span>
        </div>
      ) : (
        <div
          className={styles.table__body__row__ceil__actions__block}
          onClick={() => handleBlock(id)}
        >
          <AccountBlockIcon />
          <span>Block account</span>
        </div>
      )}
    </>
  );
};

export default BlockAction;
