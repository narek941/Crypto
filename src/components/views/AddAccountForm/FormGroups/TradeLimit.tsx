import 'react-toastify/dist/ReactToastify.css';

import { Input } from 'components';
import { FormGroup } from 'components/forms';

import { addAccountFormFields } from '../fields';
import styles from '../AddAccountForm.module.scss';

const TradeLimit = ({ formMethods }: any) => {
  return (
    <FormGroup className={styles.form__section}>
      <>
        <Input {...addAccountFormFields.maxDrawdown} {...formMethods.register('maxDrawdown')} />
        <Input {...addAccountFormFields.maxPosition} {...formMethods.register('maxPosition')} />
        <Input {...addAccountFormFields.maxRisk} {...formMethods.register('maxRisk')} />
      </>
    </FormGroup>
  );
};

export default TradeLimit;
