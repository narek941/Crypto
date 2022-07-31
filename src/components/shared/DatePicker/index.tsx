import { forwardRef, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import classNames from 'classnames';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import { CalendarIcon } from 'assets/icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './DatePicker.module.scss';

const DatePicker = forwardRef<any, any>(
  ({ placeholder, formMethods, name, callback, filterName }, ref: any) => {
    const customRef = useRef(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);

    const [state, setState] = useState([
      {
        startDate: undefined,
        endDate: undefined,
        key: 'selection',
      },
    ]);

    const startDay = moment(state[0]?.startDate).format('LL');
    const endDay = moment(state[0]?.endDate).format('LL');

    const text = state[0]?.startDate === undefined ? placeholder : `${startDay} - ${endDay}`;

    const headerTextClass = classNames({
      [styles.calendar__header__placeholder]: !state[0]?.startDate,
    });

    const calendarWrapperClass = classNames(styles.calendar__wrapper, {
      [styles.calendar__wrapper__open]: openCalendar,
    });

    const toggleCalendar = () => setOpenCalendar(!openCalendar);

    const handleCloseCalendar = () => setOpenCalendar(false);

    const handleChange = (item: any) => {
      setState([item.selection]);
      formMethods.setValue(name, item.selection);
    };

    const handleSubmit = () => {
      callback(filterName, [state[0]?.startDate, state[0]?.endDate]);

      toggleCalendar();
    };

    useOnClickOutside(customRef, handleCloseCalendar);

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
