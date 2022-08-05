import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

import store from 'store';

import { RouterProvider } from './routes';

import './styles/index.global.scss';

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <RouterProvider />
  </Provider>
);

export default App;
