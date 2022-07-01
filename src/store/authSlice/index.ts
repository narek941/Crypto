import { createSlice } from '@reduxjs/toolkit';

import { Slice } from '../../types';

import { IAuthState } from './types';

const initialState: IAuthState = {
  token: '',
};

export const authSlice = createSlice({
  name: Slice.Auth,
  initialState,
  reducers: {},
});

export default authSlice.reducer;
