import { SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from 'hooks';
import { authActions } from 'store/authSlice';
import { AddAccountForm } from 'components';
import { AddAccountFormShape } from 'components/views/AddAccountForm/types';

import styles from './AddNewAccount.module.scss';

const AddNewAccount: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit: SubmitHandler<AddAccountFormShape> = async (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(values), 'values');
    const body = {
      ...values,
      deviceToken: uuidv4(),
    } as any;

    dispatch(authActions.addNewUser(body));
  };
  return (
    <div className={styles.container}>
      <AddAccountForm onclick={handleSubmit} />
    </div>
  );
};

export default AddNewAccount;
