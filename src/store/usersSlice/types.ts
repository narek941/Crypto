import { SerializedError } from '@reduxjs/toolkit';

export type UsersSliceState = {
  loading: boolean;
  error?: SerializedError | null | any;
  personalInfo?: any;
};
