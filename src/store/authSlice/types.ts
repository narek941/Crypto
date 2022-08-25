import { SerializedError } from '@reduxjs/toolkit';

export type AuthSliceState = {
  accessToken: string;
  loading: boolean;
  error?: SerializedError | null;
  role: string | null;
  twoFactorAuthEnabled: boolean;
  isDarkMode: boolean;
  isEnglish: boolean;
  personalInfo?: any;
};

export type UpdateAccessTokenAction = {
  token: string;
};
