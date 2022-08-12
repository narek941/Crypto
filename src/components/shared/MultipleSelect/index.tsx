import * as React from 'react';
import { ForwardedRef, useRef } from 'react';
import { Chip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { CloseIcon } from 'assets/icons';

import styles from './MultipleSelect.module.scss';

const MultipleSelect = React.forwardRef(
  (
    { id, name, error, label, placeholder, options, onChange, value = [] }: any,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const handleChange = (event: SelectChangeEvent<typeof options>) => {
      const {
        target: { value },
      } = event;
      onChange(typeof value === 'string' ? value.split(',') : value);
    };

    const selectRef = useRef(null);

    const handleRemove = (event: React.MouseEvent, props: any) => {
      const filteredSelected = value.filter((item: string) => item !== props);
      event.preventDefault();
      onChange(
        typeof filteredSelected === 'string' ? filteredSelected.split(',') : filteredSelected,
      );
    };

    return (
      <div className={styles.select}>
        <label htmlFor={name} className={styles.select__label}>
          {label}
        </label>

        <Select
          id={id}
          ref={ref}
          multiple
          value={value}
          name={name}
          displayEmpty
          error={error}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <div className={styles.select__chip__wrapper}>
              {selected.length === 0 ? (
                <div className={styles.select__placeholder}>{placeholder}</div>
              ) : (
                selected.map((item: any) => (
                  <Chip
                    key={item}
                    label={item}
                    clickable
                    deleteIcon={
                      <CloseIcon
                        className={styles.select__chip__icon}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    className={styles.select__chip}
                    onDelete={(e) => handleRemove(e, item)}
                  />
                ))
              )}
            </div>
          )}
        >
          {options.map(({ label }: any) => (
            <MenuItem key={label} value={label} disableRipple ref={selectRef}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {error && <span className={styles['select-errorMsg']}>{error}</span>}
      </div>
    );
  },
);

export default MultipleSelect;
