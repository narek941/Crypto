import { useState } from 'react';
import { Controller } from 'react-hook-form';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import RangeSwipe from 'components/shared/Range';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup, FormWrapper } from 'components/forms';
import { useAppDispatch, useForm } from 'hooks';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';

import styles from './FilterWrapper.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const FilterWrapper = () => {
  const dispatch = useAppDispatch();

  const [isMore, setIsMore] = useState(false);

  const { formMethods, handleSubmit } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      selectValue: [0, 10],
      selectFee: [0, 10],
      selectShare: [0, 10],
      selectFeeInBaseCurrency: [0, 10],
    },
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleClick = (values: any) => {
    // eslint-disable-next-line no-console
    console.log(values);
    dispatch(
      openOrdersFilterUpdate({
        filter: {
          side: values?.selectSide,
          creationTime: values?.creationTime,
          id: values?.searchID,
          value: values?.selectValue,
          valueInBaseCurrency: values?.selectValueInBaseCurrency,
          updatedAt: values?.updateTime,
          share: values?.selectShare,
          received: values?.searchReceived,
          receivedBaseCurrency: values?.searchReceivedInBaseCurrency,
          fee: values?.selectFee,
          feeBaseCurrency: values?.selectFeeInBaseCurrency,
          pairs: values?.selectPairs,
        },
      }),
    );
  };

  // const handleClear = () => formMethods.reset({});
  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleClick)}>
      <FormGroup className={styles.signIn__form__group}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.item}>
              <DatePicker
                {...filterFormFields.creationDate}
                {...formMethods.register('creationDate')}
              />
            </div>

            <div className={styles.item}>
              <DualSelect formMethods={formMethods} {...filterFormFields.selectPair} />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.selectSide.name as any}
                render={({ field }) => (
                  <Select {...filterFormFields.selectSide} {...field} className={styles.select} />
                )}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.selectValue.name as any}
                render={({ field }) => (
                  <RangeSwipe
                    {...field}
                    {...filterFormFields.selectValue}
                    {...formMethods.register('selectValue')}
                  />
                )}
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
                  <DatePicker
                    {...filterFormFields.creationTime}
                    {...formMethods.register('creationTime')}
                  />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={filterFormFields.selectValue.name as any}
                    render={({ field }) => (
                      <RangeSwipe
                        {...field}
                        {...filterFormFields.selectValueInBaseCurrency}
                        {...formMethods.register('selectValueInBaseCurrency')}
                      />
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
                    name={filterFormFields.selectValue.name as any}
                    render={({ field }) => (
                      <RangeSwipe
                        {...field}
                        {...filterFormFields.selectFee}
                        {...formMethods.register('selectFee')}
                      />
                    )}
                  />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={filterFormFields.selectValue.name as any}
                    render={({ field }) => (
                      <RangeSwipe
                        {...field}
                        {...filterFormFields.selectFeeInBaseCurrency}
                        {...formMethods.register('selectFeeInBaseCurrency')}
                      />
                    )}
                  />
                </div>
                <div className={styles.item}>
                  <Controller
                    control={formMethods.control}
                    name={filterFormFields.selectValue.name as any}
                    render={({ field }) => (
                      <RangeSwipe
                        {...field}
                        {...filterFormFields.selectShare}
                        {...formMethods.register('selectShare')}
                      />
                    )}
                  />
                </div>
                <div className={styles.item}>
                  <DatePicker
                    {...filterFormFields.updateTime}
                    {...formMethods.register('updateTime')}
                  />
                </div>
              </>
            )}
            <div className={styles.clear}>
              <button type='submit'>submit all</button>
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

export default FilterWrapper;
