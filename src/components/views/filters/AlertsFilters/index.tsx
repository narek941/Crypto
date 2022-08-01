import { useState } from 'react';

import DateRangePicker from 'components/shared/DateRangePicker';
import { CloseIcon } from 'assets/icons';
import { TableSearch } from 'components';
import { FormGroup } from 'components/forms';
import { useAppDispatch, useForm } from 'hooks';
import { accountsAlertsFilterUpdate } from 'store/accountsSlice/thunks';
import { createObject } from 'utils/createObject';

import styles from './AlertsFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const AlertsFilters = () => {
  const dispatch = useAppDispatch();

  const [isMore, setIsMore] = useState(false);

  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      alertType: '',
      alertID: '',
      alertMessage: '',
    },
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleClear = () => formMethods.reset({});

  const handleFilter = (key: string, value: any) => {
    dispatch(accountsAlertsFilterUpdate({ filter: createObject(key, value) }));
  };

  return (
    <FormGroup className={styles.signIn__form__group}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <DateRangePicker
              formMethods={formMethods}
              {...filterFormFields.alertCreationDate}
              callback={handleFilter}
              filterName={'createdAt'}
            />
          </div>

          {isMore && (
            <>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.alertType}
                  {...formMethods.register('alertType')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'type'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.alertID}
                  {...formMethods.register('alertID')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'id'}
                />
              </div>
              <div className={styles.item}>
                <TableSearch
                  {...filterFormFields.alertMessage}
                  {...formMethods.register('alertMessage')}
                  className={styles.search}
                  callback={handleFilter}
                  filterName={'message'}
                />
              </div>
            </>
          )}
          <div className={styles.clear} role='button' onClick={handleClear}>
            <span>Clear All</span>
            <div>
              <CloseIcon />
            </div>
          </div>
        </div>
        <div role='button' onClick={handleToggle} className={styles.toggle}>
          Click Here to {isMore ? 'Hide' : 'Show'} Advanced Filters
        </div>
      </div>
    </FormGroup>
  );
};

export default AlertsFilters;
