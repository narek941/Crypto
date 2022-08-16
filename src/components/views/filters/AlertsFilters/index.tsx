import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';
import { Controller } from 'react-hook-form';

import DateRangePicker from 'components/shared/DateRangePicker';
import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { createObject } from 'utils/createObject';
import { alertsFilterClear, alertsFilterUpdate } from 'store/alertsSlice/thunks';
import { filterObject } from 'utils/filterObject';
import { alertsSelectors } from 'store/alertsSlice';

import styles from './AlertsFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const AlertsFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const filter = useAppSelector(alertsSelectors.selectAlertsFilter);
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

  const advancedClass = classNames(styles.item, {
    [styles.advanced__hide]: !isMore,
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleClear = () => {
    formMethods.reset({});
    dispatch(alertsFilterClear({}));
    setClearAll(!clearAll);
  };

  const handleFilter = (key: string, value: any) => {
    if (isNull(value)) {
      const obj = filterObject(filter.filter, key);

      dispatch(alertsFilterClear(obj));
    } else {
      if (key === 'account.name') {
        dispatch(alertsFilterUpdate({ search: createObject(key, value) }));
      } else {
        dispatch(alertsFilterUpdate({ filter: createObject(key, value) }));
      }
    }
  };

  useEffect(() => {
    return () => {
      handleClear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <TableSearch
            {...filterFormFields.alertName}
            {...formMethods.register('alertName')}
            className={styles.search}
            callback={handleFilter}
            filterName={'account.name'}
            clearAll={clearAll}
          />
        </div>
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
          <Controller
            control={formMethods.control}
            name={filterFormFields.alertType.name as any}
            render={({ field }) => (
              <Select
                {...filterFormFields.alertType}
                {...field}
                className={styles.select}
                callback={handleFilter}
                filterName={'type'}
              />
            )}
          />
        </div>

        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.alertID}
            {...formMethods.register('alertID')}
            className={styles.search}
            callback={handleFilter}
            filterName={'id'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.alertMessage}
            {...formMethods.register('alertMessage')}
            className={styles.search}
            callback={handleFilter}
            filterName={'message'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
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

export default AlertsFilters;
