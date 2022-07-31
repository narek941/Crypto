import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup, FormWrapper } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { ordersFilterUpdate } from 'store/walletsSlice/thunks';
import { clearNullAndUndefinedFromObj } from 'utils/clearObject';
import { RootState } from 'types';

import styles from './OrdersHistoryFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const OrdersHistoryFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);

  const { formMethods, handleSubmit } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      // historyID: '',
      // historyValue: '',
      // historyUpdateTime: [undefined, undefined],
      // historySide: undefined,
      // selectHistoryType: undefined,
      // selectHistoryPairEnd: '',
      // historyStop: '',
      // selectHistoryPairStart: '',
      // selectHistoryValueInBaseCurrency: '',
      // historyLimit: '',
      // historyModifiers: '',
    },
  });
  // const { isDirty, isValid } = formMethods.formState;
  // const watch = formMethods.watch();

  // eslint-disable-next-line no-console
  // console.log(isDirty, watch, isValid);

  const handleToggle = () => setIsMore(!isMore);

  const handleClick = (values: any) => {
    const filter = clearNullAndUndefinedFromObj({
      id: values?.historyID,
      // value: values?.historyValue,
      // lastOperationTime: [
      //   values?.historyUpdateTime?.startDate,
      //   values?.historyUpdateTime?.endDate,
      // ],
      // side: values?.historySide,
      // type: values?.selectHistoryType,
      // coinsPair: [values?.selectHistoryPairStart, values.selectHistoryPairEnd],
      // valueInBaseCurrency: values?.selectHistoryValueInBaseCurrency,
      // limitPrice: values?.historyLimit,
      // stopPrice: values?.historyStop,
      // modifiers: values?.historyModifiers,
    });

    // eslint-disable-next-line no-console
    console.log(values);

    dispatch(
      ordersFilterUpdate({
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
              <DualSelect
                formMethods={formMethods}
                {...filterFormFields.historyPair}
                firstOptions={coinOptions}
                secondOptions={coinOptions}
              />
            </div>

            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.historySide.name as any}
                render={({ field }) => (
                  <Select {...filterFormFields.historySide} {...field} className={styles.select} />
                )}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.historyType.name as any}
                render={({ field }) => (
                  <Select {...filterFormFields.historyType} {...field} className={styles.select} />
                )}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.historyValue}
                {...formMethods.register('historyValue')}
                className={styles.search}
              />
            </div>

            <div className={styles.item}>
              <DatePicker formMethods={formMethods} {...filterFormFields.historyUpdateTime} />
            </div>

            {isMore && (
              <>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.historyID}
                    {...formMethods.register('historyID')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.historyValueInBaseCurrency}
                    {...formMethods.register('historyValueInBaseCurrency')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.searchHistoryStop}
                    {...formMethods.register('searchHistoryStop')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.searchHistoryLimit}
                    {...formMethods.register('searchHistoryLimit')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.searchHistoryModifiers}
                    {...formMethods.register('searchHistoryModifiers')}
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

export default OrdersHistoryFilters;
