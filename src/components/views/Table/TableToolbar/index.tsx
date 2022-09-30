import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AddAccountIcon, FilterIcon } from 'assets/icons';
import { AccessWrapper, Alert, LinkButton, Tab } from 'components';
import AccountsFilters from 'components/views/filters/AccountsFilters';
import UsersFilters from 'components/views/filters/UsersFilters';
import AlertsFilters from 'components/views/filters/AlertsFilters';
import accountsTab from 'constants/tabs/accounts';
import { accountsActions } from 'store/accountsSlice';
import { useAppDispatch } from 'hooks';
import { adminActions } from 'store/adminSlice';

import styles from './TableToolbar.module.scss';
import { AccountTabType, ActionType, ITableToolbarProps } from './types';

const TableToolbar = ({ linkText, linkTo, action }: ITableToolbarProps): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filterVisible, setFilterVisible] = useState(false);
  const text = `+ ADD NEW ${linkText}`;
  const dispatch = useAppDispatch();
  const toolbarClasses = classNames(styles.toolbar, {
    [styles.toolbar_noLink]: !linkTo,
  });
  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapper__account]: action === ActionType.ACCOUNTS,
  });
  const handleFilter = () => setFilterVisible(!filterVisible);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleCloseAlert = () => setIsSyncing(false);

  const handleCreateAccount = async (to: any) => {
    const { isSynced } = await dispatch(adminActions.getSyncStatus()).unwrap();

    if (!isSynced) {
      navigate(to);
    } else {
      setIsSyncing(true);
    }
  };

  const handleTabUpdateChange = (id: string) => {
    setSearchParams({ tab: id });
  };

  useEffect(() => {
    setFilterVisible(false);
    const platformId =
      accountsTab?.find((item: any) => searchParams?.get('tab') == item?.id)?.platformId || 1;
    dispatch(accountsActions.platformUpdate({ platform: platformId }));
  }, [searchParams.get('tab')]);

  const renderFilter = () => {
    if (action === ActionType.ACCOUNTS) {
      return <AccountsFilters />;
    } else if (action === ActionType.USERS) {
      return <UsersFilters />;
    } else {
      return <AlertsFilters />;
    }
  };

  const renderTab = () => {
    if (action === ActionType.ACCOUNTS) {
      return (
        <div className={styles.tabs__wrapper}>
          <div className={styles.tabs}>
            {accountsTab.map(({ id, name, Icon }) => (
              <Tab
                selectedTab={searchParams.get('tab') || AccountTabType.BINANCE}
                handleChange={handleTabUpdateChange}
                id={id}
                name={name}
                key={id}
                Icon={Icon}
              />
            ))}
          </div>
        </div>
      );
    } else if (action === ActionType.USERS || action === ActionType.ALERTS) {
      return (
        <>
          {action && linkTo && (
            <div className={styles.toolbar__link}>
              <AccessWrapper>
                <LinkButton to={linkTo}>{text}</LinkButton>
              </AccessWrapper>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div className={wrapperClasses}>
      <div className={toolbarClasses}>
        {renderTab()}
        <div className={styles.toolbar__filter}>
          {linkTo && action === ActionType.ACCOUNTS && (
            <AccessWrapper>
              <div role='button' onClick={() => handleCreateAccount(linkTo)}>
                <AddAccountIcon className={styles.addAccount} />
              </div>
            </AccessWrapper>
          )}

          <Tooltip followCursor={true} placement='bottom' title={t('filters')}>
            <FilterIcon onClick={handleFilter} />
          </Tooltip>
        </div>
      </div>
      {filterVisible && renderFilter()}
      <Alert
        open={isSyncing}
        handleClose={handleCloseAlert}
        type={'SYNCING_ADD'}
        isActionIsDone={true}
      />
    </div>
  );
};

export default TableToolbar;
