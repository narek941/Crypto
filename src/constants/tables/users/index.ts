import { HeadCell } from 'types';
const usersTable: HeadCell[] = [
  {
    id: 'id',
    value: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    value: 'username',
    label: 'Name',
  },
  {
    id: 'email',
    value: 'email',
    label: 'Email',
  },
  {
    id: 'accountType',
    value: 'role',
    label: 'Account Type',
  },
  {
    id: 'status',
    value: 'status',
    label: 'Status',
  },
  {
    id: 'actions',
    label: 'Actions',
  },
];

export default usersTable;
