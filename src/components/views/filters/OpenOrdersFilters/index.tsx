import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import RangeSwipe from 'components/shared/Range';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import { RootState } from 'types';
import { createObject } from 'utils/createObject';

import styles from './OpenOrdersFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const OpenOrdersFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);

  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
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

  const handleToggle = () => setIsMore(!isMore);

  const handleClear = () => formMethods.reset({});

  const coinOptions = useMemo(
    () =>
      coins.map((coin) => ({
        label: coin.name,
        value: coin.id,
      })),
    [coins],
  );

  const handleFilter = (key: string, value: any) => {
    dispatch(openOrdersFilterUpdate({ filter: createObject(key, value) }));
  };

  return (
    <FormGroup className={styles.signIn__form__group}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <DatePicker
              formMethods={formMethods}
              {...filterFormFields.creationDate}
              callback={handleFilter}
              filterName={'creationDate'}
            />
          </div>
          <div className={styles.item}>
            <DualSelect
              formMethods={formMethods}
              {...filterFormFields.selectPair}
              firstOptions={coinOptions}
              secondOptions={coinOptions}
              callback={handleFilter}
              filterName={'pair'}
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
                  callback={handleFilter}
                  filterName={'side'}
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
                  {...filterFormFields.selectValue}
                  callback={handleFilter}
                  filterName={'value'}
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
                  callback={handleFilter}
                  filterName={'id'}
                />
              </div>

              <div className={styles.item}>
                <DatePicker
                  formMethods={formMethods}
                  {...filterFormFields.creationTime}
                  callback={handleFilter}
                  filterName={'creationTime'}
                />
              </div>
              <div className={styles.item}>
                <Controller
                  control={formMethods.control}
                  name={filterFormFields.selectValueInBaseCurrency.name as any}
                  render={({ field }) => (
                    <RangeSwipe
                      {...field}
                      {...filterFormFields.selectValueInBaseCurrency}
                      callback={handleFilter}
                      filterName={'valueInBaseCurrency'}
                    />
                  )}
                />
              </div>

              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.searchReceived}
                  {...formMethods.register('searchReceived')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'received'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.searchReceivedInBaseCurrency}
                  {...formMethods.register('searchReceivedInBaseCurrency')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'receivedInBaseCurrency'}
                />
              </div>
              <div className={styles.item}>
                <Controller
                  control={formMethods.control}
                  name={filterFormFields.selectFee.name as any}
                  render={({ field }) => (
                    <RangeSwipe
                      {...field}
                      {...filterFormFields.selectFee}
                      callback={handleFilter}
                      filterName={'fee'}
                    />
                  )}
                />
              </div>
              <div className={styles.item}>
                <Controller
                  control={formMethods.control}
                  name={filterFormFields.selectFeeInBaseCurrency.name as any}
                  render={({ field }) => (
                    <RangeSwipe
                      {...field}
                      {...filterFormFields.selectFeeInBaseCurrency}
                      callback={handleFilter}
                      filterName={'feeInBaseCurrency'}
                    />
                  )}
                />
              </div>
              <div className={styles.item}>
                <Controller
                  control={formMethods.control}
                  name={filterFormFields.selectShare.name as any}
                  render={({ field }) => (
                    <RangeSwipe
                      {...field}
                      {...filterFormFields.selectShare}
                      callback={handleFilter}
                      filterName={'share'}
                    />
                  )}
                />
              </div>
              <div className={styles.item}>
                <DatePicker
                  formMethods={formMethods}
                  {...filterFormFields.updatedTime}
                  callback={handleFilter}
                  filterName={'updatedTime'}
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
  );
};

export default OpenOrdersFilters;
