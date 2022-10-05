import React from 'react';
import { TextField } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import styles from './TimePicker.module.scss';

const TimePickerComponent = React.forwardRef<any, any>(
  ({ name, label, value, onChange }, ref: any) => {
    // const toggleCalendar = () => setOpenCalendar(true);

    // const handleChange = (value: any, keyboardInputValue: string) => {
    //   pnc(value);
    //   // eslint-disable-next-line no-console
    //   console.log(value, keyboardInputValue, 'sss');
    //   formMethods.setValue(name, value.toString());
    // };

    return (
      <div className={styles.calendar}>
        <label className={styles.calendar__label} htmlFor={name}>
          {label}
        </label>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileTimePicker
            className={styles.calendar__picker}
            // closeOnSelect={true}

            value={value}
            inputRef={ref}
            onChange={(value: any, keyboardInputValue?: string) => {
              // eslint-disable-next-line no-console
              console.log(value, keyboardInputValue);
              onChange(value);
            }}
            renderInput={(params: any) => <TextField name={name} {...params} />}
          />
        </LocalizationProvider>
      </div>
    );
  },
);
export default TimePickerComponent;
