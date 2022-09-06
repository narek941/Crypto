import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';

import DateRangePicker from 'components/shared/DateRangePicker';
import { CloseIcon } from 'assets/icons';
import { TableSearch } from 'components';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { createObject, filterObject } from 'utils';
import { alertsFilterClear, alertsFilterUpdate } from 'store/alertsSlice/thunks';
import { alertsActions, alertsSelectors } from 'store/alertsSlice';
import MultipleSelect from 'components/shared/MultipleSelect';

import styles from './AlertsFilters.module.scss';
import { FilterFormShape, IAlertsFilterValue } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const AlertsFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const filter = useAppSelector(alertsSelectors.selectAlertsFilter);
  const [isMore, setIsMore] = useState<boolean>(false);

  const [clearAll, setClearAll] = useState<boolean>(false);
  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      alertType: '',
      alertID: '',
      alertMessage: '',
    },
  });
  const [filterValue, setFilterValue] = useState<IAlertsFilterValue>({
    minCreatedAt: null,
    maxCreatedAt: null,
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
  const getFilterValue = async () => {
    const { data } = await dispatch(alertsActions.getAlertsFilterValue()).unwrap();
    setFilterValue(data);
  };

  useEffect(() => {
    getFilterValue();
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
            min={filterValue.minCreatedAt}
            max={filterValue.maxCreatedAt}
          />
        </div>

        <div className={(styles.item, styles.multipleSelect)}>
          <MultipleSelect
            formMethods={formMethods}
            {...filterFormFields.alertType}
            className={styles.select}
            callback={handleFilter}
            filterName={'type'}
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
