import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DateRangePicker from 'components/shared/DateRangePicker';
import { CloseIcon } from 'assets/icons';
import { TableSearch } from 'components';
import { useAppDispatch, useForm } from 'hooks';
import { accountsAlertsFilterClear, accountsAlertsFilterUpdate } from 'store/accountsSlice/thunks';
import { createObject } from 'utils/createObject';

import styles from './AnalyticsAlertsFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const AnalyticsAlertsFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);
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

  const handleClear = () => {
    formMethods.reset({});
    dispatch(accountsAlertsFilterClear({}));
    setClearAll(!clearAll);
  };

  useEffect(() => {
    return () => {
      handleClear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (key: string, value: any) => {
    dispatch(accountsAlertsFilterUpdate({ filter: createObject(key, value) }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <DateRangePicker
            formMethods={formMethods}
            {...filterFormFields.alertCreationDate}
            callback={handleFilter}
            filterName={'createdAt'}
            clearAll={clearAll}
          />
        </div>

        <div className={styles.item}>
          <TableSearch
            {...filterFormFields.alertType}
            {...formMethods.register('alertType')}
            className={styles.search}
            callback={handleFilter}
            filterName={'type'}
            clearAll={clearAll}
          />
        </div>
        {isMore && (
          <>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.alertID}
                {...formMethods.register('alertID')}
                className={styles.search}
                callback={handleFilter}
                filterName={'id'}
                clearAll={clearAll}
              />
            </div>
            <div className={styles.item}>
              <TableSearch
                {...filterFormFields.alertMessage}
                {...formMethods.register('alertMessage')}
                className={styles.search}
                callback={handleFilter}
                filterName={'message'}
                clearAll={clearAll}
              />
            </div>
          </>
        )}
        <div className={styles.clear} role='button' onClick={handleClear}>
          <span>{t('clear_all')}</span>
          <div>
            <CloseIcon />
          </div>
        </div>
      </div>
      <div role='button' onClick={handleToggle} className={styles.toggle}>
        {isMore ? t('hide_filter_text') : t('show_filter_text')}
      </div>
    </div>
  );
};

export default AnalyticsAlertsFilters;
