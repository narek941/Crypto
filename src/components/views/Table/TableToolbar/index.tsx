import classNames from 'classnames';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FilterIcon } from 'assets/icons';
import { LinkButton } from 'components';
import AccountsFilters from 'components/views/filters/AccountsFilters';
import UsersFilters from 'components/views/filters/UsersFilters';
import AlertsFilters from 'components/views/filters/AlertsFilters';

import styles from './TableToolbar.module.scss';
import { ITableToolbarProps } from './types';

const TableToolbar = ({ linkText, linkTo }: ITableToolbarProps): JSX.Element => {
  const { t } = useTranslation();
  const [filterVisible, setFilterVisible] = useState(false);
  const text = `+ ADD NEW ${linkText}`;
  const toolbarClasses = classNames(styles.toolbar, {
    [styles.toolbar_noLink]: !linkTo,
  });
  const handleFilter = () => setFilterVisible(!filterVisible);

  const renderFilter = () => {
    if (linkText === 'account') {
      return <AccountsFilters />;
    } else if (linkText === 'user') {
      return <UsersFilters />;
    } else {
      return <AlertsFilters />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={toolbarClasses}>
        {linkText && linkTo && (
          <div className={styles.toolbar__link}>
            <LinkButton to={linkTo}>{text}</LinkButton>
          </div>
        )}
        <div className={styles.toolbar__filter}>
          <Tooltip followCursor={true} placement='bottom' title={t('filters')}>
            <FilterIcon onClick={handleFilter} />
          </Tooltip>
        </div>
      </div>
      {filterVisible && renderFilter()}
    </div>
  );
};

export default TableToolbar;
