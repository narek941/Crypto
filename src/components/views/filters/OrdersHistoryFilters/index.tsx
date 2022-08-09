import { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { createObject } from 'utils/createObject';
import { adminSelectors } from 'store/adminSlice';
import DualSelect from 'components/shared/DualSelect';
import DateRangePicker from 'components/shared/DateRangePicker';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { ordersFilterClear, ordersFilterUpdate } from 'store/walletsSlice/thunks';

import styles from './OrdersHistoryFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const OrdersHistoryFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const { t } = useTranslation();

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);

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
    if (key === 'pair') {
      const coinsPair = tradingPairs.find((pair) => {
        const fromCoin = coins.find((coin) => coin.id === value[0]);
        const toCoin = coins.find((coin) => coin.id === value[1]);

        return `${fromCoin.name}${toCoin.name}` === pair.name;
      });

      dispatch(
        ordersFilterUpdate({
          filter: {
            coinsPairId: coinsPair?.id || -1,
          },
        }),
      );
    } else {
      dispatch(ordersFilterUpdate({ filter: createObject(key, value) }));
    }
  };

  const handleClear = () => {
    setClearAll(!clearAll);
    formMethods.reset({});
    dispatch(ordersFilterClear({}));
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
          <DualSelect
            formMethods={formMethods}
            {...filterFormFields.historyPair}
            firstOptions={coinOptions}
            secondOptions={coinOptions}
            callback={handleFilter}
            filterName={'pair'}
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
            clearAll={clearAll}
          />
        </div>

        <div className={styles.item}>
          <DateRangePicker
            formMethods={formMethods}
            {...filterFormFields.historyUpdateTime}
            callback={handleFilter}
            filterName={'lastOperationTime'}
            clearAll={clearAll}
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
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.historyValueInBaseCurrency}
                {...formMethods.register('historyValueInBaseCurrency')}
                className={styles.search}
                callback={handleFilter}
                filterName={'valueInBaseCurrency'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.searchHistoryStop}
                {...formMethods.register('searchHistoryStop')}
                className={styles.search}
                callback={handleFilter}
                filterName={'stopPrice'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.searchHistoryLimit}
                {...formMethods.register('searchHistoryLimit')}
                className={styles.search}
                callback={handleFilter}
                filterName={'limitPrice'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.searchHistoryModifiers}
                {...formMethods.register('searchHistoryModifiers')}
                className={styles.search}
                callback={handleFilter}
                filterName={'modifiers'}
                clearAll={clearAll}
              />
            </div>
          </>
        )}
        <div className={styles.clear} role='button' onClick={handleClear}>
          <span>{t('clear_all')}</span>
          <div>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div role='button' onClick={handleToggle} className={styles.toggle}>
        {isMore ? t('hide_filter_text') : t('show_filter_text')}
      </div>
    </div>
  );
};

export default OrdersHistoryFilters;
