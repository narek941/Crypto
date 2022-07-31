import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import RangeSwipe from 'components/shared/Range';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup, FormWrapper } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import { clearNullAndUndefinedFromObj } from 'utils/clearObject';
import { RootState } from 'types';

import styles from './OpenOrdersFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const OpenOrdersFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);
  const [isUpdateState, setIsUpdateState] = useState(false);

  const { formMethods, handleSubmit } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      selectValue: [undefined, undefined],
      selectValueInBaseCurrency: [undefined, undefined],
      selectFee: [undefined, undefined],
      selectShare: [undefined, undefined],
      selectFeeInBaseCurrency: [undefined, undefined],
      selectSide: undefined,
      searchID: '',
      searchReceived: '',
      selectPairEnd: undefined,
      selectPairStart: undefined,
    },
  });

  // const formValues = formMethods.getValues();
  console.log(isUpdateState, 888);

  // useEffect(() => {

  //   handleClick(formValues);
  //   // formMethods.formState.isDirty && handleClick(values);
  // }, [formValues]);

  // const { isDirty, isValid } = formMethods.formState;
  // const watch = formMethods.watch();

  // eslint-disable-next-line no-console
  // console.log(isDirty, watch, isValid);

  const handleToggle = () => setIsMore(!isMore);

  useEffect(() => {
    handleClick(formMethods.getValues());
    console.log(formMethods.getValues(), 'qqq');
  }, [setIsUpdateState]);

  const handleClick = (values: any) => {
    const filter = clearNullAndUndefinedFromObj({
      fee: values?.selectFee,
      side: values?.selectSide,
      value: values?.selectValue,
      share: values?.selectShare,
      originalId: values?.searchID,
      received: values?.searchReceived,
      feeBaseCurrency: values?.selectFeeInBaseCurrency,
      valueInBaseCurrency: values?.selectValueInBaseCurrency,
      pairs: [values?.selectPairStart, values.selectPairEnd],
      receivedBaseCurrency: values?.searchReceivedInBaseCurrency,
      creationDate: [values?.selectCreationDate?.startDate, values?.selectCreationDate?.endDate],
      creationTime: [values?.selectCreationTime?.startDate, values?.selectCreationTime?.endDate],
      lastOperationTime: [values?.selectUpdatedTime?.startDate, values?.selectUpdatedTime?.endDate],
    });

    dispatch(
      openOrdersFilterUpdate({
        filter,
      }),
    );
  };

  const handleClear = () => formMethods.reset({});

  const handleToggleSelect = () => {
    setIsUpdateState(true);
  };

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
              <DatePicker formMethods={formMethods} {...filterFormFields.creationDate} />
            </div>
            <div className={styles.item}>
              <DualSelect
                formMethods={formMethods}
                {...filterFormFields.selectPair}
                firstOptions={coinOptions}
                secondOptions={coinOptions}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.selectSide.name as any}
                render={({ field }) => (
                  <Select
                    {...filterFormFields.selectSide}
                    {...field}
                    className={styles.select}
                    handleToggle={handleToggleSelect}
                  />
                )}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.selectValue.name as any}
                render={({ field }) => <RangeSwipe {...field} {...filterFormFields.selectValue} />}
              />
            </div>

            {isMore && (
              <>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.searchID}
                    {...formMethods.register('searchID')}
                    className={styles.search}
                  />
                </div>

                <div className={styles.item}>
                  <DatePicker formMethods={formMethods} {...filterFormFields.creationTime} />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={filterFormFields.selectValueInBaseCurrency.name as any}
                    render={({ field }) => (
                      <RangeSwipe {...field} {...filterFormFields.selectValueInBaseCurrency} />
                    )}
                  />
                </div>

                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.searchReceived}
                    {...formMethods.register('searchReceived')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.searchReceivedInBaseCurrency}
                    {...formMethods.register('searchReceivedInBaseCurrency')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={filterFormFields.selectFee.name as any}
                    render={({ field }) => (
                      <RangeSwipe {...field} {...filterFormFields.selectFee} />
                    )}
                  />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={filterFormFields.selectFeeInBaseCurrency.name as any}
                    render={({ field }) => (
                      <RangeSwipe {...field} {...filterFormFields.selectFeeInBaseCurrency} />
                    )}
                  />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={filterFormFields.selectShare.name as any}
                    render={({ field }) => (
                      <RangeSwipe {...field} {...filterFormFields.selectShare} />
                    )}
                  />
                </div>
                <div className={styles.item}>
                  <DatePicker formMethods={formMethods} {...filterFormFields.updatedTime} />
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

export default OpenOrdersFilters;
