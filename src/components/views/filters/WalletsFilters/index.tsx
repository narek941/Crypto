import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { FormGroup, FormWrapper } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { clearNullAndUndefinedFromObj } from 'utils/clearObject';
import { RootState } from 'types';
import { walletsActions } from 'store/walletsSlice';

import styles from './WalletsFilters.module.scss';
import { FilterFormShape } from './types';
import { filterSchemaKeys, walletFilterFormFields } from './fields';

const WalletsFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const { formMethods, handleSubmit } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      selectWalletAsset: undefined,
      searchWalletValue: '',
      searchWalletValueInBaseCurrency: '',
    },
  });

  const handleClick = (values: any) => {
    const filter = clearNullAndUndefinedFromObj({
      coin: values?.selectWalletAsset,
      value: values?.searchWalletValue,
      baseCurrencyValue: values?.searchWalletValueInBaseCurrency,
    });

    // eslint-disable-next-line no-console
    console.log(values);

    dispatch(walletsActions.recordsFilterUpdate({ filter }));
  };

  const handleClear = () => formMethods.reset({});

  const coinOptions = useMemo(
    () =>
      coins.map((coin) => ({
        label: coin.name,
        value: coin.id,
      })),
    [coins],
  );

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleClick)}>
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
                  />
                )}
              />
            </div>

            <div className={styles.item}>
              <TableSearch
                {...walletFilterFormFields.searchWalletValue}
                {...formMethods.register('searchWalletValue')}
                className={styles.search}
              />
            </div>

            <div className={styles.item}>
              <TableSearch
                {...walletFilterFormFields.searchWalletValueInBaseCurrency}
                {...formMethods.register('searchWalletValueInBaseCurrency')}
                className={styles.search}
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
    </FormWrapper>
  );
};

export default WalletsFilters;
