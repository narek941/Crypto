import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'components';
import { useAppDispatch } from 'hooks';
import { headCells } from 'utils/table';
import { RootState, Routes } from 'types';
import { accountsActions } from 'store/accountsSlice';

const Accounts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, accountsFilter } = useSelector((state: RootState) => state.accounts);

  const { take, order } = accountsFilter;

  useEffect(() => {
    dispatch(accountsActions.getAccountList(accountsFilter));
  }, [dispatch, accountsFilter]);

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
