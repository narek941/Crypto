import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Routes } from 'types';
import { parseBody } from 'utils';
import { useAppDispatch } from 'hooks';
import { AddAccountForm } from 'components';
import { adminActions } from 'store/adminSlice';
import { accountsActions } from 'store/accountsSlice';
import { AddAccountFormShape } from 'components/views/AddAccountForm/types';

import styles from './AddNewAccount.module.scss';

const AddNewAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: accountId } = useParams();

  const id = Number(accountId);

  const handleSubmit: SubmitHandler<AddAccountFormShape> = async (values) => {
    const body = parseBody.parseAccountBody(values);

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
