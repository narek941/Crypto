import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Routes } from 'types';
import { Loader, Table } from 'components';
import { useAppDispatch } from 'hooks';
import { accountsTable } from 'constants/index';
import { accountsActions } from 'store/accountsSlice';
import { accountsSelectors } from 'store/accountsSlice';
import { ActionType } from 'components/views/Table/TableToolbar/types';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, filter } = useSelector(accountsSelectors.selectAccountAccountsList);
  const { take, order, sort } = filter;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        await dispatch(accountsActions.getAccountList(filter)).unwrap();
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };

    getAccounts();
  }, [dispatch, filter, filter.filter]);

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
