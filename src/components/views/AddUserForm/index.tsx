import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';

import { useForm } from 'hooks';
import { RootState, Routes } from 'types';
import { Button, Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';
import FormWrapper from 'components/forms/FormWrapper';
import { AccountTypeOptions } from 'utils/filterHelper';
import MultipleSelect from 'components/shared/MultipleSelect';

import styles from './AddUserForm.module.scss';
import { AddUserFormShape, IAddUser } from './types';
import { addUserFormFields, addSchemaKeys } from './fields';

const AddUserForm = ({ onClick, isEditable = false }: IAddUser) => {
  const { username, email, role } = useSelector((state: RootState) => state.admin.userById);
  const userErrors = useSelector((state: RootState) => state.users.error);

  const addUserFormDefaultValues = useMemo(
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
  const { formMethods, handleSubmit, isValid } = useForm<keyof AddUserFormShape, AddUserFormShape>({
    schemaKeys: addSchemaKeys,
    defaultValues: addUserFormDefaultValues,
  });

  useEffect(() => {
    if (isEditable) {
      formMethods.reset(addUserFormDefaultValues);
    }
  }, [addUserFormDefaultValues, formMethods, isEditable]);

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onClick)}>
        <FormGroup className={styles.signIn__form__group}>
          <>
            <div className={styles.signIn__form__group__header}>
              {isEditable ? 'Edit user' : 'Add new user'}
            </div>

            <Input
              error={formMethods.formState.errors.name?.message || userErrors?.name}
              {...addUserFormFields.name}
              {...formMethods.register('name')}
            />

            <Input
              error={formMethods.formState.errors.email?.message || userErrors?.email}
              {...addUserFormFields.email}
              {...formMethods.register('email')}
            />
            <Input
              error={
                formMethods.formState.errors.emptyPassword?.message ||
                formMethods.formState.errors.password?.message
              }
              {...(isEditable ? addUserFormFields.emptyPassword : addUserFormFields.password)}
              {...formMethods.register(isEditable ? 'emptyPassword' : 'password')}
              haveRightIcon={true}
            />
            <Input
              error={
                formMethods.formState.errors.emptyPassword?.message ||
                formMethods.formState.errors.confirmPassword?.message
              }
              {...(isEditable
                ? addUserFormFields.emptyPassword
                : addUserFormFields.confirmPassword)}
              {...formMethods.register(isEditable ? 'emptyPassword' : 'confirmPassword')}
              haveRightIcon={true}
            />
            <Controller
              control={formMethods.control}
              name={addUserFormFields.usersAccountType.name as keyof AddUserFormShape}
              render={({ field }) => (
                <Select
                  {...addUserFormFields.usersAccountType}
                  {...field}
                  withAction={false}
                  multiple={true}
                />
              )}
            />
            <Controller
              control={formMethods.control}
              name={addUserFormFields.usersAccountList.name as keyof AddUserFormShape}
              render={({ field }) => (
                <MultipleSelect {...addUserFormFields.usersAccountList} {...field} />
              )}
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

export default AddUserForm;
