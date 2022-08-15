import { HeadCell, TableHeaderRow } from 'types';

const alertsAccountAnalyticsTable: TableHeaderRow[] = [
  {
    id: 1,
    value: 'ID',
  },
  {
    id: 2,
    value: 'Alerts trigger',
  },
  {
    id: 3,
    value: 'Message',
  },
  {
    id: 4,
    value: 'Alert Time',
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
    id: 'alertTrigger',
    label: 'Alerts trigger',
  },
  {
    id: 'message',
    label: 'Message',
  },
  {
    id: 'alertTime',
    label: 'Alert Time',
  },
];

const alertsTable = {
  mainTable: alertsMainTable,
  accountAnalyticsTable: alertsAccountAnalyticsTable,
};

export default alertsTable;
