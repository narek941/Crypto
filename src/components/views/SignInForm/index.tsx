import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Checkbox from 'components/shared/Checkbox';
import Button from 'components/shared/Button';
import FormGroup from 'components/shared/forms/FormGroup';
import Input from 'components/shared/Input';
import FormWrapper from 'components/shared/forms/FormWrapper';
import FormErrorBox from 'components/shared/forms/FormErrorBox';
// import { valid_email, valid_password } from 'constants/global';
import { useAppDispatch, useForm } from 'hooks';
import { authActions } from 'store/authSlice';

import styles from './SignInForm.module.scss';
import { SignInFormShape } from './types';
import { signInFormFields, signInSchemaKeys } from './fields';

const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [errors] = useState<string[]>([]);
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
          {!!errors.length && (
            <FormErrorBox errors={errors} className={styles.signIn__form__group__error} />
          )}

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
