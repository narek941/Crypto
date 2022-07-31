import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup, FormWrapper } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import { clearNullAndUndefinedFromObj } from 'utils/clearObject';
import { RootState } from 'types';

import styles from './TradesFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const TradesFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);

  const { formMethods, handleSubmit } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      tradesPrice: '',
      tradesValue: '',
      tradesTotalPrice: '',
      tradesValueInBaseCurrency: '',
      tradesFee: '',
      tradesFeeInBaseCurrency: undefined,
      tradesPairEnd: undefined,
      tradesPairStart: undefined,
      tradesSide: undefined,
    },
  });
  // const { isDirty, isValid } = formMethods.formState;
  // const watch = formMethods.watch();

  // eslint-disable-next-line no-console
  // console.log(isDirty, watch, isValid);

  const handleToggle = () => setIsMore(!isMore);

  const handleClick = (values: any) => {
    const filter = clearNullAndUndefinedFromObj({
      originalId: values?.tradesPrice,
      value: values?.tradesValue,
      pairs: [values?.tradesPairStart, values.tradesPairEnd],
      side: values?.tradesSide,
      tradesDate: [values?.selectTradesDate?.startDate, values?.selectTradesDate?.endDate],

      totalPrice: values?.tradesTotalPrice,
      valueInBaseCurrency: values?.tradesValueInBaseCurrency,
      fees: values?.tradesFee,
      feInBaseCurrency: values.tradesFeeInBaseCurrency,
    });

    // eslint-disable-next-line no-console
    console.log(values);

    dispatch(
      openOrdersFilterUpdate({
        filter,
      }),
    );
  };

  const handleClear = () => formMethods.reset({});

  const coinOptions = useMemo(
    () =>
      coins.map((coin) => ({
        label: coin.name,
        value: coin.id,
      })),
    [coins],
  );

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleClick)}>
      <FormGroup className={styles.signIn__form__group}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.item}>
              <DatePicker formMethods={formMethods} {...filterFormFields.tradesDate} />
            </div>
            <div className={styles.item}>
              <DualSelect
                formMethods={formMethods}
                {...filterFormFields.tradesPair}
                firstOptions={coinOptions}
                secondOptions={coinOptions}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.tradesSide.name as any}
                render={({ field }) => (
                  <Select {...filterFormFields.tradesSide} {...field} className={styles.select} />
                )}
              />
            </div>

            {isMore && (
              <>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.tradesPrice}
                    {...formMethods.register('tradesPrice')}
                    className={styles.search}
                  />
                </div>

                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.tradesValue}
                    {...formMethods.register('tradesValue')}
                    className={styles.search}
                  />
                </div>

                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.tradesTotalPrice}
                    {...formMethods.register('tradesTotalPrice')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.tradesValueInBaseCurrency}
                    {...formMethods.register('tradesValueInBaseCurrency')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.tradesFee}
                    {...formMethods.register('tradesFee')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.tradesFeeInBaseCurrency}
                    {...formMethods.register('tradesFeeInBaseCurrency')}
                    className={styles.search}
                  />
                </div>
              </>
            )}

            <button className={styles.clear} type='submit' onClick={handleClick}>
              <span>Clear All</span>
              <div>
                <CloseIcon />
              </div>
            </button>
          </div>
          <div role='button' onClick={handleToggle} className={styles.toggle}>
            Click Here to {isMore ? 'Hide' : 'Show'} Advanced Filters
          </div>
        </div>
      </FormGroup>
    </FormWrapper>
  );
};

export default TradesFilters;
