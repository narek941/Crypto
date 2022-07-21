import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'components';
import { headCells } from 'utils/alerts';
import { useAppDispatch } from 'hooks';
import { alertsActions } from 'store/alertsSlice';
import { RootState } from 'types';

const Alerts = () => {
  const dispatch = useAppDispatch();
  const { list, filter, totalCount } = useSelector((state: RootState) => state.alerts);

  const { take, order } = filter;

  useEffect(() => {
    dispatch(alertsActions.getAlertList(filter));
  }, [dispatch, filter]);

  return (
    <Table
      take={take}
      order={order}
      type='primary'
      action='alerts'
      rows={list || []}
      headCells={headCells}
      totalCount={totalCount}
    />
  );
};

export default Alerts;
