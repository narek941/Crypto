import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { isNull } from 'lodash';
import { useParams } from 'react-router-dom';

import { CloseIcon } from 'assets/icons';
import { MultipleSelect } from 'components';
import { createObject } from 'utils/createObject';
import { adminSelectors } from 'store/adminSlice';
import { walletsActions, walletsSelectors } from 'store/walletsSlice';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { filterObject } from 'utils/filterObject';
import RangeSwipe from 'components/shared/Range';

import styles from './WalletsFilters.module.scss';
import { FilterFormShape, IAccountRecordsFilterValue } from './types';
import { filterSchemaKeys, walletFilterFormFields } from './fields';

const WalletsFilters = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { filter } = useAppSelector(walletsSelectors.selectRecords);
  const coins = useAppSelector(adminSelectors.selectCoins);
  const [clearAll, setClearAll] = useState(false);
  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      selectWalletAsset: undefined,
      searchWalletValue: ['', ''],
      searchWalletValueInBaseCurrency: ['', ''],
    },
  });
  const [filterValue, setFilterValue] = useState<IAccountRecordsFilterValue>({
    minValue: null,
    maxValue: null,
    minBaseCurrencyValue: null,
    maxBaseCurrencyValue: null,
  });

  const handleClear = () => {
    formMethods.reset({});
    dispatch(walletsActions.recordsFilterClear({}));
    setClearAll(!clearAll);
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

  const handleFilter = (key: string, value: any) => {
    if (isNull(value)) {
      const obj = filterObject(filter.filter, key);

      dispatch(walletsActions.recordsFilterClear(obj));
    } else {
      dispatch(walletsActions.recordsFilterUpdate({ filter: createObject(key, value) }));
    }
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
        <div className={(styles.item, styles.multipleSelect)}>
          <MultipleSelect
            formMethods={formMethods}
            {...walletFilterFormFields.selectWalletAsset}
            callback={handleFilter}
            filterName={'coinId'}
            options={coinOptions}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={walletFilterFormFields.searchWalletValue.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...walletFilterFormFields.searchWalletValue}
                callback={handleFilter}
                filterName={'value'}
                min={filterValue.minValue}
                max={filterValue.maxValue}
              />
            )}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={walletFilterFormFields.searchWalletValueInBaseCurrency.name as any}
            render={({ field }) => (
              <RangeSwipe
                {...field}
                {...walletFilterFormFields.searchWalletValueInBaseCurrency}
                callback={handleFilter}
                filterName={'baseCurrencyValue'}
                min={filterValue.minBaseCurrencyValue}
                max={filterValue.maxBaseCurrencyValue}
              />
            )}
          />
        </div>

        <div className={styles.clear} role='button' onClick={handleClear}>
          <span>Clear All</span>
          <div>
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletsFilters;
