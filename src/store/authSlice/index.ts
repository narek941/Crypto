import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { BrowserStorageKeys, BrowserStorageService } from 'services';

import * as authThunks from './thunks';
import { AuthStates } from './constants';
import { AuthSliceState, UpdateAccessTokenAction } from './types';

const isEng =
  BrowserStorageService.get(BrowserStorageKeys.Language) === 'en' ||
  BrowserStorageService.get(BrowserStorageKeys.Language, { session: true }) === 'en';

const internalInitialState: AuthSliceState = {
  role: '',
  error: null,
  loading: AuthStates.IDLE,
  twoFactorAuthEnabled: false,
  isDarkMode: false,
  accessToken:
    BrowserStorageService.get(BrowserStorageKeys.AccessToken) ||
    BrowserStorageService.get(BrowserStorageKeys.AccessToken, { session: true }) ||
    '',

  isEnglish: isEng,
};

const authSlice = createSlice({
  name: Slice.Auth,
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<UpdateAccessTokenAction>) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(authThunks.signIn.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authThunks.userInfoRequest.fulfilled, (state, action) => {
      state.personalInfo = action.payload.personalInfo;
    });

    builder.addCase(authThunks.signIn.fulfilled, (state, action) => {
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.loading = AuthStates.IDLE;
      state.role = action.payload.role;
      state.twoFactorAuthEnabled = action.payload.twoFactorAuthEnabled;
    });
    builder.addCase(authThunks.signIn.rejected, (state, action: PayloadAction<any>) => {
      state.loading = AuthStates.IDLE;
      state.error = action.payload.error;
    });

    builder.addCase(authThunks.signOut.pending, (state) => {
      state.loading = AuthStates.LOADING;
    });
    builder.addCase(authThunks.signOut.fulfilled, () => ({
      ...internalInitialState,
      accessToken: '',
    }));
    builder.addCase(authThunks.signOut.rejected, (state, action) => {
      state.loading = AuthStates.IDLE;
      state.error = action.error;
    });
    builder.addCase(authThunks.setDarkTheme, (state) => {
      state.isDarkMode = true;
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
    });
    builder.addCase(authThunks.setLightTheme, (state) => {
      state.isDarkMode = false;
      document.querySelector('body')?.setAttribute('data-theme', 'light');
    });
    builder.addCase(authThunks.setTheme, (state) => {
      state.isDarkMode = !state.isDarkMode;
      const activeTheme = state.isDarkMode ? 'dark' : 'light';
      document.querySelector('body')?.setAttribute('data-theme', activeTheme);
      BrowserStorageService.set(BrowserStorageKeys.Mode, activeTheme);
    });
    builder.addCase(authThunks.setLang, (state) => {
      state.isEnglish = !state.isEnglish;
    });
  },
});

const { reducer, actions } = authSlice;

export const authActions = {
  ...actions,
  ...authThunks,
};

export * as authSelectors from './selectors';

export default reducer;
