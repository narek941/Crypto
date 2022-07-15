import 'react-toastify/dist/ReactToastify.css';
import { Controller } from 'react-hook-form';

import { Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';

import { addAccountFormFields } from '../fields';
import { AddAccountFormShape } from '../types';
import styles from '../AddAccountForm.module.scss';

const AddAccountForm = ({ formMethods }: any) => {
  return (
    <FormGroup className={styles.form__section}>
      <>
        <div className={styles.form__header}>Wallet</div>
        <Controller
          control={formMethods.control}
          {...formMethods.register('exchange')}
          name={addAccountFormFields.exchange.name as keyof AddAccountFormShape}
          render={({ field }) => <Select {...addAccountFormFields.exchange} {...field} />}
        />
        <Input {...addAccountFormFields.apiKey} {...formMethods.register('apiKey')} />
        <Input {...addAccountFormFields.apiSecret} {...formMethods.register('apiSecret')} />
      </>
    </FormGroup>
  );
};

export default AddAccountForm;
