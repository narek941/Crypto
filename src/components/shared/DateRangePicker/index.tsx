import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
import { isNull } from 'lodash';

import { useAppSelector, useOnClickOutside, useWindowSize } from 'hooks';
import { CalendarIcon, CloseIcon } from 'assets/icons';
import { authSelectors } from 'store/authSlice';
import { addDays } from 'utils';
import { useRect } from 'hooks/useRect';

import styles from './DateRangePicker.module.scss';
import { IDateRangePicker } from './types';

const DateRangePicker = React.forwardRef<IDateRangePicker, any>(
  (
    { placeholder, formMethods, name, callback, filterName, clearAll, closed, min, max },
    ref: any,
  ) => {
    const defaultValue = {
      startDate: undefined,
      endDate: undefined,
      color: 'transparent',
      key: 'selection',
    };
    const customRef = useRef<HTMLDivElement>(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [lastChange, setLastChange] = useState<number>(2);
    const [state, setState] = useState(defaultValue);
    const [isElementPositionRight, setIsElementPositionRight] = useState<boolean>(false);

    const isDarkMode = useAppSelector(authSelectors.selectIsDarkMode);
    const isMode = isDarkMode ? 'rgba(65, 58, 199, 0.15)' : '#e5e5e5';
    const startDay = moment(state.startDate).format('LL');
    const endDay = moment(state.endDate).format('LL');
    const text = state.startDate === undefined ? placeholder : `${startDay} - ${endDay}`;

    const headerTextClass = classNames({
      [styles.calendar__header__placeholder]: !state.startDate,
    });

    const calendarWrapperClass = classNames(styles.calendar__wrapper, {
      [styles.calendar__wrapper__open]: !isElementPositionRight && openCalendar,
      [styles.calendar__wrapper__open__right]: isElementPositionRight && openCalendar,
    });

    const toggleCalendar = () => setOpenCalendar(true);

    const pos = useRect(customRef);
    const width = useWindowSize().width;
    const minDate = isNull(min) ? undefined : new Date(min);
    const maxDate = isNull(max) ? undefined : new Date(max);

    useEffect(() => {
      if (width) {
        if (pos.left + pos.width / 2 < width / 2) {
          setIsElementPositionRight(false);
        } else if (pos.left + pos.width / 2 > width / 2) {
          setIsElementPositionRight(true);
        }
      }
    }, [width]);

    const handleChange = (item: any) => {
      const start = item.selection.startDate;
      const end = item.selection.endDate;
      if (state.endDate && state.startDate && !isNull(state.startDate)) {
        if (moment(start).isBefore(state.startDate)) {
          setState({ ...state, startDate: start });
          formMethods.setValue(name, state);
          setLastChange(1);
        }
        if (moment(end).isAfter(state.endDate)) {
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
        callback(filterName, [
          addDays(moment(state.startDate).toISOString(), 1),
          addDays(moment(state.endDate).toISOString(), 1),
        ]);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                editableDateInputs={true}
                showMonthAndYearPickers={true}
                direction='horizontal'
                onChange={handleChange}
                minDate={minDate}
                maxDate={maxDate}
                moveRangeOnFirstSelection={false}
                weekdayDisplayFormat='EEEEE'
                className={styles.calendar__inner}
              />
            )}
          />

          <div className={styles.calendar__action}>
            {/* <p className={styles.calendar__action__cancel} onClick={handleCloseCalendar}>
              cancel
            </p> */}
            <p className={styles.calendar__action__select} onClick={handleSubmit}>
              apply
            </p>
          </div>
        </div>
      </div>
    );
  },
);
export default DateRangePicker;
