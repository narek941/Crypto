import { Controller } from 'react-hook-form';

import { Select } from 'components';
import { useForm } from 'hooks';
import { BinIcon } from 'assets/icons';

import { addAccountFormFields, addAccountSchemaKeys } from './fields';
import styles from './AddAccountForm.module.scss';
import { AddAccountFormShape } from './types';

export interface ITradeSettings {
  removePair: (id: string) => void;
  id: string;
}

const TradeSettings = ({ removePair, id }: ITradeSettings) => {
  const { formMethods } = useForm<keyof AddAccountFormShape, AddAccountFormShape>({
    schemaKeys: addAccountSchemaKeys,
  });

  return (
    <div>
      <div className={styles.form__section__item}>
        <Controller
          control={formMethods.control}
          name={addAccountFormFields.allowedFirstPairs.name as keyof AddAccountFormShape}
          render={({ field }) => (
            <div className={styles.form__section__item}>
              <Select {...addAccountFormFields.allowedFirstPairs} {...field} />
            </div>
          )}
        />
        <Controller
          control={formMethods.control}
          name={addAccountFormFields.allowedSecondPairs.name as keyof AddAccountFormShape}
          render={({ field }) => <Select {...addAccountFormFields.allowedSecondPairs} {...field} />}
        />
        <BinIcon onClick={() => removePair(id)} />
      </div>
    </div>
  );
};

export default TradeSettings;
