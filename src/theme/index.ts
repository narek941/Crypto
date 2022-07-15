import { red } from '@mui/material/colors';
import { deDE } from '@mui/material/locale';
import { createTheme, Theme } from '@mui/material';

export const CCPTheme: Theme = createTheme(
  {
    typography: {
      fontFamily: ['Roboto'].join(','),
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#1748AF',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#f8f8f8',
        paper: '#ffffff',
      },
    },
  },
  deDE,
);
