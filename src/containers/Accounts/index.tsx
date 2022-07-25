import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'components';
import { useAppDispatch } from 'hooks';
import { headCells } from 'utils/table';
import { RootState, Routes } from 'types';
import { accountsActions } from 'store/accountsSlice';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, filter } = useSelector(
    (state: RootState) => state.accounts.accountsList,
  );

  const { take, order } = filter;

  useEffect(() => {
    dispatch(accountsActions.getAccountList(filter));
  }, [dispatch, filter]);

  return (
    <Table
      take={take}
      order={order}
      type='primary'
      action='accounts'
      rows={list || []}
      linkText='account'
      headCells={headCells}
      totalCount={totalCount}
      linkTo={Routes.AddNewAccount}
    />
  );
};

export default Accounts;
