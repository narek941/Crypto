import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import classNames from 'classnames';
import moment from 'moment';
import { Controller } from 'react-hook-form';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CalendarIcon, CloseIcon } from 'assets/icons';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useOnClickOutside, useWindowSize } from 'hooks';
import { useRect } from 'hooks/useRect';

import styles from './DatePicker.module.scss';

const DatePicker = React.forwardRef<any, any>(
  ({ placeholder, formMethods, name, label, labelClassName, tooltip }, ref: any) => {
    const { t } = useTranslation();
    const customRef = useRef<HTMLDivElement>(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [state, setState] = useState<string>('');
    const [isElementPositionRight, setIsElementPositionRight] = useState<boolean>(false);

    const day = !state ? placeholder : moment(state).format('LL');

    const text = state === undefined ? placeholder : day;

    const headerTextClass = classNames({
      [styles.calendar__header__placeholder]: !state,
    });

    const labelClasses = classNames(styles.calendar__label, labelClassName);

    const calendarWrapperClass = classNames(styles.calendar__wrapper, {
      [styles.calendar__wrapper__open]: !isElementPositionRight && openCalendar,
      [styles.calendar__wrapper__open__right]: isElementPositionRight && openCalendar,
    });

    const toggleCalendar = () => setOpenCalendar(true);

    const pos = useRect(customRef);
    const width = useWindowSize().width;

    useEffect(() => {
      if (width) {
        if (pos.left + pos.width / 2 < width / 2) {
          setIsElementPositionRight(false);
        } else if (pos.left + pos.width / 2 > width / 2) {
          setIsElementPositionRight(true);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    const handleCloseCalendar = () => setOpenCalendar(false);

    const handleChange = (e: any) => {
      setState(moment(e).toISOString());
    };

    const handleClear = (e?: React.FormEvent<SVGSVGElement>) => {
      e?.stopPropagation();
      setState('');
      formMethods.resetField(name);
    };

    useOnClickOutside(customRef, handleCloseCalendar);

    return (
      <div className={styles.calendar} ref={customRef}>
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
        <div className={styles.calendar__header} role='button' onClick={toggleCalendar}>
          <Tooltip followCursor={true} placement='bottom' title={t(tooltip)}>
            <span className={headerTextClass}>{text}</span>
          </Tooltip>
          {state && <CloseIcon onClick={handleClear} />}
          <CalendarIcon />
        </div>
        <div className={calendarWrapperClass}>
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
        </div>
      </div>
    );
  },
);
export default DatePicker;
