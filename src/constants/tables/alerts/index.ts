import { HeadCell, TableHeaderRow } from 'types';

const alertsAccountAnalyticsTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'ID',
  },
  {
    id: 2,
    value: 'Message',
  },
  {
    id: 3,
    value: 'Alert Time',
  },
  {
    id: 4,
    value: 'Alerts trigger',
  },
];

const alertsMainTable: HeadCell[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'message',
    label: 'Message',
  },
  {
    id: 'alertTime',
    label: 'Alert Time',
  },
  {
    id: 'alertTigger',
    label: 'Alerts trigger',
  },
];

const alertsTable = {
  mainTable: alertsMainTable,
  accountAnalyticsTable: alertsAccountAnalyticsTable,
};

export default alertsTable;
