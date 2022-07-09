import {SerializedError} from '@reduxjs/toolkit';

import {AuthStates} from './constants';

export type AuthSliceState = {
  accessToken: string;
  loading: AuthStates;
  error?: SerializedError | null;
};

export type UpdateAccessTokenAction = {
  token: string;
};
