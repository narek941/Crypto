import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { Button, Input, Select } from 'components';
import FormGroup from 'components/forms/FormGroup';
import FormWrapper from 'components/forms/FormWrapper';
import DatePicker from 'components/shared/DatePicker';
import { adminActions, adminSelectors } from 'store/adminSlice';
import { createOptions } from 'utils/createOptions';
import { walletsSelectors } from 'store/walletsSlice';

import styles from './AddUserForm.module.scss';
import { AddInflowFormShape, IAddInflow } from './types';
import { addInflowFormFields, addInflowSchemaKeys } from './fields';

const AddInflowForm = ({ onClick, handleClose, id }: IAddInflow) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const coinsOptions = createOptions(coins);
  const { list } = useAppSelector(walletsSelectors.selectInflow);
  const currentInflow = list?.find((item) => id === item?.id);
  !coins.length && dispatch(adminActions.getCoins());
  const walletError = useAppSelector(walletsSelectors.selectWalletsError);

  const addInflowFormDefaultValues = useMemo(
    () =>
      id
        ? {
            transactionType: currentInflow?.type,
            coinName: currentInflow?.coin?.id,
            amount: currentInflow?.amount,
            fees: currentInflow?.transactionFee,
            time: currentInflow?.createdAt && new Date(currentInflow?.createdAt),
            api: currentInflow?.api,
            id: currentInflow?.id,
          }
        : {},
    [currentInflow, id],
  );

  const headerText = id ? 'Edit information' : 'Add information';

  const { formMethods, handleSubmit } = useForm<keyof AddInflowFormShape, AddInflowFormShape>({
    schemaKeys: addInflowSchemaKeys,
    defaultValues: addInflowFormDefaultValues,
  });

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onClick)}>
        <FormGroup className={styles.signIn__form__group}>
          <>
            <p className={styles.signIn__form__group__header}>{headerText}</p>
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
              <Controller
                control={formMethods.control}
                name={addInflowFormFields.time.name as any}
                render={(field: any) => (
                  <DatePicker
                    field={field}
                    formMethods={formMethods}
                    {...addInflowFormFields.time}
                    months={1}
                    error={formMethods.formState.errors.time?.message}
                  />
                )}
              />
            </div>
            {walletError && <div className={styles.error}>{walletError.message}</div>}

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
