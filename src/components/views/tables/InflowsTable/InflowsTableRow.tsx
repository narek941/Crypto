import moment from 'moment';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

import { BinIcon, EditIcon } from 'assets/icons';
import { authSelectors } from 'store/authSlice';
import { RoleType } from 'types/api';

import styles from './InflowsTable.module.scss';

const InflowsTableRow = ({ row, toggleAlertOpen, setID, handleAddInflow }: any) => {
  const authRole = useSelector(authSelectors.selectRole);
  return (
    <TableRow className={styles.container__body__row}>
      <TableCell align='left' className={styles.ceil}>
        {row?.id}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {row?.type === 'DEPOSIT' ? 'Inflow' : 'Outflow'}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {row?.coin?.name}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {Number(row?.amount)?.toFixed(8) || 0}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {Number(row.amountInBaseCurrency)?.toFixed(8) || 0}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {Number(row?.transactionFee)?.toFixed(8) || 0}
      </TableCell>
      <TableCell align='left' className={styles.ceil}>
        {moment(row?.type === 'DEPOSIT' ? row.createdAt : row?.createdAt).format(
          'DD.MM.YYYY HH:mm:ss',
        )}
      </TableCell>
      {row.isManual && (
        <TableCell align='left' className={(styles.ceil, styles.ceil__last)}>
          <div className={styles.ceil__actions}>
            {authRole && authRole !== RoleType.VIEWER && (
              <>
                <div className={styles.ceil__actions__setting}>
                  <Tooltip followCursor={true} placement='bottom' title={'Edit'}>
                    <EditIcon
                      onClick={(e) => {
                        handleAddInflow(e, row.id);
                      }}
                    />
                  </Tooltip>
                </div>
                <div className={styles.ceil__actions__bin}>
                  <Tooltip followCursor={true} placement='bottom' title={'Delete'}>
                    <BinIcon
                      onClick={() => {
                        setID(row.id);
                        toggleAlertOpen && toggleAlertOpen();
                      }}
                    />
                  </Tooltip>
                </div>
              </>
            )}
            <Tooltip followCursor={true} placement='bottom' title={'Manual'}>
              <div className={styles.ceil__actions__dots} />
            </Tooltip>
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};

export default InflowsTableRow;
