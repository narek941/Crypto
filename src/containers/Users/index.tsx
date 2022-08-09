import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'components';
import { Routes } from 'types/routes';
import { useAppDispatch } from 'hooks';
import { usersTable } from 'constants/index';
import { adminActions, adminSelectors } from 'store/adminSlice';

const Users = () => {
  const dispatch = useAppDispatch();
  const { list, usersFilter, totalCount } = useSelector(adminSelectors.selectAdmin);

  const { take, order } = usersFilter;

  useEffect(() => {
    dispatch(adminActions.getUsersList(usersFilter));
  }, [dispatch, usersFilter]);

  return (
    <Table
      take={take}
      rows={list}
      order={order}
      action='users'
      linkText='user'
      type='secondary'
      headCells={usersTable}
      totalCount={totalCount}
      linkTo={Routes.AddNewUser}
    />
  );
};

export default Users;
