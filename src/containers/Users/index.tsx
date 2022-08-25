import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Loader, Table } from 'components';
import { Routes } from 'types/routes';
import { useAppDispatch } from 'hooks';
import { usersTable } from 'constants/index';
import { adminActions, adminSelectors } from 'store/adminSlice';

const Users = () => {
  const dispatch = useAppDispatch();
  const { list, usersFilter, totalCount } = useSelector(adminSelectors.selectAdmin);
  const isLoading = useSelector(adminSelectors.selectAdminLoading);

  const { take, order, sort } = usersFilter;

  useEffect(() => {
    dispatch(adminActions.getUsersList(usersFilter));
  }, [dispatch, usersFilter]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table
      take={take}
      rows={list}
      sort={sort}
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
