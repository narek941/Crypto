import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks';
import { AddAccountForm } from 'components';
import { AddAccountFormShape } from 'components/views/AddAccountForm/types';
import { adminActions } from 'store/adminSlice';
import { parseAddAccount } from 'utils/common';
import { accountsActions } from 'store/accountsSlice';
import { Routes } from 'types';

import styles from './AddNewAccount.module.scss';

const AddNewAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id: accountId } = useParams();
  const navigate = useNavigate();
  const id = Number(accountId);

  const handleSubmit: SubmitHandler<AddAccountFormShape> = async (values) => {
    const body = parseAddAccount(values);

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
    dispatch(accountsActions.getCoins());

    if (id) {
      dispatch(accountsActions.getAccountById(id));

      return () => {
        dispatch(accountsActions.removeAccountById());
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <AddAccountForm onClick={handleSubmit} isEditable={!!id} />
    </div>
  );
};

export default AddNewAccount;
