import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import DateRangePicker from 'components/shared/DateRangePicker';
import DualSelect from 'components/shared/DualSelect';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { RootState } from 'types';
import { accountsTradesFilterClear, accountsTradesFilterUpdate } from 'store/accountsSlice/thunks';
import { createObject } from 'utils/createObject';

import styles from './TradesFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const TradesFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);
  const tradingPairs = useAppSelector((state: RootState) => state.admin.tradingPairs);

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);

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
    if (key === 'pair') {
      const coinsPair = tradingPairs.find((pair) => {
        const fromCoin = coins.find((coin) => coin.id === value[0]);
        const toCoin = coins.find((coin) => coin.id === value[1]);

        return `${fromCoin.name}${toCoin.name}` === pair.name;
      });

      dispatch(
        accountsTradesFilterUpdate({
          filter: {
            coinsPairId: coinsPair?.id || -1,
          },
        }),
      );
    } else {
      dispatch(accountsTradesFilterUpdate({ filter: createObject(key, value) }));
    }
  };

  const handleClear = () => {
    setClearAll(!clearAll);
    formMethods.reset({});
    dispatch(accountsTradesFilterClear({}));
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <DateRangePicker
            formMethods={formMethods}
            {...filterFormFields.tradesDate}
            callback={handleFilter}
            filterName={'tradeTime'}
            clearAll={clearAll}
          />
        </div>
        <div className={styles.item}>
          <DualSelect
            formMethods={formMethods}
            {...filterFormFields.tradesPair}
            firstOptions={coinOptions}
            secondOptions={coinOptions}
            callback={handleFilter}
            filterName={'pair'}
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
                clearAll={clearAll}
              />
            </div>

            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.tradesValue}
                {...formMethods.register('tradesValue')}
                className={styles.search}
                callback={handleFilter}
                filterName={'totalPrice'}
                clearAll={clearAll}
              />
            </div>

            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.tradesTotalPrice}
                {...formMethods.register('tradesTotalPrice')}
                className={styles.search}
                callback={handleFilter}
                filterName={'amount'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.tradesValueInBaseCurrency}
                {...formMethods.register('tradesValueInBaseCurrency')}
                className={styles.search}
                callback={handleFilter}
                filterName={'totalPriceInBaseCurrency'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.tradesFee}
                {...formMethods.register('tradesFee')}
                className={styles.search}
                callback={handleFilter}
                filterName={'fees'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.tradesFeeInBaseCurrency}
                {...formMethods.register('tradesFeeInBaseCurrency')}
                className={styles.search}
                callback={handleFilter}
                filterName={'feesInBaseCurrency'}
                clearAll={clearAll}
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
  );
};

export default TradesFilters;