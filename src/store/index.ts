import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './reducers';

const store = configureStore({
  reducer: {
    ...reducers,
  },
});

export default store;
