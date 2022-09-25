import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { Button, Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';
import FormWrapper from 'components/forms/FormWrapper';
import DatePicker from 'components/shared/DatePicker';
import { adminActions, adminSelectors } from 'store/adminSlice';
import { createOptions } from 'utils/createOptions';

import styles from './AddUserForm.module.scss';
import { AddInflowFormShape, IAddInflow } from './types';
import { addInflowFormFields, addInflowSchemaKeys } from './fields';

const AddInflowForm = ({ onClick, handleClose }: IAddInflow) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const coinsOptions = createOptions(coins);
  !coins.length && dispatch(adminActions.getCoins());
  const { formMethods, handleSubmit } = useForm<keyof AddInflowFormShape, AddInflowFormShape>({
    schemaKeys: addInflowSchemaKeys,
  });

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onClick)}>
        <FormGroup className={styles.signIn__form__group}>
          <>
            <p className={styles.signIn__form__group__header}>Add information </p>

            <Controller
              control={formMethods.control}
              name={addInflowFormFields.transactionType.name as keyof AddInflowFormShape}
              render={({ field }) => (
                <Select
                  {...addInflowFormFields.transactionType}
                  {...field}
                  withAction={false}
                  withClear={false}
                  error={formMethods.formState.errors.transactionType?.message}
                />
              )}
            />

            <Controller
              control={formMethods.control}
              name={addInflowFormFields.coinName.name as keyof AddInflowFormShape}
              render={({ field }) => (
                <Select
                  {...addInflowFormFields.coinName}
                  {...field}
                  withAction={false}
                  withClear={false}
                  error={formMethods.formState.errors.coinName?.message}
                  options={coinsOptions}
                />
              )}
            />

            <Input
              error={formMethods.formState.errors.amount?.message}
              {...addInflowFormFields.amount}
              {...formMethods.register('amount')}
            />
            <Input
              error={formMethods.formState.errors.fees?.message}
              {...addInflowFormFields.fees}
              {...formMethods.register('fees')}
            />
            <div className={styles.item}>
              <DatePicker formMethods={formMethods} {...addInflowFormFields.time} months={1} />
            </div>

            <div className={styles.signIn__form__group__edit}>
              <Button
                color='primary'
                size='m'
                className={styles.signIn__form__group__edit__cancel}
                onClick={() => handleClose()}
              >
                {t('cancel')}
              </Button>
              <Button
                type='submit'
                color='primary'
                size='m'
                className={styles.signIn__form__group__edit__save}
              >
                {t('save')}
              </Button>
            </div>
          </>
        </FormGroup>
      </FormWrapper>
    </>
  );
};

export default AddInflowForm;
