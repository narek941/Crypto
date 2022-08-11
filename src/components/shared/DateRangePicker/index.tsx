import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import classNames from 'classnames';
import moment from 'moment';
import { Controller } from 'react-hook-form';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { CalendarIcon } from 'assets/icons';
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './DateRangePicker.module.scss';

const DateRangePicker = React.forwardRef<any, any>(
  ({ placeholder, formMethods, name, callback, filterName, clearAll }, ref: any) => {
    const customRef = useRef(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const defaultValue = {
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    };

    const [state, setState] = useState(defaultValue);

    useEffect(() => {
      setState(defaultValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearAll]);

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
      setState(item.selection);
      formMethods.setValue(name, item.selection);
    };

    const handleSubmit = () => {
      if (state.endDate !== undefined && state.endDate !== undefined && openCalendar) {
        callback(filterName, [state.startDate, state.endDate]);
      }

      setOpenCalendar(false);
    };

    useOnClickOutside(customRef, handleSubmit);

    return (
      <div className={styles.calendar}>
        <div className={styles.calendar__header} role='button' onClick={toggleCalendar}>
          <span className={headerTextClass}>{text}</span>
          <CalendarIcon />
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
                weekdayDisplayFormat='EEEEE'
                moveRangeOnFirstSelection={true}
                className={styles.calendar__inner}
                retainEndDateOnFirstSelection={true}
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
