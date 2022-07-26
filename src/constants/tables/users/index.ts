import { HeadCell } from 'types';

const usersTable: HeadCell[] = [
  {
    id: 'id',
    isSort: true,
    label: 'ID',
  },
  {
    id: 'name',
    isSort: false,
    label: 'Name',
  },
  {
    id: 'email',
    isSort: false,
    label: 'Email',
  },
  {
    id: 'accountType',
    isSort: false,
    label: 'Account Type',
  },
  {
    id: 'status',
    isSort: false,
    label: 'Status',
  },
  {
    id: 'actions',
    isSort: false,
    label: 'Actions',
  },
];

export default usersTable;
