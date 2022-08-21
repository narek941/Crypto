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
  const currentAlertDestination = formMethods.watch(`alertsDestinations[${index}]`);
  const type = isString(currentAlertDestination?.type)
    ? currentAlertDestination?.type
    : currentAlertDestination?.type.value;
  const isEmailInput = type === 'EMAIL';
  // const { t } = useTranslation();

  const coinOptions = useMemo(
    () =>
      coins.map((coin) => ({
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
                  withAction={false}
                  error={formMethods.formState.errors.allowedPairs?.message}
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
                  withAction={false}
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
                  error={formMethods.formState.errors.alertsDestinations?.message}
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
                  placeholder={!type ? '' : isEmailInput ? 'Enter Email' : 'Enter Mobile Number'}
                  type={isEmailInput ? 'email' : 'tel'}
                />
              )}
            />
          </>
        )}
        <Tooltip followCursor={true} placement='bottom' title='Delete'>
          <BinIcon onClick={() => removePair(id)} className={styles.bin} />
        </Tooltip>
      </div>
    </div>
  );
};

export default SelectGroup;
