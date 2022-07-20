import { SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'hooks';
import { AddAccountForm } from 'components';
import { AddAccountFormShape } from 'components/views/AddAccountForm/types';
import { adminActions } from 'store/adminSlice';
import { parseAddAccount } from 'utils/common';

import styles from './AddNewAccount.module.scss';

const AddNewAccount: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<AddAccountFormShape> = async (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    // eslint-disable-next-line no-console
    const body = parseAddAccount(values);
    dispatch(adminActions.addNewAccount(body));
  };
  return (
    <div className={styles.container}>
      <AddAccountForm onclick={handleSubmit} />
    </div>
  );
};

export default AddNewAccount;
