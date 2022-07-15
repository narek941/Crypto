import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import FormGroup from 'components/forms/FormGroup';

import styles from '../AddAccountForm.module.scss';

import SelectGroup from './SelectGroup';

const TradeSetting = ({ formMethods }: any) => {
  const [pairs, setPairs] = useState<{ id: string }[]>([{ id: uuidv4() }]);
  const [destination, setDestination] = useState<{ id: string }[]>([{ id: uuidv4() }]);

  const addPair = () => {
    setPairs([...pairs, { id: uuidv4() }]);
  };
  const addDestination = () => {
    setDestination([...destination, { id: uuidv4() }]);
  };

  const removeDestination = (id: string) => {
    const filteredPairs = destination.filter((item) => item.id !== id);
    setDestination(filteredPairs);
  };
  const removePair = (id: string) => {
    const filteredPairs = pairs.filter((item) => item.id !== id);
    setPairs(filteredPairs);
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
  const renderPairs = pairs.map(({ id }) => (
    <SelectGroup key={id} id={id} removePair={removePair} formMethods={formMethods} />
  ));

  return (
    <>
      <FormGroup className={styles.form__section}>
        <>
          <div className={styles.form__header}>Trade Settings</div>
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
