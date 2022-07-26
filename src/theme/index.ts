import { red } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material';

export const TeroxxTheme: Theme = createTheme({
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
});
