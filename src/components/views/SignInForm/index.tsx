import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { SubmitHandler } from 'react-hook-form';

import { Button, Checkbox, Input } from 'components';
import { FormWrapper, FormGroup } from 'components/forms';
import { authActions, authSelectors } from 'store/authSlice';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';

import { SignInFormShape } from './types';
import styles from './SignInForm.module.scss';
import { signInFormFields, signInSchemaKeys } from './fields';

import '../../../i18';

const SignInForm: React.FC = () => {
  const { t } = useTranslation();

  const loginError = useAppSelector(authSelectors.selectAuthError) as string;
  const dispatch = useAppDispatch();

  const { formMethods, handleSubmit } = useForm<keyof SignInFormShape, SignInFormShape>({
    schemaKeys: signInSchemaKeys,
  });

  const handleSignIn: SubmitHandler<SignInFormShape> = async ({
    login_email,
    login_password,
    login_rememberMe,
  }) => {
    const formValues = {
      email: login_email,
      password: login_password,
      rememberMe: login_rememberMe,
      deviceToken: uuidv4(),
    };
    dispatch(authActions.signIn(formValues));
  };

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleSignIn)}>
      <FormGroup className={styles.signIn__form__group}>
        <>
          <Input
            {...signInFormFields.login_email}
            {...formMethods.register('login_email')}
            className={styles.signIn__form__group__input}
            error={formMethods.formState.errors.login_email?.message || (loginError && ' ')}
          />
          <Input
            haveRightIcon
            {...signInFormFields.login_password}
            {...formMethods.register('login_password')}
            className={styles.signIn__form__group__input}
            error={formMethods.formState.errors.login_password?.message || loginError}
          />

          <Checkbox
            error={null}
            color='primary'
            text={t('remember_me')}
            {...signInFormFields.login_rememberMe}
            {...formMethods.register('login_rememberMe')}
            className={styles.signIn__form__group__checkbox}
          />
          <div className={styles.signIn__form__group__button}>
            <Button type='submit' color='primary' size='s'>
              Login
            </Button>
          </div>
        </>
      </FormGroup>
    </FormWrapper>
  );
};

export default SignInForm;
