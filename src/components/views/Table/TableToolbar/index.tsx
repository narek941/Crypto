import classNames from 'classnames';

import { LinkButton, Search } from 'components';

import styles from './TableToolbar.module.scss';
import { ITableToolbarProps } from './types';

const TableToolbar = ({ linkText, linkTo, onClick }: ITableToolbarProps): JSX.Element => {
  const text = `+ ADD NEW ${linkText}`;
  const toolbarClasses = classNames(styles.toolbar, {
    [styles.toolbar_nolink]: !linkTo,
  });

  return (
    <div className={toolbarClasses}>
      {linkText && linkTo && (
        <div className={styles.toolbar__link}>
          <LinkButton to={linkTo}>{text}</LinkButton>
        </div>
      )}
      <div className={styles.toolbar__search}>
        <Search onClick={onClick} />
      </div>
    </div>
  );
};

export default TableToolbar;
