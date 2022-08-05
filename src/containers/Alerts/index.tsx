import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'types';
import { Table } from 'components';
import { useAppDispatch } from 'hooks';
import { alertsTable } from 'constants/index';
import { alertsActions } from 'store/alertsSlice';

const Alerts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, filter } = useSelector((state: RootState) => state.alerts);

  const { take, order } = filter;

  useEffect(() => {
    dispatch(alertsActions.getAlertList(filter));
  }, [dispatch, filter, filter.filter]);

  return (
    <Table
      take={take}
      rows={list}
      order={order}
      type='primary'
      action='alerts'
      totalCount={totalCount}
      headCells={alertsTable.mainTable}
    />
  );
};

export default Alerts;
