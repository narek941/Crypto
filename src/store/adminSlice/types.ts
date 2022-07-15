import { SerializedError } from '@reduxjs/toolkit';

import { AdminStates } from './constants';

export type AdminSliceState = {
  accessToken: string;
  loading: AdminStates;
  error?: SerializedError | null;
  role: string | null;
  twoFactorAdminEnabled: boolean;
};

export type UpdateAccessTokenAction = {
  token: string;
};
