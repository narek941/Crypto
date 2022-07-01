import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { ToastContextProvider } from 'context';

import { store } from './libraries';
import { CCPTheme } from './theme';
import { RouterProvider } from './routes';

import './styles/index.global.scss';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={CCPTheme}>
          <ToastContextProvider>
            <RouterProvider />
          </ToastContextProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
