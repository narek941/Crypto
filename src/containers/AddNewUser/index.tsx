import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'hooks';
import { AppDispatch, RootState, Routes } from 'types';
import AddForm from 'components/views/AddForm';
import { adminActions } from 'store/adminSlice';
import { usersActions } from 'store/usersSlice';
import { AddFormShape } from 'components/views/AddForm/types';

import styles from './AddNewUser.module.scss';

const AddNewUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch() as AppDispatch;
  const { id: userId } = useParams();
  const id = Number(userId);
  const { username, role, email, password } = useSelector(
    (state: RootState) => state.admin.userById,
  );

  const handleSubmit: SubmitHandler<AddFormShape> = async (values) => {
    const body = {
      ...values,
      deviceToken: uuidv4(),
    } as any;

    if (!id) {
      await dispatch(usersActions.addNewUser(body)).unwrap();
    } else {
      const userUpdatedFieldsPromises = [];

      if (!isEqual(values.name, username)) {
        userUpdatedFieldsPromises.push(
          dispatch(adminActions.updateUsername({ userID: id, username: values.name })).unwrap(),
        );
      }
      if (!isEqual(values.email, email)) {
        userUpdatedFieldsPromises.push(
          dispatch(adminActions.updateUserEmail({ userID: id, email: values.email })).unwrap(),
        );
      }
      if (!isEqual(values.accountType, role)) {
        userUpdatedFieldsPromises.push(
          dispatch(adminActions.updateUserRole({ userID: id, role: values.accountType })).unwrap(),
        );
      }
      if (values.password && !isEqual(values.password, password)) {
        userUpdatedFieldsPromises.push(
          dispatch(
            adminActions.updateUserPassword({ userID: id, password: values.password }),
          ).unwrap(),
        );
      }

      await Promise.all(userUpdatedFieldsPromises);
    }

    navigate(Routes.Users);
  };

  useEffect(() => {
    if (id) {
      dispatch(adminActions.getUserById(id));

      return () => {
        dispatch(adminActions.removeUserById());
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <AddForm onClick={handleSubmit} isEditable={!!id} />
    </div>
  );
};

export default AddNewUser;
