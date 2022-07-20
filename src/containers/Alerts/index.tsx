import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'components';
import { headCells } from 'utils/alerts';
import { useAppDispatch } from 'hooks';
import { alertsActions } from 'store/alertsSlice';
import { RootState } from 'types';

const Alerts = () => {
  const { list, filter, totalCount } = useSelector((state: RootState) => state.alerts);
  const { skip, take, sort, order, search } = filter;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(alertsActions.getAlertList({ skip: 0, take: 10, sort: 'id', order: 'ASC' }));
  }, [skip, take, sort, order, search, dispatch]);

  return (
    <Table
      rows={list || []}
      headCells={headCells}
      type='primary'
      action='alerts'
      skip={skip}
      take={take}
      sort={sort}
      order={order}
      search={search}
      totalCount={totalCount}
    />
  );
};

export default Alerts;
