import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { headCells } from 'utils/table';
import { RootState, Routes } from 'types';
import { useAppDispatch } from 'hooks';
import { accountsActions } from 'store/accountsSlice';
import { Table } from 'components';

const Accounts = () => {
  const { list, filter, totalCount } = useSelector((state: RootState) => state.accounts);
  const { skip, take, sort, order, search } = filter;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(accountsActions.getAccountList({ skip: 0, take: 10, sort: 'id', order: 'ASC' }));
  }, [dispatch, skip, take, sort, order, search]);

  return (
    <Table
      rows={list || []}
      action='accounts'
      type='primary'
      linkText='account'
      headCells={headCells}
      linkTo={Routes.AddNewAccount}
      skip={skip}
      take={take}
      sort={sort}
      order={order}
      search={search}
      totalCount={totalCount}
    />
  );
};

export default Accounts;
