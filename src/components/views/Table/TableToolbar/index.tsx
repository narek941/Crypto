import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import { AddAccountIcon, FilterIcon } from 'assets/icons';
import { LinkButton, Tab } from 'components';
import AccountsFilters from 'components/views/filters/AccountsFilters';
import UsersFilters from 'components/views/filters/UsersFilters';
import AlertsFilters from 'components/views/filters/AlertsFilters';
import { RoleType } from 'types/api';
import { authSelectors } from 'store/authSlice';
import { AccountTabType } from 'components/views/AnalyticsTabs/types';
import accountsTab from 'constants/tabs/accounts';

import styles from './TableToolbar.module.scss';
import { ITableToolbarProps } from './types';

const TableToolbar = ({ linkText, linkTo, action }: ITableToolbarProps): JSX.Element => {
  const { t } = useTranslation();
  const [filterVisible, setFilterVisible] = useState(false);
  const text = `+ ADD NEW ${linkText}`;
  const role = useSelector(authSelectors.selectRole);

  const toolbarClasses = classNames(styles.toolbar, {
    [styles.toolbar_noLink]: !linkTo,
  });
  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper__account]: (action = 'accounts'),
  });
  const handleFilter = () => setFilterVisible(!filterVisible);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTabUpdateChange = (id: string) => {
    setSearchParams({ tab: id });
  };

  useEffect(() => {
    setFilterVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('tab')]);

  const renderFilter = () => {
    if (action === 'accounts') {
      return <AccountsFilters />;
    } else if (action === 'users') {
      return <UsersFilters />;
    } else {
      return <AlertsFilters />;
    }
  };

  return (
    <div className={wrapperClasses}>
      <div className={toolbarClasses}>
        {action !== 'accounts' ? (
          <>
            {action && linkTo && (
              <div className={styles.toolbar__link}>
                {role === RoleType.ADMIN && <LinkButton to={linkTo}>{text}</LinkButton>}
              </div>
            )}
          </>
        ) : (
          <div className={styles.tabs__wrapper}>
            <div className={styles.tabs}>
              {accountsTab.map(({ id, name, Icon }) => (
                <Tab
                  selectedTab={searchParams.get('tab') || AccountTabType.spot}
                  handleChange={handleTabUpdateChange}
                  id={id}
                  name={name}
                  key={id}
                  Icon={Icon}
                />
              ))}
            </div>
          </div>
        )}
        <div className={styles.toolbar__filter}>
          {role === RoleType.ADMIN && linkTo && action === 'accounts' && (
            <Link to={linkTo}>
              <AddAccountIcon />
            </Link>
          )}

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
