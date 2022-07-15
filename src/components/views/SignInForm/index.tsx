import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { authActions, authSelectors } from 'store/authSlice';
import { Button, Checkbox, Input } from 'components';
import FormWrapper from 'components/forms/FormWrapper';
import FormGroup from 'components/forms/FormGroup';

import styles from './SignInForm.module.scss';
import { SignInFormShape } from './types';
import { signInFormFields, signInSchemaKeys } from './fields';

const SignInForm: React.FC = () => {
  const loginError = useAppSelector(authSelectors.selectAuthError) as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { formMethods, handleSubmit, isValid } = useForm<keyof SignInFormShape, SignInFormShape>({
    schemaKeys: signInSchemaKeys,
  });

  const handleSignIn: SubmitHandler<SignInFormShape> = async (values) => {
    const formValues = {
      ...values,
      navigate,
      deviceToken: uuidv4(),
    };
    // eslint-disable-next-line no-console
    dispatch(authActions.signIn(formValues));

    // const response = await your action here;
    // TODO: the comment is a simple example of the values which will be returned when user submits this form
    // eslint-disable-next-line no-console
    // if (values.email === valid_email && values.password == valid_password) {
    //   navigate('/accounts');
    // } else {
    //   setErrors(['Wrong email or password']);
    // }
  };

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleSignIn)}>
      <FormGroup className={styles.signIn__form__group}>
        <>
          <Input
            {...signInFormFields.email}
            {...formMethods.register('email')}
            className={styles.signIn__form__group__input}
          />
          <Input
            {...signInFormFields.password}
            {...formMethods.register('password')}
            haveRightIcon={true}
            className={styles.signIn__form__group__input}
          />
          {/* {!!errors.length && (
            <FormErrorBox errors={errors} className={styles.signIn__form__group__error} />
          )} */}
          {!!loginError && <p className={styles.signIn__form__group__error}>{loginError}</p>}

          <Checkbox
            text='Remember me'
            error={null}
            color='primary'
            className={styles.signIn__form__group__checkbox}
            {...signInFormFields.rememberMe}
            {...formMethods.register('rememberMe')}
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
