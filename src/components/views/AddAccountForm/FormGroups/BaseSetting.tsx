import 'react-toastify/dist/ReactToastify.css';
import { Controller } from 'react-hook-form';

import { Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';

import { AddAccountFormShape } from '../types';
import { addAccountFormFields } from '../fields';
import styles from '../AddAccountForm.module.scss';

const BaseSetting = ({ formMethods }: any) => {
  return (
    <FormGroup className={styles.form__section}>
      <>
        <div className={styles.form__header}>Basic settings</div>
        <Input {...addAccountFormFields.name} {...formMethods.register('name')} />
        <Controller
          {...formMethods.register('baseCurrency')}
          control={formMethods.control}
          name={addAccountFormFields.baseCurrency.name as keyof AddAccountFormShape}
          render={({ field }) => <Select {...addAccountFormFields.baseCurrency} {...field} />}
        />
        <Input {...addAccountFormFields.startCapital} {...formMethods.register('startCapital')} />
      </>
    </FormGroup>
  );
};

export default BaseSetting;