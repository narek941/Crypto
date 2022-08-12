import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';

import { CloseIcon } from 'assets/icons';
import RangeSwipe from 'components/shared/Range';
import { Select, TableSearch } from 'components';
import { createObject } from 'utils/createObject';
import { adminSelectors } from 'store/adminSlice';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { inflowFilterClear, inflowFilterUpdate } from 'store/walletsSlice/thunks';
import { walletsSelectors } from 'store/walletsSlice';
import { filterObject } from 'utils/filterObject';

import styles from './InflowsFilters.module.scss';
import { InflowsFilterFormShape } from './types';
import { inflowFilterFormFields, inflowFilterSchemaKeys } from './fields';

const InflowsFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector(adminSelectors.selectCoins);
  const { filter } = useAppSelector(walletsSelectors.selectInflow);

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);

  const { formMethods } = useForm<keyof InflowsFilterFormShape, InflowsFilterFormShape>({
    mode: 'onChange',
    schemaKeys: inflowFilterSchemaKeys,
    defaultValues: {
      searchInflowID: '',
      selectInflowValueInBaseCurrency: ['', ''],
      selectInflowValue: ['', ''],
      selectInflowAsset: '',
      selectInflowType: '',
    },
  });
  const { t } = useTranslation();

  const handleToggle = () => setIsMore(!isMore);

  const handleClear = () => {
    formMethods.reset({});
    dispatch(inflowFilterClear({}));
    setClearAll(!clearAll);
  };

  const advancedClass = classNames(styles.item, {
    [styles.advanced__hide]: !isMore,
  });

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
      const obj = filterObject(filter.filter, key);

      dispatch(inflowFilterClear(obj));
    } else {
      dispatch(inflowFilterUpdate({ filter: createObject(key, value) }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={inflowFilterFormFields.selectInflowType.name as any}
            render={({ field }) => (
              <Select
                {...inflowFilterFormFields.selectInflowType}
                {...field}
                className={styles.select}
                callback={handleFilter}
                filterName={'type'}
              />
            )}
          />
        </div>
        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={inflowFilterFormFields.selectInflowAsset.name as any}
            render={({ field }) => (
              <Select
                {...inflowFilterFormFields.selectInflowAsset}
                {...field}
                className={styles.select}
                options={coinOptions}
                callback={handleFilter}
                filterName={'coinId'}
              />
            )}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={inflowFilterFormFields.selectInflowValue.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...inflowFilterFormFields.selectInflowValue}
                callback={handleFilter}
                filterName={'value'}
              />
            )}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...formMethods.register('searchInflowID')}
            className={styles.search}
            callback={handleFilter}
            placeholder={'Enter ID'}
            filterName={'id'}
            clearAll={clearAll}
          />
        </div>
        <div className={advancedClass}>
          <Controller
            control={formMethods.control}
            name={inflowFilterFormFields.selectInflowValueInBaseCurrency.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...inflowFilterFormFields.selectInflowValueInBaseCurrency}
                callback={handleFilter}
                filterName={'baseCurrencyValue'}
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

export default InflowsFilters;
