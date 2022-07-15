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
}

const SelectGroup = ({ removePair, id, secondInput = 'select', formMethods }: ISelectGroup) => {
  return (
    <div>
      <div className={styles.form__section__item}>
        {secondInput === 'select' ? (
          <>
            <Controller
              control={formMethods.control}
              name={(addAccountFormFields.allowedFirstPairs.name + id) as keyof AddAccountFormShape}
              render={({ field }) => (
                <Select {...addAccountFormFields.allowedFirstPairs} {...field} multiple={true} />
              )}
            />
            <Controller
              control={formMethods.control}
              name={
                (addAccountFormFields.allowedSecondPairs.name + id) as keyof AddAccountFormShape
              }
              render={({ field }) => (
                <Select {...addAccountFormFields.allowedSecondPairs} {...field} multiple={true} />
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
