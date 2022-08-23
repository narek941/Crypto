import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { MouseEvent } from 'react';

import { ParamsWithId } from 'types';
import { useAppDispatch } from 'hooks';
import { wrapWithBaseCurrency } from 'utils';
import { tradesTable } from 'constants/index';
import { EmptyData, Pagination, ScrollWrapper } from 'components';
import { accountsActions } from 'store/accountsSlice';
import { accountsSelectors } from 'store/accountsSlice';
import TradesFilters from 'components/views/filters/TradesFilters';
import { accountsTradesFilterUpdate } from 'store/accountsSlice/thunks';
import { VectorIcon } from 'assets/icons';

import TradesTableRow from './TradesTableRow';
import styles from './TradesTable.module.scss';

const TradesTable = ({ filterVisible }: any) => {
  const accountById = useSelector(accountsSelectors.selectAccountById);
  const { filter, list, totalCount } = useSelector(accountsSelectors.selectAccountAccountsTrades);
  const { id } = useParams<ParamsWithId>();

  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(accountsTradesFilterUpdate({ skip: Number(newPage) * filter.take }));

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (totalCount) {
      dispatch(accountsTradesFilterUpdate({ take: parseInt(event.target.value), skip: 0 }));
    }
  };

  const orderSort = (elem: any): 'DESC' | 'ASC' => (elem.order === 'DESC' ? 'ASC' : 'DESC');

  const handleRequestSort = (_event: MouseEvent<unknown>, sort: any): void => {
    let newOrder = 'DESC';
    if (sort === filter.sort) {
      newOrder = orderSort(filter);
    } else {
      newOrder = 'DESC';
    }
    dispatch(accountsTradesFilterUpdate({ sort, order: newOrder as 'DESC' | 'ASC' }));
  };
  useEffect(() => {
    if (id) {
      dispatch(accountsActions.getAccountTradesList({ ...filter, id }));
    }
  }, [id, filter, dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        {filterVisible && <TradesFilters />}
        <ScrollWrapper>
          <Table className={styles.inner}>
            <TableHead className={styles.container__header}>
              <TableRow className={styles.container__header__row}>
                {tradesTable.map(({ id, label, withBaseCurrency, value }) => (
                  <TableCell align='left' className={styles.container__header__ceil} key={id}>
                    <div
                      role='button'
                      onClick={(e) => handleRequestSort(e, value)}
                      className={styles.container__header__ceil__sort}
                    >
                      <span style={{ position: 'relative' }}>
                        {!withBaseCurrency
                          ? label
                          : wrapWithBaseCurrency(label, accountById?.baseCurrency?.name)}
                        {value === filter.sort && (
                          <span title='Sort' className={styles.container__header__ceil__sort__up}>
                            <VectorIcon
                              className={classNames({
                                [styles.container__header__ceil__sort__up_icon]:
                                  filter.order === 'ASC',
                              })}
                            />
                          </span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TradesTableRow row={row} key={row.id} />
              ))}
            </TableBody>
          </Table>
          {!totalCount && <EmptyData />}
        </ScrollWrapper>
      </div>

      <Pagination
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        currentPage={page}
        rowsPerPage={filter?.take}
        totalCount={totalCount}
      />
    </>
  );
};
export default TradesTable;
