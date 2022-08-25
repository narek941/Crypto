import React, { useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import classNames from 'classnames';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import { CalendarIcon } from 'assets/icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useOnClickOutside } from 'hooks';

import styles from './DatePicker.module.scss';

const DatePicker = React.forwardRef<any, any>(
  ({ placeholder, formMethods, name, callback, filterName }, ref: any) => {
    const customRef = useRef(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const [state, setState] = useState<string>('');

    const day = !state ? placeholder : moment(state).format('LL');

    const headerTextClass = classNames({
      [styles.calendar__header__placeholder]: !state,
    });

    const calendarWrapperClass = classNames(styles.calendar__wrapper, {
      [styles.calendar__wrapper__open]: openCalendar,
    });

    const toggleCalendar = () => setOpenCalendar(!openCalendar);

    const handleCloseCalendar = () => setOpenCalendar(false);

    const handleChange = (e: any) => {
      setState(moment(e).toISOString());
    };

    const handleSubmit = () => {
      callback(filterName, state);

      toggleCalendar();
    };

    useOnClickOutside(customRef, handleCloseCalendar);

    return (
      <div className={styles.calendar}>
        <div className={styles.calendar__header} role='button' onClick={toggleCalendar}>
          <span className={headerTextClass}>{day}</span>
          <CalendarIcon />
        </div>
        <div ref={customRef} className={calendarWrapperClass}>
          <Controller
            control={formMethods.control}
            name={name as any}
            {...formMethods.register(name)}
            render={() => (
              <Calendar
                className={styles.calendar__inner}
                onChange={(item) => handleChange(item)}
                date={new Date()}
                ref={ref}
                weekStartsOn={1}
                weekdayDisplayFormat='EEEEE'
              />
            )}
          />

          <div className={styles.calendar__action}>
            <div className={styles.calendar__action__cancel} onClick={handleCloseCalendar}>
              cancel
            </div>
            <div className={styles.calendar__action__select} onClick={handleSubmit}>
              select
            </div>
          </div>
        </div>
      </div>
    );
  },
);
export default DatePicker;
