import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Routes } from 'types';
import { Table } from 'components';
import { useAppDispatch } from 'hooks';
import { accountsTable } from 'constants/index';
import { accountsActions } from 'store/accountsSlice';
import { accountsSelectors } from 'store/accountsSlice';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, filter } = useSelector(accountsSelectors.selectAccountAccountsList);

  const { take, order } = filter;

  useEffect(() => {
    dispatch(accountsActions.getAccountList(filter));
  }, [dispatch, filter, filter.filter]);

  return (
    <Table
      take={take}
      rows={list}
      order={order}
      type='primary'
      action='accounts'
      linkText='account'
      totalCount={totalCount}
      headCells={accountsTable}
      linkTo={Routes.AddNewAccount}
    />
  );
};

export default Accounts;
