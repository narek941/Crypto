import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Routes } from 'types';
import { useForm } from 'hooks';
import { adminSelectors } from 'store/adminSlice';
import { Button, Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';
import FormWrapper from 'components/forms/FormWrapper';
import { AccountTypeOptions } from 'utils/filterHelper';

import styles from './AddUserForm.module.scss';
import { AddUserFormShape, IAddUser } from './types';
import { addUserFormFields, addSchemaKeys } from './fields';

const AddUserForm = ({ onClick, isEditable = false }: IAddUser) => {
  const { t } = useTranslation();
  const adminErrors = useSelector(adminSelectors.selectAdminError);
  const { username, email, role } = useSelector(adminSelectors.selectUserById);

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
            <p className={styles.signIn__form__group__header}>
              {isEditable ? t('edit_user') : t('add_user')}
            </p>

            <Input
              error={formMethods.formState.errors.name?.message || adminErrors?.username}
              {...addUserFormFields.name}
              {...formMethods.register('name')}
            />

            <Input
              error={formMethods.formState.errors.email?.message || adminErrors?.email}
              {...addUserFormFields.email}
              {...formMethods.register('email')}
            />
            <Input
              error={
                formMethods.formState.errors.emptyPassword?.message ||
                formMethods.formState.errors.password?.message ||
                adminErrors?.password
              }
              {...(isEditable ? addUserFormFields.emptyPassword : addUserFormFields.password)}
              {...formMethods.register(isEditable ? 'emptyPassword' : 'password')}
              haveRightIcon={true}
            />
            <Controller
              control={formMethods.control}
              name={addUserFormFields.accountType.name as keyof AddUserFormShape}
              render={({ field }) => <Select {...addUserFormFields.accountType} {...field} />}
            />

            {!isEditable ? (
              <div className={styles.signIn__form__group__button}>
                <Button type='submit' color='secondary' size='m' disabled={!isValid}>
                  {t('add_user')}
                </Button>
              </div>
            ) : (
              <div className={styles.signIn__form__group__edit}>
                <Link to={Routes.Users} className={styles.signIn__form__group__edit__cancel}>
                  {t('cancel')}
                </Link>
                <Button
                  type='submit'
                  color='secondary'
                  size='m'
                  disabled={!isValid}
                  className={styles.signIn__form__group__edit__save}
                >
                  {t('save_changes')}
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
