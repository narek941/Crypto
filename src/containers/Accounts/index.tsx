import React from 'react';

import Table from 'components/views/Table';
import { rows, headCells } from 'utils/table';
import { Routes } from 'types';

const Accounts: React.FC = () => {
  return (
    <Table
      rows={rows}
      action={true}
      type='primary'
      linkText='account'
      headCells={headCells}
      linkTo={Routes.Default}
    />
  );
};

export default Accounts;
