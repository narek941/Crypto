import { SubmitHandler } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from 'hooks';
import { AddAccountForm } from 'components';
import { AddAccountFormShape } from 'components/views/AddAccountForm/types';
import { adminActions } from 'store/adminSlice';
import { parseAddAccount } from 'utils/common';
import { accountsActions } from 'store/accountsSlice';

import styles from './AddNewAccount.module.scss';

const AddNewAccount: React.FC = () => {
  const dispatch = useAppDispatch();

  const { state }: any = useLocation();
  const { id } = state || {};

  const handleSubmit: SubmitHandler<AddAccountFormShape> = async (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    // eslint-disable-next-line no-console
    const body = parseAddAccount(values);
    dispatch(adminActions.addNewAccount(body));
  };

  if (id) {
    dispatch(accountsActions.getAccountById(id));
    // eslint-disable-next-line no-console
  }

  return (
    <div className={styles.container}>
      <AddAccountForm onclick={handleSubmit} isEditable={id && true} />
    </div>
  );
};

export default AddNewAccount;
