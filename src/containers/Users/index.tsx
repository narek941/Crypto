import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'components';
import { RootState } from 'types';
import { Routes } from 'types/routes';
import { useAppDispatch } from 'hooks';
import { headCells } from 'utils/table_users';
import { adminActions } from 'store/adminSlice';

const Users = () => {
  const dispatch = useAppDispatch();
  const { list, usersFilter, totalCount } = useSelector((state: RootState) => state.admin);

  const { take, order } = usersFilter;

  useEffect(() => {
    dispatch(adminActions.getUsersList(usersFilter));
  }, [dispatch, usersFilter]);

  return (
    <Table
      take={take}
      order={order}
      action='users'
      linkText='user'
      type='secondary'
      rows={list || []}
      headCells={headCells}
      totalCount={totalCount}
      linkTo={Routes.AddNewUser}
    />
  );
};

export default Users;
