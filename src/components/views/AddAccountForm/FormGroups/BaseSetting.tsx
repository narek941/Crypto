import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';

import { AddAccountFormShape } from '../types';
import { addAccountFormFields } from '../fields';
import styles from '../AddAccountForm.module.scss';

const BaseSetting = ({ formMethods }: any) => {
  const { t } = useTranslation();
  return (
    <FormGroup className={styles.form__section}>
      <>
        <div className={styles.form__header}>{t('basic_settings')}</div>
        <Input
          {...addAccountFormFields.name}
          {...formMethods.register('name')}
          error={formMethods.formState.errors.name?.message}
        />
        <Controller
          {...formMethods.register('baseCurrency')}
          control={formMethods.control}
          name={addAccountFormFields.baseCurrency.name as keyof AddAccountFormShape}
          render={({ field }) => (
            <Select
              {...addAccountFormFields.baseCurrency}
              {...field}
              withAction={false}
              error={formMethods.formState.errors.baseCurrency?.message}
            />
          )}
        />
        <Input
          {...addAccountFormFields.startCapital}
          {...formMethods.register('startCapital')}
          error={formMethods.formState.errors.startCapital?.message}
        />
      </>
    </FormGroup>
  );
};

export default BaseSetting;
