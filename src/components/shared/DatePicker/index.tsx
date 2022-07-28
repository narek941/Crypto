import React, { useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import classNames from 'classnames';

import { CalendarIcon } from 'assets/icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import useOnClickOutside from 'hooks/useOutsideClick';

import styles from './DatePicker.module.scss';

import moment from 'moment';

const DatePicker = ({ placeholder = 'Choose creation date' }: any) => {
  const ref = useRef(null);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [state, setState] = useState([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const sD = moment(state[0]?.startDate).format('LL');
  const eD = moment(state[0]?.endDate).format('LL');
  // eslint-disable-next-line no-console
  console.log(state, sD, eD);
  const text = state[0]?.startDate ? `${sD} - ${eD}` : placeholder;
  const calendarWrapperClass = classNames(styles.calendar__wrapper, {
    [styles.calendar__wrapper__open]: openCalendar,
  });

  const toggleCalendar = () => setOpenCalendar(!openCalendar);

  const handleCloseCalendar = () => setOpenCalendar(false);

  useOnClickOutside(ref, handleCloseCalendar);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header} role='button' onClick={toggleCalendar}>
        <span>{text}</span>
        <CalendarIcon />
      </div>
      <div ref={ref} className={calendarWrapperClass}>
        <DateRange
          className={styles.calendar__inner}
          onChange={(item: any) => setState([item.selection])}
          moveRangeOnFirstSelection={true}
          ranges={state}
          months={2}
          weekStartsOn={1}
          retainEndDateOnFirstSelection={true}
          weekdayDisplayFormat='EEEEE'
          direction='horizontal'
        />
        <div className={styles.calendar__action}>
          <div className={styles.calendar__action__cancel} onClick={handleCloseCalendar}>
            cancel
          </div>
          <div className={styles.calendar__action__select} onClick={toggleCalendar}>
            select
          </div>
        </div>
      </div>
    </div>
  );
};
export default DatePicker;
