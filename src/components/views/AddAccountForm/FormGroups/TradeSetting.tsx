import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

import FormGroup from 'components/forms/FormGroup';

import styles from '../AddAccountForm.module.scss';

import SelectGroup from './SelectGroup';

const TradeSetting = ({ formMethods }: any) => {
  const initialPair = {
    from: {
      id: uuidv4(),
    },
    to: {
      id: uuidv4(),
    },
  };
  const initialDestination = { id: uuidv4(), type: '', emailAddress: '', phoneNumber: '' };
  const [destination, setDestination] = useState<
    { id: string; type: string; emailAddress?: string; phoneNumber?: string }[]
  >([initialDestination]);
  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'allowedPairs',
  });

  const addPair = () => {
    append(initialPair);
  };

  const addDestination = () => {
    setDestination([...destination, initialDestination]);
  };

  const removeDestination = (id: string) => {
    const filteredPairs = destination.filter((item) => item.id !== id);

    setDestination(filteredPairs);
  };

  const renderAlerts = destination.map(({ id }) => (
    <SelectGroup
      key={id}
      id={id}
      removePair={removeDestination}
      secondInput='input'
      formMethods={formMethods}
    />
  ));
  const renderPairs = fields.map(({ id }, index) => (
    <SelectGroup
      key={id}
      id={id}
      index={index}
      leftInputName='from'
      rightInputName='to'
      formMethods={formMethods}
      removePair={() => remove(index)}
    />
  ));

  return (
    <>
      <FormGroup className={styles.form__section}>
        <>
          <div className={styles.form__header}>Trade Settings</div>
          <p className={styles.form__section__item__subtitle}>Allowed Pairs</p>

          {renderPairs}
          <div role='button' onClick={addPair} className={styles.form__section__item__add_button}>
            + Add pair
          </div>
        </>
      </FormGroup>
      <FormGroup className={styles.form__section}>
        <>
          <div className={styles.form__header}>Account Alerts Destination</div>
          {renderAlerts}
          <div
            role='button'
            onClick={addDestination}
            className={styles.form__section__item__add_button}
          >
            + ADD DESTINATION
          </div>
        </>
      </FormGroup>
    </>
  );
};

export default TradeSetting;
