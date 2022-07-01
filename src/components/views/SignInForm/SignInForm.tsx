import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Checkbox from 'components/shared/Checkbox';
import Button from 'components/shared/Button';
import FormGroup from 'components/shared/forms/FormGroup';
import Input from 'components/shared/Input';
import FormWrapper from 'components/shared/forms/FormWrapper';
import FormErrorBox from 'components/shared/forms/FormErrorBox';
import { valid_email, valid_password } from 'constants/global';

import { useForm } from '../../../hooks';

import styles from './SignInForm.module.scss';
import { SignInFormShape } from './types';
import { signInFormFields, signInSchemaKeys } from './fields';

const SignInForm: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const { formMethods, handleSubmit } = useForm<keyof SignInFormShape, SignInFormShape>({
    schemaKeys: signInSchemaKeys,
  });

  const handleSignIn: SubmitHandler<SignInFormShape> = async (values) => {
    // const response = await your action here;
    // TODO: the comment is a simple example of the values which will be returned when user submits this form
    // eslint-disable-next-line no-console
    if (values.email === valid_email && values.password == valid_password) {
      navigate('/accounts');
    } else {
      setErrors(['Wrong email or password']);
    }
  };

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleSignIn)}>
      <FormGroup className={styles.signIn__form__group}>
        <>
          <Input {...signInFormFields.email} {...formMethods.register('email')} />
          <Input
            {...signInFormFields.password}
            {...formMethods.register('password')}
            haveRightIcon={true}
          />
          {!!errors.length && <FormErrorBox errors={errors} />}

          <Checkbox
            text='Remember me'
            error={null}
            color='primary'
            {...signInFormFields.rememberMe}
            {...formMethods.register('rememberMe')}
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
