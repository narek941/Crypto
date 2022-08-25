import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Loader, Table } from 'components';
import { useAppDispatch } from 'hooks';
import { alertsTable } from 'constants/index';
import { alertsActions, alertsSelectors } from 'store/alertsSlice';

const Alerts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, filter } = useSelector(alertsSelectors.selectAlerts);
  const isLoading = useSelector(alertsSelectors.selectAlertsLoading);

  const { take, order, sort } = filter;

  useEffect(() => {
    dispatch(alertsActions.getAlertList(filter));
  }, [dispatch, filter, filter.filter]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table
      take={take}
      rows={list}
      sort={sort}
      order={order}
      type='primary'
      action='alerts'
      totalCount={totalCount}
      headCells={alertsTable.mainTable}
    />
  );
};

export default Alerts;
