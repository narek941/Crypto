import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { authActions, authSelectors } from 'store/authSlice';
import { Button, Checkbox, Input } from 'components';
import FormWrapper from 'components/forms/FormWrapper';
import FormGroup from 'components/forms/FormGroup';

import styles from './SignInForm.module.scss';
import { SignInFormShape } from './types';
import { signInFormFields, signInSchemaKeys } from './fields';
import '../../../i18';

const SignInForm: React.FC = () => {
  const { t } = useTranslation();

  const loginError = useAppSelector(authSelectors.selectAuthError) as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { formMethods, handleSubmit, isValid } = useForm<keyof SignInFormShape, SignInFormShape>({
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
      navigate,
      deviceToken: uuidv4(),
    };
    dispatch(authActions.signIn(formValues));
  };

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleSignIn)}>
      <FormGroup className={styles.signIn__form__group}>
        <>
          <Input
            error={formMethods.formState.errors.login_email?.message}
            {...signInFormFields.login_email}
            {...formMethods.register('login_email')}
            className={styles.signIn__form__group__input}
          />
          <Input
            error={formMethods.formState.errors.login_password?.message}
            {...signInFormFields.login_password}
            {...formMethods.register('login_password')}
            haveRightIcon={true}
            className={styles.signIn__form__group__input}
          />
          {!!loginError && <p className={styles.signIn__form__group__error}>{loginError}</p>}

          <Checkbox
            text={t('remember_me')}
            error={null}
            color='primary'
            className={styles.signIn__form__group__checkbox}
            {...signInFormFields.login_rememberMe}
            {...formMethods.register('login_rememberMe')}
          />
          <div className={styles.signIn__form__group__button}>
            <Button type='submit' color='primary' size='s' disabled={!isValid}>
              Login
            </Button>
          </div>
        </>
      </FormGroup>
    </FormWrapper>
  );
};

export default SignInForm;
