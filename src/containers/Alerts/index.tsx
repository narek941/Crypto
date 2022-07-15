import React from 'react';

import { Table } from 'components';
import { headCells, rows } from 'utils/alerts';

const Alerts: React.FC = () => {
  return <Table rows={rows} headCells={headCells} type='primary' />;
};

export default Alerts;
