import { SerializedError } from '@reduxjs/toolkit';

import { AuthStates } from './constants';

export type AuthSliceState = {
  accessToken: string;
  loading: AuthStates;
  error?: SerializedError | null;
  role: string | null;
  twoFactorAuthEnabled: boolean;
};

export type UpdateAccessTokenAction = {
  token: string;
};
