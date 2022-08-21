import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';

import { addAccountFormFields } from '../fields';
import { AddAccountFormShape } from '../types';
import styles from '../AddAccountForm.module.scss';

const AddAccountForm = ({ formMethods }: any) => {
  const { t } = useTranslation();

  return (
    <FormGroup className={styles.form__section}>
      <>
        <div className={styles.form__header}>{t('wallet')}</div>
        <Controller
          control={formMethods.control}
          {...formMethods.register('exchange')}
          name={addAccountFormFields.exchange.name as keyof AddAccountFormShape}
          render={({ field }) => (
            <Select
              {...addAccountFormFields.exchange}
              {...field}
              withAction={false}
              error={formMethods.formState.errors.exchange?.message}
            />
          )}
        />
        <Input
          {...addAccountFormFields.apiKey}
          {...formMethods.register('apiKey')}
          error={formMethods.formState.errors.apiKey?.message}
        />
        <Input
          {...addAccountFormFields.apiSecret}
          {...formMethods.register('apiSecret')}
          error={formMethods.formState.errors.apiSecret?.message}
        />
        <Controller
          control={formMethods.control}
          {...formMethods.register('refreshInterval')}
          name={addAccountFormFields.refreshInterval.name as keyof AddAccountFormShape}
          render={({ field }) => (
            <Select
              {...addAccountFormFields.refreshInterval}
              {...field}
              withAction={false}
              error={formMethods.formState.errors.refreshInterval?.message}
            />
          )}
        />
      </>
    </FormGroup>
  );
};

export default AddAccountForm;
