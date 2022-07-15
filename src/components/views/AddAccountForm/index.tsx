import 'react-toastify/dist/ReactToastify.css';
import { Controller, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

import { useForm } from 'hooks';
import { Button, Input, Select } from 'components';
import FormWrapper from 'components/forms/FormWrapper';
import FormGroup from 'components/forms/FormGroup';
// import FormErrorBox from 'components/forms/FormErrorBox';

import styles from './AddAccountForm.module.scss';
import { AddAccountFormShape } from './types';
import { addAccountFormFields, addAccountSchemaKeys } from './fields';
import TradeSettings from './TradeSettings';
export interface IAdd {
  onclick: SubmitHandler<AddAccountFormShape>;
}

const AddForm = ({ onclick }: IAdd) => {
  // const [errors] = useState<string[]>([]);
  const { formMethods, handleSubmit, isValid } = useForm<
    keyof AddAccountFormShape,
    AddAccountFormShape
  >({
    schemaKeys: addAccountSchemaKeys,
  });
  const [pairs, setPairs] = useState<{ id: string }[]>([{ id: uuidv4() }]);

  const addPair = () => {
    setPairs([...pairs, { id: uuidv4() }]);
  };

  const removePair = (id: string) => {
    const filteredPairs = pairs.filter((item) => item.id !== id);
    setPairs(filteredPairs);
  };

  return (
    <>
      <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(onclick)}>
        <FormGroup className={styles.form__section}>
          <>
            <div className={styles.form__header}>Basic settings</div>
            <Input {...addAccountFormFields.name} {...formMethods.register('name')} />
            <Controller
              control={formMethods.control}
              name={addAccountFormFields.baseCurrency.name as keyof AddAccountFormShape}
              render={({ field }) => <Select {...addAccountFormFields.baseCurrency} {...field} />}
            />
            <Input
              {...addAccountFormFields.startCapital}
              {...formMethods.register('startCapital')}
            />
          </>
        </FormGroup>
        <FormGroup className={styles.form__section}>
          <>
            <div className={styles.form__header}>Wallet</div>
            <Controller
              control={formMethods.control}
              name={addAccountFormFields.baseCurrency.name as keyof AddAccountFormShape}
              render={({ field }) => <Select {...addAccountFormFields.exchange} {...field} />}
            />
            <Input {...addAccountFormFields.apiKey} {...formMethods.register('apiKey')} />
            <Input {...addAccountFormFields.apiSecret} {...formMethods.register('apiSecret')} />
          </>
        </FormGroup>
        <FormGroup className={styles.form__section}>
          <>
            <div className={styles.form__header}>Trade Settings</div>
            {pairs.map(({ id }) => (
              <React.Fragment key={id}>
                <TradeSettings id={id} removePair={removePair} />
              </React.Fragment>
            ))}
            <div role='button' onClick={addPair} className={styles.form__section__add_button}>
              Add pair
            </div>
          </>
        </FormGroup>
        <FormGroup className={styles.form__section}>
          <>
            <Input {...addAccountFormFields.maxDrawdown} {...formMethods.register('maxDrawdown')} />
            <Input {...addAccountFormFields.maxPosition} {...formMethods.register('maxPosition')} />
            <Input {...addAccountFormFields.maxRisk} {...formMethods.register('maxRisk')} />
            <div className={styles.signIn__form__group__button}>
              <Button type='submit' color='secondary' size='m' disabled={!isValid}>
                SAVE SETTINGS
              </Button>
            </div>
          </>
        </FormGroup>
      </FormWrapper>
    </>
  );
};

export default AddForm;
