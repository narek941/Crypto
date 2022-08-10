import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ForwardedRef } from 'react';
import _without from 'lodash/without';
import { Chip } from '@mui/material';

import { CancelIcon, CloseIcon } from 'assets/icons';

import styles from './MultipleSelect.module.scss';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const MultipleSelect = React.forwardRef(
  (
    {
      id,
      name,
      error,
      label,

      placeholder,
      options,
      onChange,
      value = [],
    }: //   callback,
    //   filterName,
    //   ...props
    any,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    // const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof options>) => {
      const {
        target: { value },
      } = event;
      onChange(typeof value === 'string' ? value.split(',') : value);
    };

    const handleRemove = (props: any, e: React.MouseEvent) => {
      // eslint-disable-next-line no-console
      console.log(props, value, 'q');
      e.preventDefault();
      onChange(_without(props, value));
    };

    return (
      <div>
        <FormControl sx={{ width: '100% ' }}>
          <label htmlFor={name}>{label}</label>
          <Select
            id={id}
            ref={ref}
            multiple
            placeholder={placeholder}
            value={value}
            name={name}
            error={error}
            onChange={handleChange}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((item: any) => (
                  <Chip
                    key={item}
                    label={item}
                    clickable
                    deleteIcon={<CloseIcon onMouseDown={(event) => event.stopPropagation()} />}
                    // className={classes.chip}
                    onDelete={(e) => handleDelete(e, item)}
                    onClick={() => console.log('clicked chip')}
                  />
                ))}
              </Box>
            )}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  },
);

export default MultipleSelect;
