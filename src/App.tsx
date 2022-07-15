import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';

import store from 'store';
import { ToastContextProvider } from 'context';

import { CCPTheme } from './theme';
import { RouterProvider } from './routes';

import './styles/index.global.scss';

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <ThemeProvider theme={CCPTheme}>
      <ToastContextProvider>
        <RouterProvider />
      </ToastContextProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
