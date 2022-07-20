import { SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import AddForm from 'components/views/AddForm';
import { AddFormShape } from 'components/views/AddForm/types';
import { useAppDispatch } from 'hooks';
import { usersActions } from 'store/usersSlice';

import styles from './AddNewUser.module.scss';

const AddNewUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit: SubmitHandler<AddFormShape> = async (values) => {
    // eslint-disable-next-line no-console
    console.log(values, 'values');
    const body = {
      ...values,
      navigate,
      deviceToken: uuidv4(),
    } as any;

    dispatch(usersActions.addNewUser(body));
  };

  return (
    <div className={styles.container}>
      <AddForm onclick={handleSubmit} />
    </div>
  );
};

export default AddNewUser;
