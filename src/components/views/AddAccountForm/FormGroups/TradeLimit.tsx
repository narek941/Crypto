import { Controller } from 'react-hook-form';

import { AccessWrapper, Input, Select } from 'components';
import { FormGroup } from 'components/forms';

import { AddAccountFormShape } from '../types';
import { addAccountFormFields } from '../fields';
import styles from '../AddAccountForm.module.scss';

const TradeLimit = ({ formMethods }: any) => {
  return (
    <FormGroup className={styles.form__section}>
      <AccessWrapper>
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
                numeric={true}
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
      </AccessWrapper>
    </FormGroup>
  );
};

export default TradeLimit;
