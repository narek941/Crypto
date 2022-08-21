import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import classNames from 'classnames';
import moment from 'moment';
import { Controller } from 'react-hook-form';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { isNull } from 'lodash';

import { useAppSelector, useOnClickOutside } from 'hooks';
import { CalendarIcon, CloseIcon } from 'assets/icons';
import { authSelectors } from 'store/authSlice';

import styles from './DateRangePicker.module.scss';

const DateRangePicker = React.forwardRef<any, any>(
  ({ placeholder, formMethods, name, callback, filterName, clearAll, closed }, ref: any) => {
    const customRef = useRef(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const defaultValue = {
      startDate: undefined,
      endDate: undefined,
      color: 'transparent',
      key: 'selection',
    };
    const [lastChange, setLastChange] = useState<number>(2);

    const [state, setState] = useState(defaultValue);

    const isDarkMode = useAppSelector(authSelectors.selectIsDarkMode);
    const isMode = isDarkMode ? 'rgba(65, 58, 199, 0.15)' : '#e5e5e5';

    const startDay = moment(state.startDate).format('LL');
    const endDay = moment(state.endDate).format('LL');

    const text = state.startDate === undefined ? placeholder : `${startDay} - ${endDay}`;

    const headerTextClass = classNames({
      [styles.calendar__header__placeholder]: !state.startDate,
    });

    const calendarWrapperClass = classNames(styles.calendar__wrapper, {
      [styles.calendar__wrapper__open]: openCalendar,
    });

    const toggleCalendar = () => setOpenCalendar(true);

    const handleCloseCalendar = () => {
      setOpenCalendar(false);
    };

    const handleChange = (item: any) => {
      const start = item.selection.startDate;
      const end = item.selection.endDate;

      if (state.endDate && state.startDate && !isNull(state.startDate)) {
        if (moment(start).isBefore(state.startDate)) {
          setState({ ...state, startDate: start });
          formMethods.setValue(name, state);
          setLastChange(1);
        }
        if (moment(state.endDate).isBefore(end)) {
          setState({ ...state, endDate: end });
          setLastChange(2);
          formMethods.setValue(name, state);
        }
        if (moment(start).isBetween(state.startDate, state.endDate)) {
          if (lastChange === 2) {
            setState({ ...state, endDate: start });
          } else {
            setState({ ...state, startDate: start });
          }
          formMethods.setValue(name, state);
        }
      } else {
        setState({ ...item.selection, color: isMode, lastChange: true });
        formMethods.setValue(name, item.selection);
      }
    };

    const handleSubmit = () => {
      if (
        !isNull(state.endDate) &&
        !isNull(state.endDate) &&
        openCalendar &&
        state.startDate !== undefined
      ) {
        callback(filterName, [state.startDate, state.endDate]);
      }

      setOpenCalendar(false);
    };

    const handleClear = (e?: React.FormEvent<SVGSVGElement>) => {
      e?.stopPropagation();
      setState(defaultValue);
      formMethods.resetField(name);
      callback(filterName, null);
    };

    useEffect(() => {
      if (closed) {
        handleClear();
      }
    }, [closed]);

    useEffect(() => {
      setState(defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearAll]);

    useOnClickOutside(customRef, handleSubmit);

    return (
      <div className={styles.calendar} ref={customRef}>
        <div className={styles.calendar__header} role='button' onClick={toggleCalendar}>
          <span className={headerTextClass}>{text}</span>
          {state.startDate && <CloseIcon onClick={handleClear} />}
          <CalendarIcon />
        </div>
        <div className={calendarWrapperClass}>
          <Controller
            control={formMethods.control}
            name={name as any}
            {...formMethods.register(name)}
            render={() => (
              <DateRange
                ref={ref}
                months={2}
                ranges={[state]}
                weekStartsOn={1}
                showPreview={false}
                direction='horizontal'
                onChange={handleChange}
                moveRangeOnFirstSelection={false}
                weekdayDisplayFormat='EEEEE'
                showMonthAndYearPickers={true}
                className={styles.calendar__inner}
              />
            )}
          />

          <div className={styles.calendar__action}>
            <p className={styles.calendar__action__cancel} onClick={handleCloseCalendar}>
              cancel
            </p>
            <p className={styles.calendar__action__select} onClick={handleSubmit}>
              select
            </p>
          </div>
        </div>
      </div>
    );
  },
);
export default DateRangePicker;
