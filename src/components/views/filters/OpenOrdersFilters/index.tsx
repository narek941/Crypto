import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';

import { CloseIcon } from 'assets/icons';
import RangeSwipe from 'components/shared/Range';
import { MultipleSelect, TableSearch } from 'components';
import { createObject } from 'utils/createObject';
import { adminSelectors } from 'store/adminSlice';
import DualSelect from 'components/shared/DualSelect';
import DateRangePicker from 'components/shared/DateRangePicker';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { openOrdersFilterClear, openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import { walletsSelectors } from 'store/walletsSlice';
import { filterObject } from 'utils/filterObject';

import { FilterFormShape } from './types';
import styles from './OpenOrdersFilters.module.scss';
import { filterFormFields, filterSchemaKeys } from './fields';

const OpenOrdersFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const { filter } = useAppSelector(walletsSelectors.selectOpenOrders);

  const { t } = useTranslation();

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      selectValue: ['', ''],
      selectShare: ['', ''],
      selectSide: '',
      searchID: '',
      searchReceived: ['', ''],
      selectPairEnd: '',
      selectPairStart: '',
      creationDate: [
        {
          startDate: 'undefined',
          endDate: undefined,
          key: 'selection',
        },
      ],
    },
  });

  const advancedClass = classNames(styles.item, {
    [styles.advanced__hide]: !isMore,
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleClear = () => {
    formMethods.reset({});
    dispatch(openOrdersFilterClear({}));
    setClearAll(!clearAll);
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

  const handleFilter = (key: string, value: any) => {
    if (isNull(value)) {
      const newKey = key === 'pair' ? 'coinsPairId' : key;
      const obj = filterObject(filter.filter, newKey as string);
      dispatch(openOrdersFilterClear(obj));
    } else {
      if (key === 'pair') {
        const coinsPair = tradingPairs.find((pair) => {
          const fromCoin = coins.find((coin) => coin.id === value[0]);
          const toCoin = coins.find((coin) => coin.id === value[1]);
          return `${fromCoin.name}${toCoin.name}` === pair.name;
        });

        dispatch(
          openOrdersFilterUpdate({
            filter: {
              coinsPairId: coinsPair?.id || -1,
            },
          }),
        );
      } else {
        dispatch(openOrdersFilterUpdate({ filter: createObject(key, value) }));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <DateRangePicker
            formMethods={formMethods}
            {...filterFormFields.creationDate}
            callback={handleFilter}
            filterName='creationTime'
            clearAll={clearAll}
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
        <div className={(styles.item, styles.multipleSelect)}>
          <MultipleSelect
            formMethods={formMethods}
            {...filterFormFields.selectSide}
            callback={handleFilter}
            filterName={'side'}
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

        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.searchID}
            {...formMethods.register('searchID')}
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
            name={filterFormFields.searchReceived.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.searchReceived}
                callback={handleFilter}
                filterName={'tradesTotalPriceSum'}
                closed={!isMore}
              />
            )}
          />
        </div>

        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.selectShare.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.selectShare}
                callback={handleFilter}
                filterName={'relativePercentageToAccount'}
                closed={!isMore}
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

export default OpenOrdersFilters;
