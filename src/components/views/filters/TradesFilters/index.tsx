import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import DateRangePicker from 'components/shared/DateRangePicker';
import DualSelect from 'components/shared/DualSelect';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { RootState } from 'types';
import { accountsTradesFilterUpdate } from 'store/accountsSlice/thunks';
import { createObject } from 'utils/createObject';

import styles from './TradesFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const TradesFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);

  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      tradesPrice: '',
      tradesValue: '',
      tradesTotalPrice: '',
      tradesValueInBaseCurrency: '',
      tradesFee: '',
      tradesFeeInBaseCurrency: undefined,
      tradesSide: undefined,
    },
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleFilter = (key: string, value: any) => {
    dispatch(accountsTradesFilterUpdate({ filter: createObject(key, value) }));
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
            <DateRangePicker
              formMethods={formMethods}
              {...filterFormFields.tradesDate}
              callback={handleFilter}
              filterName={'tradeTime'}
            />
          </div>
          <div className={styles.item}>
            <DualSelect
              formMethods={formMethods}
              {...filterFormFields.tradesPair}
              firstOptions={coinOptions}
              secondOptions={coinOptions}
              callback={handleFilter}
              filterName={'coinsPair[id]'}
            />
          </div>
          <div className={styles.item}>
            <Controller
              control={formMethods.control}
              name={filterFormFields.tradesSide.name as any}
              render={({ field }) => (
                <Select
                  {...filterFormFields.tradesSide}
                  {...field}
                  className={styles.select}
                  callback={handleFilter}
                  filterName={'side'}
                />
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
                  callback={handleFilter}
                  filterName={'price'}
                />
              </div>

              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.tradesValue}
                  {...formMethods.register('tradesValue')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'totalPrice'}
                />
              </div>

              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.tradesTotalPrice}
                  {...formMethods.register('tradesTotalPrice')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'amount'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.tradesValueInBaseCurrency}
                  {...formMethods.register('tradesValueInBaseCurrency')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'totalPriceInBaseCurrency'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.tradesFee}
                  {...formMethods.register('tradesFee')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'fees'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.tradesFeeInBaseCurrency}
                  {...formMethods.register('tradesFeeInBaseCurrency')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'feesInBaseCurrency'}
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

export default TradesFilters;
