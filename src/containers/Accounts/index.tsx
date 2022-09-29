import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Routes } from 'types';
import { Loader, Table } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';
import { accountsTable } from 'constants/index';
import { accountsActions } from 'store/accountsSlice';
import { accountsSelectors } from 'store/accountsSlice';
import { ActionType } from 'components/views/Table/TableToolbar/types';
import { adminActions, adminSelectors } from 'store/adminSlice';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, filter } = useSelector(accountsSelectors.selectAccountAccountsList);
  const currentPlatform = useSelector(accountsSelectors.selectAccountByIdPlatform);
  const exchangeTotalCount = useAppSelector(adminSelectors.selectExchange)?.totalCount;

  const { take, order, sort } = filter;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    !exchangeTotalCount && dispatch(adminActions.getExchangeList());
  }, [dispatch, exchangeTotalCount]);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        // setIsLoading(true);
        await dispatch(accountsActions.getAccountList(filter));
      } catch {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    getAccounts();
  }, [dispatch, filter, filter.filter, currentPlatform]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table
      take={take}
      rows={list}
      sort={sort}
      order={order}
      type='primary'
      action={ActionType.ACCOUNTS}
      linkText='account'
      totalCount={totalCount}
      headCells={accountsTable}
      linkTo={Routes.AddNewAccount}
    />
  );
};

export default Accounts;
