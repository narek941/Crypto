import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import RangeSwipe from 'components/shared/Range';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup, FormWrapper } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { inflowFilterUpdate } from 'store/walletsSlice/thunks';
import { clearNullAndUndefinedFromObj } from 'utils/clearObject';
import { RootState } from 'types';

import styles from './InflowsFilters.module.scss';
import { InflowsFilterFormShape } from './types';
import { inflowFilterFormFields, inflowFilterSchemaKeys } from './fields';

const InflowsFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);

  const { formMethods, handleSubmit } = useForm<
    keyof InflowsFilterFormShape,
    InflowsFilterFormShape
  >({
    mode: 'onChange',
    schemaKeys: inflowFilterSchemaKeys,
    defaultValues: {
      searchInflowID: '',
      selectInflowValueInBaseCurrency: [undefined, undefined],
      selectInflowValue: [undefined, undefined],
      selectInflowAsset: '',
      selectInflowType: '',
    },
  });
  // const { isDirty, isValid } = formMethods.formState;
  // const watch = formMethods.watch();

  // eslint-disable-next-line no-console
  // console.log(isDirty, watch, isValid);

  const handleToggle = () => setIsMore(!isMore);

  const handleClick = (values: any) => {
    const filter = clearNullAndUndefinedFromObj({
      id: values?.searchInflowID,
      coin: values?.selectInflowAsset,
      type: values?.selectInflowType,
      amount: values?.selectInflowValue,
      amountInBaseCurrency: values?.selectInflowValueInBaseCurrency,
    });

    // eslint-disable-next-line no-console
    console.log(values);

    dispatch(
      inflowFilterUpdate({
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
              <Controller
                control={formMethods.control}
                name={inflowFilterFormFields.selectInflowType.name as any}
                render={({ field }) => (
                  <Select
                    {...inflowFilterFormFields.selectInflowType}
                    {...field}
                    className={styles.select}
                  />
                )}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={inflowFilterFormFields.selectInflowAsset.name as any}
                render={({ field }) => (
                  <Select
                    {...inflowFilterFormFields.selectInflowAsset}
                    {...field}
                    className={styles.select}
                    options={coinOptions}
                  />
                )}
              />
            </div>

            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={inflowFilterFormFields.selectInflowValue.name as any}
                render={({ field }) => (
                  <RangeSwipe {...field} {...inflowFilterFormFields.selectInflowValue} />
                )}
              />
            </div>

            {isMore && (
              <>
                <div className={styles.item}>
                  <TableSearch
                    {...formMethods.register('searchInflowID')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={inflowFilterFormFields.selectInflowValueInBaseCurrency.name as any}
                    render={({ field }) => (
                      <RangeSwipe
                        {...field}
                        {...inflowFilterFormFields.selectInflowValueInBaseCurrency}
                      />
                    )}
                  />
                </div>
              </>
            )}
            <div className={styles.clear} role='button' onClick={handleClear}>
              <span>Clear All</span>
              <div>
                <CloseIcon />
              </div>
            </div>
          </div>
          <div role='button' onClick={handleToggle} className={styles.toggle}>
            Click Here to {isMore ? 'Hide' : 'Show'} Advanced Filters
          </div>
        </div>
      </FormGroup>
    </FormWrapper>
  );
};

export default InflowsFilters;
