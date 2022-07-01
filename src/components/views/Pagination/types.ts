import React from 'react';

export interface IPaginationProps {
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentPage: number;
  rowsPerPage: number;
  totalCount: number;
  rowsPerPageOptions?: number[];
  className?: string;
}
