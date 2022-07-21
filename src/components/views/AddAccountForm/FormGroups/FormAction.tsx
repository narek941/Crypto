import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Switch } from '@mui/material';

import { Button } from 'components';
import FormGroup from 'components/forms/FormGroup';
import { Routes } from 'types';

import styles from '../AddAccountForm.module.scss';
import { addAccountFormFields } from '../fields';

const FormAction = ({ formMethods, isValid }: any) => {
  const [firstCheckbox, setFirstCheckbox] = useState<boolean>(false);
  const [secondCheckbox, setSecondCheckbox] = useState<boolean>(false);

  const firstCheckboxTextClass = classNames(styles.checkbox__text, {
    [styles.disable]: !firstCheckbox,
  });
  const secondCheckboxTextClass = classNames(styles.checkbox__text, {
    [styles.disable]: !secondCheckbox,
  });

  const firstHandleChange = () => setFirstCheckbox(!firstCheckbox);
  const secondHandleChange = () => setSecondCheckbox(!secondCheckbox);

  return (
    <FormGroup>
      <>
        <div className={styles.form__action}>
          <div className={styles.form__action__item}>
            <p className={firstCheckboxTextClass}>Stop-loss-order required</p>
            <Switch
              {...addAccountFormFields.stopLossOrder}
              checked={firstCheckbox}
              {...formMethods.register('stopLossOrder')}
              onChange={firstHandleChange}
            />
          </div>
          <div className={styles.form__action__item}>
            <p className={secondCheckboxTextClass}>Wrong currency alert required</p>
            <Switch
              className={styles.switch}
              {...addAccountFormFields.wrongCurrencyAlert}
              {...formMethods.register('wrongCurrencyAlert')}
              checked={secondCheckbox}
              onChange={secondHandleChange}
            />
          </div>

          <div className={styles.form__buttons}>
            <Link to={Routes.Accounts} className={styles.form__buttons__cancel}>
              Cancel
            </Link>
            <Button
              className={styles.form__buttons__submit}
              type='submit'
              color='secondary'
              size='l'
              disabled={!isValid}
            >
              SAVE SETTINGS
            </Button>
          </div>
        </div>
      </>
    </FormGroup>
  );
};

export default FormAction;
