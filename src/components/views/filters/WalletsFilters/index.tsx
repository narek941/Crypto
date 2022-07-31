import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { RootState } from 'types';
import { walletsActions } from 'store/walletsSlice';
import { createObject } from 'utils/createObject';

import styles from './WalletsFilters.module.scss';
import { FilterFormShape } from './types';
import { filterSchemaKeys, walletFilterFormFields } from './fields';

const WalletsFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      selectWalletAsset: undefined,
      searchWalletValue: '',
      searchWalletValueInBaseCurrency: '',
    },
  });

  const handleClear = () => formMethods.reset({});

  const handleFilter = (key: string, value: any) => {
    dispatch(walletsActions.recordsFilterUpdate({ filter: createObject(key, value) }));
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
    <FormGroup className={styles.signIn__form__group}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <Controller
              control={formMethods.control}
              name={walletFilterFormFields.selectWalletAsset.name as any}
              render={({ field }) => (
                <Select
                  {...walletFilterFormFields.selectWalletAsset}
                  {...field}
                  className={styles.select}
                  options={coinOptions}
                  callback={handleFilter}
                  filterName={'coin'}
                />
              )}
            />
          </div>

          <div className={styles.item}>
            <TableSearch
              {...walletFilterFormFields.searchWalletValue}
              {...formMethods.register('searchWalletValue')}
              className={styles.search}
              callback={handleFilter}
              filterName={'value'}
            />
          </div>

          <div className={styles.item}>
            <TableSearch
              {...walletFilterFormFields.searchWalletValueInBaseCurrency}
              {...formMethods.register('searchWalletValueInBaseCurrency')}
              className={styles.search}
              callback={handleFilter}
              filterName={'valueInBaseCurrency'}
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
    </FormGroup>
  );
};

export default WalletsFilters;
