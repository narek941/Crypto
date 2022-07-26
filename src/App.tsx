import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';

import store from 'store';

import { TeroxxTheme } from './theme';
import { RouterProvider } from './routes';

import './styles/index.global.scss';

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <ThemeProvider theme={TeroxxTheme}>
      <RouterProvider />
    </ThemeProvider>
  </Provider>
);

export default App;
