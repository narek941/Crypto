import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';
import { useParams } from 'react-router-dom';

import { CloseIcon } from 'assets/icons';
import { MultipleSelect, TableSearch } from 'components';
import { createObject } from 'utils/createObject';
import { adminSelectors } from 'store/adminSlice';
import DualSelect from 'components/shared/DualSelect';
import DateRangePicker from 'components/shared/DateRangePicker';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { ordersFilterClear, ordersFilterUpdate } from 'store/walletsSlice/thunks';
import { walletsActions, walletsSelectors } from 'store/walletsSlice';
import { filterObject } from 'utils/filterObject';
import RangeSwipe from 'components/shared/Range';

import styles from './OrdersHistoryFilters.module.scss';
import { FilterFormShape, IAccountOrdersFilterValue } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const OrdersHistoryFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const { filter } = useAppSelector(walletsSelectors.selectOrders);
  const { id } = useParams();

  const { t } = useTranslation();

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [filterValue, setFilterValue] = useState<IAccountOrdersFilterValue>({
    minValue: null,
    maxValue: null,
    minLastOperationTime: null,
    maxLastOperationTime: null,
    minValueInBaseCurrency: null,
    maxValueInBaseCurrency: null,
    minStopPrice: null,
    maxStopPrice: null,
    minLimitPrice: null,
    maxLimitPrice: null,
  });

  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      historyID: '',
      historyValue: ['', ''],
      historyUpdateTime: [undefined, undefined],
      historySide: '',
      historyValueInBaseCurrency: ['', ''],
      searchHistoryStop: ['', ''],
      searchHistoryLimit: ['', ''],
    },
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleFilter = (key: string, value: any) => {
    if (isNull(value)) {
      const newKey = key === 'pair' ? 'coinsPairId' : key;

      const obj = filterObject(filter.filter, newKey as string);

      dispatch(ordersFilterClear(obj));
    } else {
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
    }
  };

  const handleClear = () => {
    setClearAll(!clearAll);
    formMethods.reset({});
    dispatch(ordersFilterClear({}));
  };

  const getFilterValue = async () => {
    const { data } = await dispatch(walletsActions.getRecordsFilterValues(Number(id))).unwrap();
    setFilterValue(data);
  };

  useEffect(() => {
    getFilterValue();
    return () => {
      handleClear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const coinOptions = useMemo(
    () =>
      coins.map((coin) => ({
        label: coin.name,
        value: coin.id,
      })),
    [coins],
  );

  const advancedClass = classNames(styles.item, {
    [styles.advanced__hide]: !isMore,
  });

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

        <div className={(styles.item, styles.multipleSelect)}>
          <MultipleSelect
            formMethods={formMethods}
            {...filterFormFields.historySide}
            callback={handleFilter}
            filterName={'side'}
          />
        </div>
        <div className={(styles.item, styles.multipleSelect)}>
          <MultipleSelect
            formMethods={formMethods}
            {...filterFormFields.historyType}
            callback={handleFilter}
            filterName={'type'}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.historyValue.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.historyValue}
                callback={handleFilter}
                filterName={'value'}
                min={filterValue.minValue}
                max={filterValue.maxValue}
              />
            )}
          />
        </div>

        <div className={styles.item}>
          <DateRangePicker
            formMethods={formMethods}
            {...filterFormFields.historyUpdateTime}
            callback={handleFilter}
            filterName={'lastOperationTime'}
            clearAll={clearAll}
            min={filterValue.minLastOperationTime}
            max={filterValue.maxLastOperationTime}
          />
        </div>

        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.historyID}
            {...formMethods.register('historyID')}
            className={styles.search}
            callback={handleFilter}
            filterName={'originalId'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.historyValueInBaseCurrency.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.historyValueInBaseCurrency}
                callback={handleFilter}
                filterName={'valueInBaseCurrency'}
                min={filterValue.minValueInBaseCurrency}
                max={filterValue.maxValueInBaseCurrency}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.searchHistoryStop.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.searchHistoryStop}
                callback={handleFilter}
                filterName={'stopPrice'}
                min={filterValue.minStopPrice}
                max={filterValue.maxStopPrice}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.searchHistoryLimit.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.searchHistoryLimit}
                callback={handleFilter}
                filterName={'limitPrice'}
                min={filterValue.minLimitPrice}
                max={filterValue.maxLimitPrice}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.searchHistoryModifiers}
            {...formMethods.register('searchHistoryModifiers')}
            className={styles.search}
            callback={handleFilter}
            filterName={'modifiers'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>

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
