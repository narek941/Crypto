import { Controller } from 'react-hook-form';
import { isString } from 'lodash';
import { Tooltip } from '@mui/material';

import { BinIcon } from 'assets/icons';
import { useAppSelector } from 'hooks';
import { AccessWrapper, Input, Select } from 'components';
import { adminSelectors } from 'store/adminSlice';
import { createOptions } from 'utils/createOptions';

import { addAccountFormFields } from '../fields';
import styles from '../AddAccountForm.module.scss';
import { ISelectGroup } from '../types';

const SelectGroup = ({
  removePair,
  id,
  index,
  formMethods,
  leftInputName,
  rightInputName,
  viewOnly = false,
  secondInput = 'select',
}: ISelectGroup) => {
  const coins = useAppSelector(adminSelectors.selectCoins);
  // const tradingPairs = useAppSelector(adminSelectors.selectTradingPairs);
  const currentAlertDestination = formMethods.watch(`alertsDestinations[${index}]`);

  const errorPair = formMethods.formState.errors?.allowedPairs;
  const errorDestination = formMethods.formState.errors?.alertsDestinations;
  const type = isString(currentAlertDestination?.type)
    ? currentAlertDestination?.type
    : currentAlertDestination?.type?.value;
  const isEmailInput = type === 'EMAIL';

  const isOneOfValue = type === 'EMAIL' || type === 'SMS' || type === 'TELEGRAM';

  const coinOptions = createOptions(coins);

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
                  viewOnly={viewOnly}
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
                  viewOnly={viewOnly}
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
                  viewOnly={viewOnly}
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
                  {...field}
                  isSmall={true}
                  className={styles.item}
                  innerClassName={styles.input}
                  type={isEmailInput ? 'email' : 'tel'}
                  viewOnly={viewOnly}
                  {...addAccountFormFields.alertsDestinations}
                  placeholder={
                    !isOneOfValue ? '' : isEmailInput ? 'Enter Email' : 'Enter Mobile Number'
                  }
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
        <AccessWrapper>
          <Tooltip followCursor={true} placement='bottom' title='Delete'>
            <BinIcon onClick={() => removePair(id)} className={styles.bin} />
          </Tooltip>
        </AccessWrapper>
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
