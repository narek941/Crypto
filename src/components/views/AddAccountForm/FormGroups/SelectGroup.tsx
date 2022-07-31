import { Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { isString } from 'lodash';

import { Input, Select } from 'components';
import { BinIcon } from 'assets/icons';
import { useAppSelector } from 'hooks';
import { RootState } from 'types';

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
  const coins = useAppSelector((state: RootState) => state.admin.coins);
  const currentAlertDestination = formMethods.watch(`alertsDestinations[${index}]`);
  const type = isString(currentAlertDestination?.type)
    ? currentAlertDestination?.type
    : currentAlertDestination?.type.value;
  const isEmailInput = type === 'EMAIL';

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
                  multiple={true}
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
                  multiple={true}
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
                <Select {...addAccountFormFields.alertsDestinations} {...field} multiple={true} />
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

        <BinIcon onClick={() => removePair(id)} className={styles.bin} />
      </div>
    </div>
  );
};

export default SelectGroup;
