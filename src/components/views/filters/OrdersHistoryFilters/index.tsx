import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import DatePicker from 'components/shared/DatePicker';
import DualSelect from 'components/shared/DualSelect';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { ordersFilterUpdate } from 'store/walletsSlice/thunks';
import { RootState } from 'types';
import { createObject } from 'utils/createObject';

import styles from './OrdersHistoryFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const OrdersHistoryFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);

  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      historyID: '',
      historyValue: '',
      historyUpdateTime: [undefined, undefined],
      historySide: undefined,
    },
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleFilter = (key: string, value: any) => {
    dispatch(ordersFilterUpdate({ filter: createObject(key, value) }));
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
    <FormGroup className={styles.signIn__form__group}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <DualSelect
              formMethods={formMethods}
              {...filterFormFields.historyPair}
              firstOptions={coinOptions}
              secondOptions={coinOptions}
              callback={handleFilter}
              filterName={'coinsPair'}
            />
          </div>

          <div className={styles.item}>
            <Controller
              control={formMethods.control}
              name={filterFormFields.historySide.name as any}
              render={({ field }) => (
                <Select
                  {...filterFormFields.historySide}
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
              name={filterFormFields.historyType.name as any}
              render={({ field }) => (
                <Select
                  {...filterFormFields.historyType}
                  {...field}
                  className={styles.select}
                  callback={handleFilter}
                  filterName={'type'}
                />
              )}
            />
          </div>
          <div className={styles.item}>
            <TableSearch
              {...filterFormFields.historyValue}
              {...formMethods.register('historyValue')}
              className={styles.search}
              callback={handleFilter}
              filterName={'value'}
            />
          </div>

          <div className={styles.item}>
            <DatePicker
              formMethods={formMethods}
              {...filterFormFields.historyUpdateTime}
              callback={handleFilter}
              filterName={'lastOperationTime'}
            />
          </div>

          {isMore && (
            <>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.historyID}
                  {...formMethods.register('historyID')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'id'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.historyValueInBaseCurrency}
                  {...formMethods.register('historyValueInBaseCurrency')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'valueInBaseCurrency'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.searchHistoryStop}
                  {...formMethods.register('searchHistoryStop')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'stopPrice'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.searchHistoryLimit}
                  {...formMethods.register('searchHistoryLimit')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'limitPrice'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.searchHistoryModifiers}
                  {...formMethods.register('searchHistoryModifiers')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'modifiers'}
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

export default OrdersHistoryFilters;
