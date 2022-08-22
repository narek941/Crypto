import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { isNull } from 'lodash';

import { CloseIcon } from 'assets/icons';
import { Select, TableSearch } from 'components';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { createObject } from 'utils/createObject';
import { statusOptions, AccountTypeOptions } from 'utils/filterHelper';
import { userFilterClear, usersFilterUpdate } from 'store/adminSlice/thunks';
import { filterObject } from 'utils/filterObject';
import { adminSelectors } from 'store/adminSlice';

import styles from './UsersFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const UsersFilters = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { filter } = useAppSelector(adminSelectors.selectUsersFilter);

  const [isMore, setIsMore] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const { formMethods } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      userName: '',
      userStatus: '',
      userId: '',
      userType: '',
      userEmail: '',
    },
  });

  const advancedClass = classNames(styles.item, {
    [styles.advanced__hide]: !isMore,
  });

  const handleToggle = () => setIsMore(!isMore);

  const handleClear = () => {
    formMethods.reset({});
    dispatch(userFilterClear({}));
    setClearAll(!clearAll);
  };

  const handleFilter = (key: string, value: any) => {
    if (isNull(value)) {
      const obj = filterObject(filter, key);
      dispatch(userFilterClear(obj));
    } else {
      if (key === 'username' || key === 'email') {
        dispatch(usersFilterUpdate({ search: createObject(key, value) }));
      } else {
        dispatch(usersFilterUpdate({ filter: createObject(key, value) }));
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
            {...filterFormFields.userName}
            {...formMethods.register('userName')}
            className={styles.search}
            callback={handleFilter}
            filterName={'username'}
            clearAll={clearAll}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.userStatus.name as any}
            render={({ field }) => (
              <Select
                {...filterFormFields.userStatus}
                {...field}
                className={styles.select}
                options={statusOptions}
                callback={handleFilter}
                filterName={'status'}
              />
            )}
          />
        </div>

        <div className={styles.item}>
          <Controller
            control={formMethods.control}
            name={filterFormFields.userType.name as any}
            render={({ field }) => (
              <Select
                {...filterFormFields.userType}
                {...field}
                className={styles.select}
                options={AccountTypeOptions}
                callback={handleFilter}
                filterName={'role'}
              />
            )}
          />
        </div>

        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.userId}
            {...formMethods.register('userId')}
            className={styles.search}
            callback={handleFilter}
            filterName={'id'}
            clearAll={clearAll}
            closed={!isMore}
          />
        </div>
        <div className={advancedClass}>
          <TableSearch
            {...filterFormFields.userEmail}
            {...formMethods.register('userEmail')}
            className={styles.search}
            callback={handleFilter}
            filterName={'email'}
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

export default UsersFilters;
