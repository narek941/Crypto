import React, { useEffect } from 'react';

import { rows, headCells } from 'utils/table';
import { Routes } from 'types';
import { useAppDispatch } from 'hooks';
import { accountsActions } from 'store/accountsSlice';
import { Table } from 'components';

const Accounts: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(accountsActions.getAccountList({ skip: 0, take: 10, sort: 'id', order: 'ASC' }));
  });
  return (
    <Table
      rows={rows}
      action={true}
      type='primary'
      linkText='account'
      headCells={headCells}
      linkTo={Routes.Default}
    />
  );
};

export default Accounts;
