import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'components';
import { Routes } from 'types/routes';
import { headCells } from 'utils/table_users';
import { adminActions } from 'store/adminSlice';
import { useAppDispatch } from 'hooks';
import { RootState } from 'types';

const Users = () => {
  const dispatch = useAppDispatch();

  const { list, filter, totalCount } = useSelector((state: RootState) => state.admin);
  const { skip, take, sort, order, search } = filter;
  useEffect(() => {
    dispatch(
      adminActions.getUsersList({
        skip: skip,
        take: take,
        sort: sort,
        order: order,
        search: search,
      }),
    );
  }, [skip, take, sort, order, search, dispatch]);

  // eslint-disable-next-line no-console
  console.log(list);
  return (
    <>
      <Table
        rows={list || []}
        headCells={headCells}
        type='secondary'
        linkText='user'
        linkTo={Routes.AddNewUser}
        action='users'
        skip={skip}
        take={take}
        sort={sort}
        order={order}
        search={search}
        totalCount={totalCount}
      />
    </>
  );
};

export default Users;
