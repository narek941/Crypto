import { configureStore } from '@reduxjs/toolkit';
import { createStateSyncMiddleware } from 'redux-state-sync';

import * as reducers from './reducers';

const reduxStateSyncConfig = {};
const store = configureStore({
  reducer: {
    ...reducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createStateSyncMiddleware(reduxStateSyncConfig)),
});

export default store;
