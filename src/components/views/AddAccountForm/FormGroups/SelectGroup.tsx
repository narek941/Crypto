import { Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { isString } from 'lodash';
import { Tooltip } from '@mui/material';

import { BinIcon } from 'assets/icons';
import { useAppSelector } from 'hooks';
import { Input, Select } from 'components';
import { adminSelectors } from 'store/adminSlice';

import { addAccountFormFields } from '../fields';
import styles from '../AddAccountForm.module.scss';

export interface ISelectGroup {
  removePair: (id: string) => void;
  id: string;
  secondInput?: 'select' | 'input';
  formMethods: any;
  leftInputName?: string;
  rightInputName?: string;
  index?: number;
}

const SelectGroup = ({
  removePair,
  id,
  index,
  secondInput = 'select',
  formMethods,
  leftInputName,
  rightInputName,
}: ISelectGroup) => {
  const coins = useAppSelector(adminSelectors.selectCoins);
  // const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const currentAlertDestination = formMethods.watch(`alertsDestinations[${index}]`);

  const errorPair = formMethods.formState.errors?.allowedPairs;
  const errorDestination = formMethods.formState.errors?.alertsDestinations;
  // const currentPairTo = formMethods.watch(`allowedPairs[${index}].${rightInputName}.id`);
  // const currentPairFrom = formMethods.watch(`allowedPairs[${index}].${leftInputName}.id`);

  // const allowedPair =
  //   tradingPairs &&
  //   !isUndefined(currentPairFrom) &&
  //   tradingPairs?.some(
  //     (item: any) =>
  //       item?.to?.id === Number(currentPairTo) && item?.from?.id == Number(currentPairFrom),
  //   );

  // useEffect(() => {
  //   if (!allowedPair) {
  //     formMethods.setError(`test`, {
  //       type: 'custom',
  //       message: '* Choose allowed pair to finish adding account',
  //     });
  //   } else {
  //     formMethods.clearErrors('test');
  //   }
  // }, [allowedPair, formMethods]);

  const type = isString(currentAlertDestination?.type)
    ? currentAlertDestination?.type
    : currentAlertDestination?.type.value;
  const isEmailInput = type === 'EMAIL';

  const coinOptions = useMemo(
    () =>
      coins.map((coin: any) => ({
        label: coin.name,
        value: coin.id,
      })),
    [coins],
  );

  return (
    <div>
      <div className={styles.form__section__item}>
        {secondInput === 'select' ? (
          <>
            <Controller
              control={formMethods.control}
              name={`allowedPairs[${index}].${leftInputName}.id` as any}
              render={({ field }) => (
                <Select
                  {...addAccountFormFields.allowedPairs}
                  {...field}
                  options={coinOptions}
                  className={styles.item}
                  withAction={false}
                  error={errorPair?.[`${index}`]?.[`${leftInputName}`]?.id?.message ? true : false}
                  withClear={false}
                />
              )}
            />
            <Controller
              control={formMethods.control}
              name={`allowedPairs[${index}].${rightInputName}.id` as any}
              render={({ field }) => (
                <Select
                  {...addAccountFormFields.allowedPairs}
                  {...field}
                  options={coinOptions}
                  className={styles.item}
                  withAction={false}
                  withClear={false}
                  error={
                    errorPair?.[`${index}`]?.[`${rightInputName}`]?.id?.message ||
                    errorPair?.[`${index}`]?.[`${leftInputName}`]?.id?.message
                      ? true
                      : false
                  }
                />
              )}
            />
          </>
        ) : (
          <>
            <Controller
              control={formMethods.control}
              name={`alertsDestinations[${index}].${leftInputName}` as any}
              render={({ field }) => (
                <Select
                  {...addAccountFormFields.alertsDestinations}
                  {...field}
                  withAction={false}
                  withClear={false}
                  className={styles.item}
                  error={
                    errorDestination?.[`${index}`]?.[`${leftInputName}`]?.message ||
                    errorDestination?.[`${index}`]?.phoneNumber?.message
                      ? true
                      : false
                  }
                />
              )}
            />
            <Controller
              control={formMethods.control}
              name={
                `alertsDestinations[${index}].${
                  isEmailInput ? rightInputName : 'phoneNumber'
                }` as any
              }
              render={({ field }) => (
                <Input
                  {...addAccountFormFields.alertsDestinations}
                  isSmall={true}
                  {...field}
                  className={styles.item}
                  innerClassName={styles.input}
                  placeholder={!type ? '' : isEmailInput ? 'Enter Email' : 'Enter Mobile Number'}
                  type={isEmailInput ? 'email' : 'tel'}
                  error={
                    errorDestination?.[`${index}`]?.[`${leftInputName}`]?.message ||
                    errorDestination?.[`${index}`]?.phoneNumber?.message ||
                    errorDestination?.[`${index}`]?.[`${rightInputName}`]?.message
                      ? true
                      : false
                  }
                />
              )}
            />
          </>
        )}
        <Tooltip followCursor={true} placement='bottom' title='Delete'>
          <BinIcon onClick={() => removePair(id)} className={styles.bin} />
        </Tooltip>
      </div>
      {formMethods.formState.errors && (
        <div>
          {secondInput === 'select' ? (
            <div className={styles['errorMsg']}>
              {errorPair?.[`${index}`]?.[`${leftInputName}`]?.id?.message ||
                errorPair?.[`${index}`]?.[`${rightInputName}`]?.id?.message ||
                formMethods.formState.errors?.test?.message}
            </div>
          ) : (
            <div className={styles['errorMsg']}>
              {errorDestination?.[`${index}`]?.[`${leftInputName}`]?.message ||
                errorDestination?.[`${index}`]?.phoneNumber?.message ||
                errorDestination?.[`${index}`]?.[`${rightInputName}`]?.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectGroup;
