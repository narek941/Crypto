import { configureStore } from '@reduxjs/toolkit';

import * as reducers from '../../store';

export const store = configureStore({
  reducer: {
    ...reducers,
  },
});
