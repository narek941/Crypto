import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Routes } from 'types';
import { parseBody } from 'utils';
import { useAppDispatch, useAppSelector } from 'hooks';
import { AddAccountForm } from 'components';
import { adminActions, adminSelectors } from 'store/adminSlice';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { AddAccountFormShape } from 'components/views/AddAccountForm/types';

import styles from './AddNewAccount.module.scss';

const AddNewAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: accountId } = useParams();
  const id = Number(accountId);
  const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const { totalCount } = useAppSelector(adminSelectors.selectExchange);

  const walletId = useSelector(accountsSelectors.selectAccountByIdPlatform);

  const handleSubmit: SubmitHandler<AddAccountFormShape> = async (values) => {
    const body = parseBody.parseAccountBody(values, tradingPairs);
    if (!id) {
      await dispatch(adminActions.addNewAccount(body)).unwrap();
    } else {
      await dispatch(
        adminActions.updateAccount({ accountId: id, credentials: { ...body, id } }),
      ).unwrap();
    }

    navigate(Routes.Accounts);
  };

  useEffect(() => {
    dispatch(adminActions.getCoins());
    dispatch(adminActions.getTradingPairs(walletId));
    !totalCount && dispatch(adminActions.getExchangeList());
    if (id) {
      dispatch(accountsActions.getAccountById(id));

      return () => {
        dispatch(accountsActions.removeAccountById());
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (role && role !== RoleType.ADMIN) {
  //   return <Navigate to={Routes.Accounts} replace />;
  // }

  return (
    <div className={styles.container}>
      <AddAccountForm onClick={handleSubmit} isEditable={!!id} />
    </div>
  );
};

export default AddNewAccount;
