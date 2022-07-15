import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';

import { useForm } from 'hooks';
import { Button, Input, Select } from 'components';
import FormWrapper from 'components/forms/FormWrapper';
import FormGroup from 'components/forms/FormGroup';
import FormErrorBox from 'components/forms/FormErrorBox';

import styles from './AddForm.module.scss';
import { AddFormShape } from './types';
import { addFormFields, addSchemaKeys } from './fields';

export interface IAdd {
  onclick: SubmitHandler<AddFormShape>;
}

const AddForm = ({ onclick }: IAdd) => {
  const [errors] = useState<string[]>([]);
  const { formMethods, handleSubmit, isValid } = useForm<keyof AddFormShape, AddFormShape>({
    schemaKeys: addSchemaKeys,
  });

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onclick)}>
        <FormGroup className={styles.signIn__form__group}>
          <>
            <div className={styles.signIn__form__group__header}>Add new user</div>

            <Input {...addFormFields.name} {...formMethods.register('name')} />

            <Input {...addFormFields.email} {...formMethods.register('email')} />
            <Input
              {...addFormFields.password}
              {...formMethods.register('password')}
              haveRightIcon={true}
            />
            <Controller
              control={formMethods.control}
              name={addFormFields.accountType.name as keyof AddFormShape}
              render={({ field }) => <Select {...addFormFields.accountType} {...field} />}
            />

            {!!errors.length && <FormErrorBox errors={errors} />}

            <div className={styles.signIn__form__group__button}>
              <Button type='submit' color='secondary' size='m' disabled={!isValid}>
                ADD USER
              </Button>
            </div>
          </>
        </FormGroup>
      </FormWrapper>
    </>
  );
};

export default AddForm;
