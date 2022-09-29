import React, { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import classNames from 'classnames';
import moment from 'moment';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import 'react-calendar/dist/Calendar.css';

import { useOnClickOutside, useWindowSize } from 'hooks';
import { ArrowLeft, ArrowRight, CalendarIcon, CloseIcon } from 'assets/icons';
import { useRect } from 'hooks/useRect';

import Typography from '../Typography';

import styles from './DatePicker.module.scss';

const DatePicker = React.forwardRef<any, any>(
  ({ placeholder, formMethods, name, label, field, labelClassName, tooltip, error }, ref: any) => {
    const { t } = useTranslation();
    const customRef = useRef<HTMLDivElement>(null);
    const [openCalendar, setOpenCalendar] = useState<boolean>(false);
    const [isElementPositionRight, setIsElementPositionRight] = useState<boolean>(false);
    const [value, setValue] = useState(field?.field?.value && new Date(field.field.value));

    const day = !value ? placeholder : moment(value).format('LL');

    const text = value === undefined ? placeholder : day;

    const headerTextClass = classNames({
      [styles.calendar__header__placeholder]: !value,
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

    const handleChange = (data: any) => {
      setValue(data);
      // eslint-disable-next-line no-console
      console.log(data, 'sss');
      formMethods.setValue(name, data.toString());
    };
    const handleCloseCalendar = () => setOpenCalendar(false);

    const handleClear = (e?: React.FormEvent<SVGSVGElement>) => {
      e?.stopPropagation();
      formMethods.reset(name);
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
          {value && <CloseIcon onClick={handleClear} />}
          <CalendarIcon />
        </div>
        {error && (
          <Typography type='Small' className={styles.error__text}>
            {error}
          </Typography>
        )}
        <div className={calendarWrapperClass}>
          <Calendar
            className={styles.calendar__inner}
            onChange={handleChange}
            value={value}
            nextLabel={<ArrowRight className={styles.calendar__arrow} />}
            prevLabel={<ArrowLeft className={styles.calendar__arrow} />}
            next2Label={null}
            prev2Label={null}
            inputRef={ref}
            showNeighboringMonth={false}
          />
        </div>
      </div>
    );
  },
);
export default DatePicker;
