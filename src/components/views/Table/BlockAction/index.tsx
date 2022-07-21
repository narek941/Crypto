import { AccountBlockIcon, UnblockIcon } from 'assets/icons';

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
  return (
    <>
      {status == 'BLOCKED' ? (
        <div
          className={styles.table__body__row__ceil__actions__block}
          onClick={() => handleUnblock(id)}
        >
          <UnblockIcon />
          <span className={tooltipClasses}>Unblock {action}</span>
        </div>
      ) : (
        <div
          className={styles.table__body__row__ceil__actions__block}
          onClick={() => handleBlock(id)}
        >
          <AccountBlockIcon />
          <span className={tooltipClasses}>Block {action}</span>
        </div>
      )}
    </>
  );
};

export default BlockAction;
