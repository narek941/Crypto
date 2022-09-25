import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { DateRange } from 'react-date-range';
import { Controller } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { isNull } from 'lodash';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';

import { ExportIcon } from 'assets/icons';
import { FormWrapper } from 'components/forms';
import { useAppDispatch, useAppSelector, useForm, useOnClickOutside } from 'hooks';
import { authSelectors } from 'store/authSlice';
import { Button, Input, Menu } from 'components';
import periodOptions from 'constants/export';
import { IAccountTradesFilterValue } from 'components/views/filters/TradesFilters/types';
import { accountsActions } from 'store/accountsSlice';
import exportVariantList from 'constants/export/exportVariantList';

import styles from './Export.module.scss';
import { exportSchemaKeys } from './fields';
import { DateState, ExportFormShape, ExportType, IExport } from './types';

const Export = ({ className, text = 'export', callback }: IExport): JSX.Element => {
  const isDarkMode: boolean = useAppSelector(authSelectors.selectIsDarkMode);

  const isMode: string = isDarkMode ? 'rgba(65, 58, 199, 0.15)' : '#e5e5e5';

  const defaultValue: DateState = {
    startDate: moment().subtract(1, 'months').toDate(),
    endDate: moment().toDate(),
    color: isMode,
    key: 'selection',
  };
  const customRef = useRef(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();

  const [filterValue, setFilterValue] = useState<IAccountTradesFilterValue>({
    minTradeTime: null,
    maxTradeTime: null,
    minPrice: null,
    maxPrice: null,
    minTotalPrice: null,
    maxTotalPrice: null,
    minTotalPriceInBaseCurrency: null,
    maxTotalPriceInBaseCurrency: null,
    minAmount: null,
    maxAmount: null,
    minFees: null,
    maxFees: null,
    minFeesInBaseCurrency: null,
    maxFeesInBaseCurrency: null,
  });
  const [state, setState] = useState<DateState>(defaultValue);
  const [name, setName] = useState<string>('');

  const [format, setFormat] = useState<string>(ExportType.pdf);

  const [lastChange, setLastChange] = useState<number>(2);
  const { t } = useTranslation();
  const { formMethods } = useForm<keyof ExportFormShape, ExportFormShape>({
    schemaKeys: exportSchemaKeys,
  });
  let startDay: string = moment(state.startDate).format('LL');
  let endDay: string = moment(state.endDate).format('LL');

  const exportClass: string = classNames(styles.export, className);

  const handleChange = (item: any) => {
    const start = item.selection.startDate;
    const end = item.selection.endDate;
    if (state.endDate && state.startDate && !isNull(state.startDate)) {
      if (moment(start).isBefore(state.startDate)) {
        setState({ ...state, startDate: start });
        formMethods.setValue('exportDate', state);
        setLastChange(1);
      }
      if (moment(end).isAfter(state.endDate)) {
        setState({ ...state, endDate: end });
        setLastChange(2);
        formMethods.setValue('exportDate', state);
      }
      if (moment(start).isBetween(state.startDate, state.endDate)) {
        if (lastChange === 2) {
          setState({ ...state, endDate: start });
        } else {
          setState({ ...state, startDate: start });
        }
        formMethods.setValue('exportDate', state);
      }
      if (moment(start).isSame(state.startDate, 'day') && moment(start).isSame(end, 'day')) {
        setState({ ...state, endDate: start });
        setLastChange(2);
      }
      if (moment(end).isSame(state.endDate, 'day') && moment(end).isSame(start, 'day')) {
        setState({ ...state, startDate: end });
        setLastChange(1);
      }
    } else {
      setState({ ...item.selection, color: isMode, lastChange: 2 });
      formMethods.setValue('exportDate', item.selection);
    }
    startDay = moment(state.startDate).format('LL');
    endDay = moment(state.endDate).format('LL');
  };

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  const handleOptions = (id: number) => {
    switch (id) {
      case 1:
        setState({
          ...state,
          startDate: moment().toDate(),
          endDate: moment().toDate(),
        });
        formMethods.setValue('exportDate', state);

        break;
      case 2:
        setState({
          ...state,
          startDate: moment().subtract(7, 'days').toDate(),
          endDate: moment().toDate(),
        });
        formMethods.setValue('exportDate', state);

        break;
      case 3:
        setState({
          ...state,
          startDate: moment().subtract(1, 'months').toDate(),
          endDate: moment().toDate(),
        });
        formMethods.setValue('exportDate', state);

        break;
      case 4:
        setState({
          ...state,
          startDate: moment().subtract(1, 'year').toDate(),
          endDate: moment().toDate(),
        });
        formMethods.setValue('exportDate', state);

        break;
      default:
        break;
    }
  };

  const getFilterValue = async () => {
    const { data } = await dispatch(
      accountsActions.getAccountTradesFilterValues(Number(id)),
    ).unwrap();
    setFilterValue(data);
  };

  useEffect(() => {
    getFilterValue();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOnClickOutside(customRef, () => setIsOpen(false));

  return (
    <div className={exportClass}>
      <div role='button' onClick={() => setIsOpen(true)} className={styles.export__item}>
        <Tooltip followCursor={true} placement='bottom' title={t('export_tooltip')}>
          <ExportIcon />
        </Tooltip>
        <span className={styles.export__text}>{text}</span>
      </div>
      {isOpen && (
        <FormWrapper {...{ formMethods }} onSubmit={() => {}}>
          <div className={styles.export__popup} ref={customRef}>
            <h2 className={styles.export__popup__title}>{t('export_data')}</h2>
            <div className={styles.export__popup__name}>
              <Input
                value={name}
                onChange={handleInputChange}
                label={t('enter_name')}
                className={styles.export__popup__name__input}
                labelClassName={styles.export__popup__name__title}
              />
            </div>
            <h3 className={styles.export__popup__subtitle}>{t('choose_date')}</h3>
            <div className={styles.export__popup__calendar__inner}>
              <div className={styles.export__popup__calendar__inner__input}>
                <label
                  className={styles.export__popup__calendar__inner__input__label}
                  htmlFor='rangeFrom'
                >
                  {t('start_date')}
                </label>
                <input
                  id='rangeFrom'
                  type='day'
                  value={startDay}
                  {...formMethods.register('exportDateEnd')}
                />
              </div>
              <div className={styles.export__popup__calendar__middle}> {t('to')}</div>
              <div className={styles.export__popup__calendar__inner__input}>
                <label
                  className={styles.export__popup__calendar__inner__input__label}
                  htmlFor='rangeTo'
                >
                  {t('end_date')}
                </label>
                <input
                  id='rangeTo'
                  type='day'
                  value={endDay}
                  {...formMethods.register('exportDateStart')}
                />
              </div>
              <Menu options={periodOptions} callback={handleOptions} />
            </div>
            <div className={styles.export__popup__calendar}>
              <div className={styles.export__popup__calendar__picker}>
                <Controller
                  control={formMethods.control}
                  {...formMethods.register('exportDate')}
                  render={() => (
                    <DateRange
                      months={2}
                      ranges={[state]}
                      weekStartsOn={1}
                      showPreview={false}
                      direction='horizontal'
                      // calendarFocus='backwards'
                      onChange={handleChange}
                      weekdayDisplayFormat='EEEEE'
                      showMonthAndYearPickers={true}
                      className={styles.calendar__inner}
                      minDate={new Date(filterValue.minTradeTime)}
                      maxDate={new Date()}
                    />
                  )}
                />
              </div>
            </div>
            <div className={styles.export__popup__footer__text}>{t('choose_format')}</div>
            <div className={styles.export__popup__footer__button__wrapper}>
              {exportVariantList.map(({ id, type, label }) => (
                <div
                  key={id}
                  className={styles.export__popup__footer__button}
                  onClick={() => setFormat(type)}
                >
                  <ExportIcon
                    className={classNames(styles.export__popup__footer__button__icon, {
                      [styles.export__popup__footer__button__icon__disable]: format !== type,
                    })}
                  />
                  <span
                    className={classNames(styles.export__popup__footer__button__text, {
                      [styles.export__popup__footer__button__text__disable]: format !== type,
                    })}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.export__popup__footer__download}>
              <Button
                onClick={() =>
                  callback({
                    fromDate: moment.utc(state.startDate).toISOString(),
                    toDate: moment.utc(state.endDate).toISOString(),
                    type: format,
                    filename: name,
                  })
                }
                disabled={name === ''}
                color='secondary'
                size='s'
              >
                {t('download')}
              </Button>
            </div>
          </div>
        </FormWrapper>
      )}
    </div>
  );
};

export default Export;
