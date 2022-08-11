import { Controller } from 'react-hook-form';

import { Input, Select } from 'components';
import { FormGroup } from 'components/forms';

import { AddAccountFormShape } from '../types';
import { addAccountFormFields } from '../fields';
import styles from '../AddAccountForm.module.scss';

const TradeLimit = ({ formMethods }: any) => (
  <FormGroup className={styles.form__section}>
    <>
      <Controller
        control={formMethods.control}
        {...formMethods.register('maxDrawdown')}
        name={addAccountFormFields.maxDrawdown.name as keyof AddAccountFormShape}
        render={({ field }) => <Select {...addAccountFormFields.maxDrawdown} {...field} />}
      />

      <Input {...addAccountFormFields.maxPosition} {...formMethods.register('maxPosition')} />

      <Input {...addAccountFormFields.maxRisk} {...formMethods.register('maxRisk')} />
    </>
  </FormGroup>
);

export default TradeLimit;
