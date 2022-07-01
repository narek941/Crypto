import { TablePagination } from '@mui/material';
import React from 'react';
import classNames from 'classnames';

import styles from './Pagination.module.scss';
import { IPaginationProps } from './types';
import TablePaginationActions from './PaginationAction';

const Pagination = ({
  handleChangePage,
  handleChangeRowsPerPage,
  currentPage,
  rowsPerPage,
  totalCount,
  rowsPerPageOptions = [10, 20, 100],
  className,
}: IPaginationProps): JSX.Element => {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component='div'
      className={classNames(className, styles.wrapper)}
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={currentPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage={<span>Row size:</span>}
      ActionsComponent={TablePaginationActions}
      showFirstButton={true}
      showLastButton={true}
    />
  );
};

export default Pagination;
