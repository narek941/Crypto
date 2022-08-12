import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Routes } from 'types';
import { useAppDispatch, useForm } from 'hooks';
import { adminSelectors } from 'store/adminSlice';
import { Button, Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';
import FormWrapper from 'components/forms/FormWrapper';
import { AccountTypeOptions } from 'utils/filterHelper';
import MultipleSelect from 'components/shared/MultipleSelect';
import { usersSelectors } from 'store/usersSlice';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';

import styles from './AddUserForm.module.scss';
import { AddUserFormShape, IAddUser } from './types';
import { addUserFormFields, addSchemaKeys } from './fields';

const AddUserForm = ({ onClick, isEditable = false }: IAddUser) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userErrors = useSelector(usersSelectors.selectUsersError);
  const accountList = useSelector(accountsSelectors.selectAccountAccountsList);
  const { username, email, role } = useSelector(adminSelectors.selectUserById);

  const addUserFormDefaultValues = useMemo(
    () =>
      isEditable
        ? {
            name: username,
            email: email,
            usersAccountType: AccountTypeOptions.find((option) => option.value === role)?.value,
          }
        : {},
    [email, isEditable, role, username],
  );
  const { formMethods, handleSubmit, isValid } = useForm<keyof AddUserFormShape, AddUserFormShape>({
    schemaKeys: addSchemaKeys,
    defaultValues: addUserFormDefaultValues,
  });

  const accountWatch = formMethods.watch();
  const accountsOptions = useMemo(
    () =>
      accountList.list.map((account) => ({
        label: account.name,
        value: account.id,
      })),
    [accountList],
  );

  useEffect(() => {
    if (isEditable) {
      formMethods.reset(addUserFormDefaultValues);
    }
  }, [addUserFormDefaultValues, formMethods, isEditable]);

  useEffect(() => {
    if (!accountList?.totalCount) {
      dispatch(
        accountsActions.getAccountList({
          skip: 0,
          take: 10,
          sort: 'id',
          order: 'DESC',
          search: '',
          filter: {},
        }),
      );
    }
  }, []);

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onClick)}>
        <FormGroup className={styles.signIn__form__group}>
          <>
            <p className={styles.signIn__form__group__header}>
              {isEditable ? t('edit_user') : t('add_user')}
            </p>

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
              {...formMethods.register('confirmPassword')}
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
                  error={formMethods.formState.errors.usersAccountType?.message}
                />
              )}
            />
            {accountWatch.usersAccountType == 'VIEWER' && (
              <Controller
                control={formMethods.control}
                name={addUserFormFields.usersAccountList.name as keyof AddUserFormShape}
                render={({ field }) => (
                  <MultipleSelect
                    {...addUserFormFields.usersAccountList}
                    {...field}
                    options={accountsOptions}
                    error={formMethods.formState.errors.usersAccountList?.message}
                  />
                )}
              />
            )}

            {!isEditable ? (
              <div className={styles.signIn__form__group__button}>
                <Button type='submit' color='secondary' size='m' disabled={!!isValid}>
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
