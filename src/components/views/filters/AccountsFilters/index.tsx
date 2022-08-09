import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { useAppDispatch, useForm } from 'hooks';
import { accountsFilterClear, accountsFilterUpdate } from 'store/accountsSlice/thunks';
import { createObject } from 'utils/createObject';
import { statusOptions } from 'utils/filterHelper';
import RangeSwipe from 'components/shared/Range';

import styles from './AccountsFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const AccountsFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      accountName: '',
      accountStatus: '',
      accountAVGTrades: [undefined, undefined],
      accountId: '',
      accountSeed: [undefined, undefined],
      accountCurrentCapital: [undefined, undefined],
      accountOpenProfit: [undefined, undefined],
      accountEarnedCapital: [undefined, undefined],
    },
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleClear = () => {
    formMethods.reset({});
    dispatch(accountsFilterClear({}));
    setClearAll(!clearAll);
  };

  const handleFilter = (key: string, value: any) => {
    if (key === 'name') {
      dispatch(accountsFilterUpdate({ search: createObject(key, value) }));
    } else {
      dispatch(accountsFilterUpdate({ filter: createObject(key, value) }));
    }
  };

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
        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.accountStatus.name as any}
            render={({ field }) => (
              <Select
                {...filterFormFields.accountStatus}
                {...field}
                className={styles.select}
                options={statusOptions}
                callback={handleFilter}
                filterName={'status'}
              />
            )}
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
              />
            )}
          />
        </div>
        {isMore && (
          <>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.accountId}
                {...formMethods.register('accountId')}
                className={styles.search}
                callback={handleFilter}
                filterName={'id'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.accountSeed.name as any}
                render={({ field }) => (
                  <RangeSwipe
                    {...field}
                    {...filterFormFields.accountSeed}
                    callback={handleFilter}
                    filterName={'statistics.startCapitalInBaseCurrency'}
                  />
                )}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.accountCurrentCapital.name as any}
                render={({ field }) => (
                  <RangeSwipe
                    {...field}
                    {...filterFormFields.accountCurrentCapital}
                    callback={handleFilter}
                    filterName={'statistics.currentCapitalInBaseCurrency'}
                  />
                )}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.accountOpenProfit.name as any}
                render={({ field }) => (
                  <RangeSwipe
                    {...field}
                    {...filterFormFields.accountOpenProfit}
                    callback={handleFilter}
                    filterName={'statistics.currentOpenProfitInBaseCurrency'}
                  />
                )}
              />
            </div>
            <div className={styles.item}>
              <Controller
                control={formMethods.control}
                name={filterFormFields.accountEarnedCapital.name as any}
                render={({ field }) => (
                  <RangeSwipe
                    {...field}
                    {...filterFormFields.accountEarnedCapital}
                    callback={handleFilter}
                    filterName={'statistics.earnedCapitalInBaseCurrency'}
                  />
                )}
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

export default AccountsFilters;
