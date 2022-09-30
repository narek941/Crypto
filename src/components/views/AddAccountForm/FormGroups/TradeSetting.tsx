import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FormGroup from 'components/forms/FormGroup';
import { AccessWrapper } from 'components';

import styles from '../AddAccountForm.module.scss';

import SelectGroup from './SelectGroup';

const TradeSetting = ({ formMethods, viewOnly = false }: any) => {
  const { t } = useTranslation();

  const initialPair = {
    from: {},
    to: {},
  };

  const initialDestination = { type: '', emailAddress: '', phoneNumber: '' };

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: 'allowedPairs',
  });

  const {
    fields: alertsDestinationsFields,
    append: appendAlertsDestinations,
    remove: removeAlertsDestinations,
  } = useFieldArray({
    control: formMethods.control,
    name: 'alertsDestinations',
  });

  const addPair = () => {
    append(initialPair);
  };

  const addDestination = () => {
    appendAlertsDestinations(initialDestination);
  };

  const renderAlerts = alertsDestinationsFields.map(({ id }, index) => (
    <SelectGroup
      key={id}
      id={id}
      index={index}
      leftInputName='type'
      rightInputName='emailAddress'
      removePair={() => removeAlertsDestinations(index)}
      secondInput='input'
      formMethods={formMethods}
    />
  ));

  const renderPairs = fields.map(({ id }, index) => (
    <SelectGroup
      key={id}
      id={id}
      index={index}
      viewOnly={viewOnly}
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
          <div className={styles.form__header}>{t('trade_settings')}</div>
          <p className={styles.form__section__item__subtitle}>{t('allowed_pairs')}</p>

          {renderPairs}
          <AccessWrapper>
            <div role='button' onClick={addPair} className={styles.form__section__item__add_button}>
              + {t('add_pair')}
            </div>
          </AccessWrapper>
        </>
      </FormGroup>
      <AccessWrapper>
        <FormGroup className={styles.form__section}>
          <>
            <div className={styles.form__header}>{t('accounts_alerts_destination')}</div>
            {renderAlerts}
            <div
              role='button'
              onClick={addDestination}
              className={styles.form__section__item__add_button}
            >
              + {t('add_destination')}
            </div>
          </>
        </FormGroup>
      </AccessWrapper>
    </>
  );
};

export default TradeSetting;
