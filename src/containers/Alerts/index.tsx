import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Loader, Table } from 'components';
import { useAppDispatch } from 'hooks';
import { alertsTable } from 'constants/index';
import { alertsActions, alertsSelectors } from 'store/alertsSlice';
import { ActionType } from 'components/views/Table/TableToolbar/types';

const Alerts = () => {
  const dispatch = useAppDispatch();
  const { list, totalCount, filter } = useSelector(alertsSelectors.selectAlerts);
  const [isLoading, setIsLoading] = useState(true);

  const { take, order, sort } = filter;

  useEffect(() => {
    const getAlerts = async () => {
      try {
        await dispatch(alertsActions.getAlertList(filter)).unwrap();
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    getAlerts();
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
      action={ActionType.ALERTS}
      totalCount={totalCount}
      headCells={alertsTable.mainTable}
    />
  );
};

export default Alerts;
