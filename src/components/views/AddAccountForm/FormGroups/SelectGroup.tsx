import { Controller } from 'react-hook-form';

import { Input, Select } from 'components';
import { BinIcon } from 'assets/icons';

import { addAccountFormFields } from '../fields';
import { AddAccountFormShape } from '../types';
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
  return (
    <div>
      <div className={styles.form__section__item}>
        {secondInput === 'select' ? (
          <>
            <Controller
              control={formMethods.control}
              name={`allowedPairs[${index}].${leftInputName}.id` as any}
              render={({ field }) => (
                <Select {...addAccountFormFields.allowedPairs} {...field} multiple={true} />
              )}
            />
            <Controller
              control={formMethods.control}
              name={`allowedPairs[${index}].${rightInputName}.id` as any}
              render={({ field }) => (
                <Select {...addAccountFormFields.allowedPairs} {...field} multiple={true} />
              )}
            />
          </>
        ) : (
          <>
            <Controller
              control={formMethods.control}
              name={(addAccountFormFields.alertKey.name + id) as keyof AddAccountFormShape}
              render={({ field }) => (
                <Select {...addAccountFormFields.alertKey} {...field} multiple={true} />
              )}
            />
            <Input {...addAccountFormFields.alertValue} isSmall={true} />
          </>
        )}

        <BinIcon onClick={() => removePair(id)} className={styles.bin} />
      </div>
    </div>
  );
};

export default SelectGroup;
