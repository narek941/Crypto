import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Button from 'components/shared/Button';
import Input from 'components/shared/Input';
import Select from 'components/shared/Select';
import FormGroup from 'components/shared/forms/FormGroup';
import FormWrapper from 'components/shared/forms/FormWrapper';
import FormErrorBox from 'components/shared/forms/FormErrorBox';

import { useForm } from '../../../hooks';

import styles from './AddUserForm.module.scss';
import { AddUserFormShape } from './types';
import { addUserFormFields, addUserSchemaKeys } from './fields';

const AddUserForm: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const { formMethods, handleSubmit } = useForm<keyof AddUserFormShape, AddUserFormShape>({
    schemaKeys: addUserSchemaKeys,
  });

  const notify = () => toast('User has been added');

  const handleSignIn: SubmitHandler<AddUserFormShape> = async (values) => {
    setErrors([]);
    setTimeout(() => {
      navigate('/accounts');
    }, 4000);
    notify();

    // const response = await your action here;
    // TODO: the comment is a simple example of the values which will be returned when user submits this form
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleSignIn)}>
        <FormGroup className={styles.signIn__form__group}>
          <>
            <div className={styles.signIn__form__group__header}>Add new user</div>

            <Input {...addUserFormFields.name} {...formMethods.register('name')} />

            <Input {...addUserFormFields.email} {...formMethods.register('email')} />
            <Input
              {...addUserFormFields.password}
              {...formMethods.register('password')}
              haveRightIcon={true}
            />
            <Select {...addUserFormFields.accountType} {...formMethods.register('accountType')} />
            {!!errors.length && <FormErrorBox errors={errors} />}
            <div className={styles.signIn__form__group__button}>
              <Button type='submit' color='secondary' size='m'>
                ADD USER
              </Button>
            </div>
          </>
        </FormGroup>
      </FormWrapper>
    </>
  );
};

export default AddUserForm;
