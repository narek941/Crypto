import { useMemo, useState } from 'react';

import DatePicker from 'components/shared/DatePicker';
import { CloseIcon } from 'assets/icons';
import { TableSearch } from 'components';
import { FormGroup, FormWrapper } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm } from 'hooks';
import { openOrdersFilterUpdate } from 'store/walletsSlice/thunks';
import { clearNullAndUndefinedFromObj } from 'utils/clearObject';
import { RootState } from 'types';

import styles from './AlertsFilters.module.scss';
import { FilterFormShape } from './types';
import { filterFormFields, filterSchemaKeys } from './fields';

const AlertsFilters = () => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state: RootState) => state.admin.coins);

  const [isMore, setIsMore] = useState(false);

  const { formMethods, handleSubmit } = useForm<keyof FilterFormShape, FilterFormShape>({
    mode: 'onChange',
    schemaKeys: filterSchemaKeys,
    defaultValues: {
      alertType: '',
      alertID: '',
      alertMessage: '',
    },
  });
  // const { isDirty, isValid } = formMethods.formState;
  // const watch = formMethods.watch();

  // eslint-disable-next-line no-console
  // console.log(isDirty, watch, isValid);

  const handleToggle = () => setIsMore(!isMore);

  const handleClick = (values: any) => {
    const filter = clearNullAndUndefinedFromObj({
      creationTime: [
        values?.selectAlertCreationDate?.startDate,
        values?.selectAlertCreationDate?.endDate,
      ],
      type: values?.alertType,
      id: values?.alertID,
      message: values?.alertMessage,
    });

    // eslint-disable-next-line no-console
    console.log(values);

    dispatch(
      openOrdersFilterUpdate({
        filter,
      }),
    );
  };

  const handleClear = () => formMethods.reset({});

  const coinOptions = useMemo(
    () =>
      coins.map((coin) => ({
        label: coin.name,
        value: coin.id,
      })),
    [coins],
  );

  return (
    <FormWrapper {...{ formMethods }} onSubmit={handleSubmit(handleClick)}>
      <FormGroup className={styles.signIn__form__group}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.item}>
              <DatePicker formMethods={formMethods} {...filterFormFields.alertCreationDate} />
            </div>

            {isMore && (
              <>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.alertType}
                    {...formMethods.register('alertType')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.alertID}
                    {...formMethods.register('alertID')}
                    className={styles.search}
                  />
                </div>
                <div className={styles.item}>
                  <TableSearch
                    {...filterFormFields.alertMessage}
                    {...formMethods.register('alertMessage')}
                    className={styles.search}
                  />
                </div>
              </>
            )}
            <button className={styles.clear} type='submit' onClick={handleClick}>
              <span>Clear All</span>
              <div>
                <CloseIcon />
              </div>
            </button>
          </div>
          <div role='button' onClick={handleToggle} className={styles.toggle}>
            Click Here to {isMore ? 'Hide' : 'Show'} Advanced Filters
          </div>
        </div>
      </FormGroup>
    </FormWrapper>
  );
};

export default AlertsFilters;
