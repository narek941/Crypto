import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CloseIcon } from 'assets/icons';
import { MultipleSelect } from 'components';
import { useAppDispatch, useForm } from 'hooks';
import { accountsFilterClear, accountsFilterUpdate } from 'store/accountsSlice/thunks';
import { createObject, filterObject } from 'utils';
import { statusOptions } from 'utils/filterHelper';
import RangeSwipe from 'components/shared/Range';
import { accountsActions, accountsSelectors } from 'store/accountsSlice';
import TableSearch from 'components/shared/TableSearch';

import styles from './AccountsFilters.module.scss';
import { FilterFormShape, IAccountsFilterValue } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const AccountsFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { filter } = useSelector(accountsSelectors.selectAccountAccountsList);
  const { id } = useParams();

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);

  const [filterValue, setFilterValue] = useState<IAccountsFilterValue>({
    minRefreshDate: null,
    maxRefreshDate: null,
    minProductivityInPercent: null,
    maxProductivityInPercent: null,
    minEarnedCapitalInPercent: null,
    maxEarnedCapitalInPercent: null,
    minNumberDailyTransactions: null,
    maxNumberDailyTransactions: null,
    minEarnedCapitalInBaseCurrency: null,
    maxEarnedCapitalInBaseCurrency: null,
    minCurrentCapitalInBaseCurrency: null,
    maxCurrentCapitalInBaseCurrency: null,
    maxCurrentOpenProfitInBaseCurrency: null,
    maxStatsStartCapitalInBaseCurrency: null,
    minCurrentOpenProfitInBaseCurrency: null,
    minStatsStartCapitalInBaseCurrency: null,
  });

  const handleToggle = () => setIsMore(!isMore);
  const advancedClass = classNames(styles.item, {
    [styles.advanced__hide]: !isMore,
  });
  const handleClear = () => {
    formMethods.reset({});
    dispatch(accountsFilterClear({}));
    setClearAll(!clearAll);
  };

  const handleFilter = (key: string, value: any) => {
    if (isNull(value)) {
      const obj = filterObject(filter.filter, key);

      dispatch(accountsFilterClear(obj));
    } else {
      if (key === 'name') {
        dispatch(accountsFilterUpdate({ search: createObject(key, value) }));
      } else {
        dispatch(accountsFilterUpdate({ filter: createObject(key, value) }));
      }
    }
  };

  const getFilterValue = async () => {
    const { data } = await dispatch(accountsActions.getAccountsFilterValues(Number(id))).unwrap();
    setFilterValue(data);
  };

  useEffect(() => {
    getFilterValue();
    return () => {
      handleClear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      accountName: '',
      accountStatus: '',
      accountAVGTrades: ['', ''],
      accountId: '',
      accountSeed: ['', ''],
      accountCurrentCapital: ['', ''],
      accountOpenProfit: ['', ''],
      accountEarnedCapital: ['', ''],
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <TableSearch
            {...filterFormFields.accountName}
            {...formMethods.register('accountName')}
            className={styles.search}
            callback={handleFilter}
            filterName={'name'}
            clearAll={clearAll}
          />
        </div>
        <div className={(styles.item, styles.multipleSelect)}>
          <MultipleSelect
            formMethods={formMethods}
            {...filterFormFields.accountStatus}
            className={styles.select}
            callback={handleFilter}
            filterName={'status'}
            options={statusOptions}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.accountAVGTrades.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.accountAVGTrades}
                callback={handleFilter}
                filterName={'statistics.numberDailyTransactions'}
                min={filterValue.minNumberDailyTransactions}
                max={filterValue.maxNumberDailyTransactions}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.accountId}
            {...formMethods.register('accountId')}
            className={styles.search}
            callback={handleFilter}
            filterName={'id'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.accountSeed.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.accountSeed}
                callback={handleFilter}
                filterName={'statistics.startCapitalInBaseCurrency'}
                closed={!isMore}
                min={filterValue.minStatsStartCapitalInBaseCurrency}
                max={filterValue.maxStatsStartCapitalInBaseCurrency}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.accountCurrentCapital.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.accountCurrentCapital}
                callback={handleFilter}
                filterName={'statistics.currentCapitalInBaseCurrency'}
                closed={!isMore}
                min={filterValue.minCurrentCapitalInBaseCurrency}
                max={filterValue.maxCurrentCapitalInBaseCurrency}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.accountOpenProfit.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.accountOpenProfit}
                callback={handleFilter}
                filterName={'statistics.currentOpenProfitInPercent'}
                min={filterValue.minProductivityInPercent}
                max={filterValue.maxProductivityInPercent}
                isPercent={true}
                closed={!isMore}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.accountEarnedCapital.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...filterFormFields.accountEarnedCapital}
                callback={handleFilter}
                filterName={'statistics.earnedCapitalInPercent'}
                min={filterValue.minEarnedCapitalInPercent}
                max={filterValue.maxEarnedCapitalInPercent}
                isPercent={true}
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

export default AccountsFilters;
