import { HeadCell, TableHeaderRow } from 'types';

const alertsAccountAnalyticsTable: TableHeaderRow[] = [
  {
    id: 'id',
    value: 'id',
    label: 'ID',
  },
  {
    id: 'type',
    value: 'type',
    label: 'Alerts Trigger',
  },
  {
    id: 'message',
    value: 'message',
    label: 'Message',
  },
  {
    id: 'createdAt',
    value: 'createdAt',
    label: 'Alert Time',
  },
];

const alertsMainTable: HeadCell[] = [
  {
    id: 'id',
    value: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    value: 'name',
    label: 'Name',
  },
  {
    id: 'type',
    value: 'type',
    label: 'Alerts Trigger',
  },
  {
    id: 'message',
    value: 'message',
    label: 'Message',
  },
  {
    id: 'createdAt',
    value: 'createdAt',
    label: 'Alert Time',
  },
];

const alertsTable = {
  mainTable: alertsMainTable,
  accountAnalyticsTable: alertsAccountAnalyticsTable,
};

export default alertsTable;
