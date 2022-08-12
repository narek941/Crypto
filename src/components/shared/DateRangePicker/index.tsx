import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import classNames from 'classnames';
import moment from 'moment';
import { Controller } from 'react-hook-form';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useAppSelector, useOnClickOutside } from 'hooks';
import { CalendarIcon, CloseIcon } from 'assets/icons';
import { authSelectors } from 'store/authSlice';

import styles from './DateRangePicker.module.scss';

const DateRangePicker = React.forwardRef<any, any>(
  ({ placeholder, formMethods, name, callback, filterName, clearAll }, ref: any) => {
    const customRef = useRef(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const defaultValue = {
      startDate: undefined,
      endDate: undefined,
      color: 'red',
      key: 'selection',
    };
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
      setState({ ...item.selection, color: isMode });
      formMethods.setValue(name, item.selection);
    };

    const handleSubmit = () => {
      if (state.endDate !== null && state.startDate !== null && openCalendar) {
        callback(filterName, [state.startDate, state.endDate]);
      }

      setOpenCalendar(false);
    };

    const handleClear = (e: React.FormEvent<SVGSVGElement>) => {
      setState(defaultValue);
      callback(filterName, null);
      e.stopPropagation();
    };

    useEffect(() => {
      setState(defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearAll]);

    useOnClickOutside(customRef, handleSubmit);

    return (
      <div className={styles.calendar}>
        <div className={styles.calendar__header} role='button' onClick={toggleCalendar}>
          <span className={headerTextClass}>{text}</span>
          {!state.startDate ? <CalendarIcon /> : <CloseIcon role='button' onClick={handleClear} />}
        </div>
        <div ref={customRef} className={calendarWrapperClass}>
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
                moveRangeOnFirstSelection
                weekdayDisplayFormat='EEEEE'
                retainEndDateOnFirstSelection
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
