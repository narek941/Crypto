import React, { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import classNames from 'classnames';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import { CalendarIcon } from 'assets/icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './DateRangePicker.module.scss';

const DateRangePicker = React.forwardRef<any, any>(
  ({ placeholder, formMethods, name, callback, filterName, clearAll }, ref: any) => {
    const customRef = useRef(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const defaultValue = [
      {
        startDate: undefined,
        endDate: undefined,
        key: 'selection',
      },
    ];

    const [state, setState] = useState(defaultValue);

    useEffect(() => {
      setState(defaultValue);
    }, [clearAll]);

    const startDay = moment(state[0]?.startDate).format('LL');
    const endDay = moment(state[0]?.endDate).format('LL');

    const text = state[0]?.startDate === undefined ? placeholder : `${startDay} - ${endDay}`;

    const headerTextClass = classNames({
      [styles.calendar__header__placeholder]: !state[0]?.startDate,
    });

    const calendarWrapperClass = classNames(styles.calendar__wrapper, {
      [styles.calendar__wrapper__open]: openCalendar,
    });

    const toggleCalendar = () => setOpenCalendar(true);

    const handleCloseCalendar = () => {
      setOpenCalendar(false);
    };

    const handleChange = (item: any) => {
      setState([item.selection]);
      formMethods.setValue(name, item.selection);
    };

    const handleSubmit = () => {
      if (state[0].endDate !== undefined && state[0].endDate !== undefined && openCalendar) {
        callback(filterName, [state[0]?.startDate, state[0]?.endDate]);
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
                className={styles.calendar__inner}
                onChange={handleChange}
                moveRangeOnFirstSelection={true}
                ranges={state}
                months={2}
                ref={ref}
                weekStartsOn={1}
                retainEndDateOnFirstSelection={true}
                weekdayDisplayFormat='EEEEE'
                direction='horizontal'
                showPreview={false}
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
export default DateRangePicker;
