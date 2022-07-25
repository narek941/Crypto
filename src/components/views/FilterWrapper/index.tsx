import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import styles from './FilterWrapper.module.scss';
const FilterWrapper = () => {
  const [value, setValue] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  return (
    <div className={styles.wrapper}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          toolbarPlaceholder='Select Time'
          inputFormat='MM/dd/yyyy'
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default FilterWrapper;
