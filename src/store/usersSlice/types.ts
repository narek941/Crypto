import { SerializedError } from '@reduxjs/toolkit';

import { UserStates } from './constants';

export type UsersSliceState = {
  loading: UserStates;
  error?: SerializedError | null;
};
