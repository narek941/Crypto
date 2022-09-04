import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';
import { useParams } from 'react-router-dom';

import { CloseIcon } from 'assets/icons';
import { MultipleSelect } from 'components';
import { adminSelectors } from 'store/adminSlice';
import { createObject } from 'utils/createObject';
import DualSelect from 'components/shared/DualSelect';
import DateRangePicker from 'components/shared/DateRangePicker';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { accountsTradesFilterClear, accountsTradesFilterUpdate } from 'store/accountsSlice/thunks';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import { filterObject } from 'utils/filterObject';
import RangeSwipe from 'components/shared/Range';

import styles from './TradesFilters.module.scss';
import { FilterFormShape, IAccountTradesFilterValue } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const TradesFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const { filter } = useAppSelector(accountsSelectors.selectAccountAccountsTrades);
  const { t } = useTranslation();
  const { id } = useParams();

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [filterValue, setFilterValue] = useState<IAccountTradesFilterValue>({
    minTradeTime: null,
    maxTradeTime: null,
    minPrice: null,
    maxPrice: null,
    minTotalPrice: null,
    maxTotalPrice: null,
    minTotalPriceInBaseCurrency: null,
    maxTotalPriceInBaseCurrency: null,
    minAmount: null,
    maxAmount: null,
    minFees: null,
    maxFees: null,
    minFeesInBaseCurrency: null,
    maxFeesInBaseCurrency: null,
  });
  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      tradesPrice: ['', ''],
      tradesValue: ['', ''],
      tradesTotalPrice: ['', ''],
      tradesValueInBaseCurrency: ['', ''],
      tradesFee: ['', ''],
      tradesFeeInBaseCurrency: ['', ''],
      tradesSide: '',
    },
  });

  const advancedClass = classNames(styles.item, {
    [styles.advanced__hide]: !isMore,
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleFilter = (key: string, value: any) => {
    if (isNull(value)) {
      const newKey = key === 'pair' ? 'coinsPairId' : key;
      const obj = filterObject(filter.filter, newKey as string);
      dispatch(accountsTradesFilterClear(obj));
    } else {
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
    }
  };

  const handleClear = () => {
    setClearAll(!clearAll);
    formMethods.reset({});
    dispatch(accountsTradesFilterClear({}));
  };

  const getFilterValue = async () => {
    const { data } = await dispatch(
      accountsActions.getAccountTradesFilterValues(Number(id)),
    ).unwrap();
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
            min={filterValue.minTradeTime}
            max={filterValue.maxTradeTime}
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

        <div className={(styles.item, styles.multipleSelect)}>
          <MultipleSelect
            formMethods={formMethods}
            {...filterFormFields.tradesSide}
            callback={handleFilter}
            filterName={'side'}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.tradesPrice.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.tradesPrice}
                callback={handleFilter}
                filterName={'price'}
                min={filterValue.minPrice}
                max={filterValue.maxPrice}
              />
            )}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.tradesTotalPrice.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.tradesTotalPrice}
                callback={handleFilter}
                filterName={'amount'}
                min={filterValue.minAmount}
                max={filterValue.maxAmount}
              />
            )}
          />
        </div>

        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.tradesValue.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.tradesValue}
                callback={handleFilter}
                filterName={'totalPrice'}
                min={filterValue.minTotalPrice}
                max={filterValue.maxTotalPrice}
              />
            )}
          />
        </div>

        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.tradesValueInBaseCurrency.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.tradesValueInBaseCurrency}
                callback={handleFilter}
                filterName={'totalPriceInBaseCurrency'}
                min={filterValue.minTotalPriceInBaseCurrency}
                max={filterValue.maxTotalPriceInBaseCurrency}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.tradesFee.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.tradesFee}
                callback={handleFilter}
                filterName={'fees'}
                min={filterValue.minFees}
                max={filterValue.maxFees}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.tradesFeeInBaseCurrency.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.tradesFeeInBaseCurrency}
                callback={handleFilter}
                filterName={'feesInBaseCurrency'}
                min={filterValue.minFeesInBaseCurrency}
                max={filterValue.maxFeesInBaseCurrency}
              />
            )}
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

export default TradesFilters;
