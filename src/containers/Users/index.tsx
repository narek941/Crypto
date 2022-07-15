import React from 'react';

import { Table } from 'components';
import { Routes } from 'types/routes';
import { headCells, rows } from 'utils/table_users';

const Users: React.FC = () => {
  return (
    <Table
      rows={rows}
      headCells={headCells}
      type='secondary'
      linkText='user'
      linkTo={Routes.AddNewUser}
    />
  );
};

export default Users;
