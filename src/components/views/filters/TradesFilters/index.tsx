import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';

import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { adminSelectors } from 'store/adminSlice';
import { createObject } from 'utils/createObject';
import DualSelect from 'components/shared/DualSelect';
import DateRangePicker from 'components/shared/DateRangePicker';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { accountsTradesFilterClear, accountsTradesFilterUpdate } from 'store/accountsSlice/thunks';
import { accountsSelectors } from 'store/accountsSlice';
import { filterObject } from 'utils/filterObject';

import styles from './TradesFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const TradesFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const { filter } = useAppSelector(accountsSelectors.selectAccountAccountsTrades);
  const { t } = useTranslation();

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

  useEffect(() => {
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

        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.tradesPrice}
            {...formMethods.register('tradesPrice')}
            className={styles.search}
            callback={handleFilter}
            filterName={'price'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>

        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.tradesValue}
            {...formMethods.register('tradesValue')}
            className={styles.search}
            callback={handleFilter}
            filterName={'totalPrice'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>

        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.tradesTotalPrice}
            {...formMethods.register('tradesTotalPrice')}
            className={styles.search}
            callback={handleFilter}
            filterName={'amount'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.tradesValueInBaseCurrency}
            {...formMethods.register('tradesValueInBaseCurrency')}
            className={styles.search}
            callback={handleFilter}
            filterName={'totalPriceInBaseCurrency'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.tradesFee}
            {...formMethods.register('tradesFee')}
            className={styles.search}
            callback={handleFilter}
            filterName={'fees'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.tradesFeeInBaseCurrency}
            {...formMethods.register('tradesFeeInBaseCurrency')}
            className={styles.search}
            callback={handleFilter}
            filterName={'feesInBaseCurrency'}
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

export default TradesFilters;
