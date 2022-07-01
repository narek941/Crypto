import LinkButton from 'components/shared/LinkButton';
import Search from 'components/views/Search';

import styles from './TableToolbar.module.scss';
import { ITableToolbarProps } from './types';

const TableToolbar = ({ linkText, linkTo }: ITableToolbarProps): JSX.Element => {
  const text = `+ ADD NEW ${linkText}`;
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__link}>
        {linkText && linkTo && <LinkButton to={linkTo}>{text}</LinkButton>}
      </div>
      <Search />
    </div>
  );
};

export default TableToolbar;
