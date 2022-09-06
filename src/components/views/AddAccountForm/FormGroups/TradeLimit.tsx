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
        render={({ field }) => (
          <Select
            {...addAccountFormFields.maxDrawdown}
            {...field}
            withAction={false}
            withClear={false}
            error={formMethods.formState.errors.maxDrawdown?.message}
          />
        )}
      />

      <Input
        {...addAccountFormFields.maxPosition}
        {...formMethods.register('maxPosition')}
        error={formMethods.formState.errors.maxPosition?.message}
        type='number'
      />

      <Input
        {...addAccountFormFields.maxRisk}
        {...formMethods.register('maxRisk')}
        error={formMethods.formState.errors.maxRisk?.message}
        type='number'
      />
    </>
  </FormGroup>
);

export default TradeLimit;
