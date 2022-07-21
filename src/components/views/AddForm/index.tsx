/* eslint-disable no-console */
import { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useForm } from 'hooks';
import { Button, Input, Select } from 'components';
import FormWrapper from 'components/forms/FormWrapper';
import FormGroup from 'components/forms/FormGroup';
import { RootState, Routes } from 'types';

import { AddFormShape, IAddUser } from './types';
import { AccountTypeOptions, addFormFields, addSchemaKeys } from './fields';
import styles from './AddForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const AddForm = ({ onClick, isEditable = false }: IAddUser) => {
  const { username, email, role } = useSelector((state: RootState) => state.admin.userById);
  const adminErrors = useSelector((state: RootState) => state.admin.error);

  const addFormDefaultValues = useMemo(
    () =>
      isEditable
        ? {
            name: username,
            email: email,
            accountType: AccountTypeOptions.find((option) => option.value === role)?.value,
          }
        : {},
    [email, isEditable, role, username],
  );
  const { formMethods, handleSubmit, isValid } = useForm<keyof AddFormShape, AddFormShape>({
    schemaKeys: addSchemaKeys,
    defaultValues: addFormDefaultValues,
  });

  useEffect(() => {
    if (isEditable) {
      formMethods.reset(addFormDefaultValues);
    }
  }, [addFormDefaultValues, formMethods, isEditable]);

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onClick)}>
        <FormGroup className={styles.signIn__form__group}>
          <>
            <div className={styles.signIn__form__group__header}>
              {isEditable ? 'Edit user' : 'Add new user'}
            </div>

            <Input
              error={formMethods.formState.errors.name?.message || adminErrors?.username}
              {...addFormFields.name}
              {...formMethods.register('name')}
            />

            <Input
              error={formMethods.formState.errors.email?.message || adminErrors?.email}
              {...addFormFields.email}
              {...formMethods.register('email')}
            />
            <Input
              error={
                formMethods.formState.errors.emptyPassword?.message ||
                formMethods.formState.errors.password?.message ||
                adminErrors?.password
              }
              {...(isEditable ? addFormFields.emptyPassword : addFormFields.password)}
              {...formMethods.register(isEditable ? 'emptyPassword' : 'password')}
              haveRightIcon={true}
            />
            <Controller
              control={formMethods.control}
              name={addFormFields.accountType.name as keyof AddFormShape}
              render={({ field }) => <Select {...addFormFields.accountType} {...field} />}
            />

            {!isEditable ? (
              <div className={styles.signIn__form__group__button}>
                <Button type='submit' color='secondary' size='m' disabled={!isValid}>
                  ADD USER
                </Button>
              </div>
            ) : (
              <div className={styles.signIn__form__group__edit}>
                <Link to={Routes.Users} className={styles.signIn__form__group__edit__cancel}>
                  CANCEL
                </Link>
                <Button
                  type='submit'
                  color='secondary'
                  size='m'
                  disabled={!isValid}
                  className={styles.signIn__form__group__edit__save}
                >
                  SAVE CHANGES
                </Button>
              </div>
            )}
          </>
        </FormGroup>
      </FormWrapper>
    </>
  );
};

export default AddForm;
