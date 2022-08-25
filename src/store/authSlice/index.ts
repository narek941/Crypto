import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';

import { Slice } from 'types';
import { BrowserStorageKeys, BrowserStorageService } from 'services';
import { extraReducers } from 'utils';

import * as authThunks from './thunks';
import { AuthSliceState, UpdateAccessTokenAction } from './types';

const isEng =
  BrowserStorageService.get(BrowserStorageKeys.Language) === 'en' ||
  BrowserStorageService.get(BrowserStorageKeys.Language, { session: true }) === 'en';

const internalInitialState: AuthSliceState = {
  role: '',
  error: null,
  loading: false,
  twoFactorAuthEnabled: false,
  isDarkMode: BrowserStorageService.get(BrowserStorageKeys.Mode) === 'dark',
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
    builder.addCase(authThunks.userInfoRequest.fulfilled, (state, action) => {
      state.personalInfo = action.payload.personalInfo;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(authThunks.signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.twoFactorAuthEnabled = action.payload.twoFactorAuthEnabled;
    });

    builder.addCase(authThunks.signOut.fulfilled, () => ({
      ...internalInitialState,
      accessToken: '',
      loading: false,
      error: null,
    }));

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

    builder.addMatcher(
      isAnyOf(
        authThunks.signIn.pending,
        authThunks.userInfoRequest.pending,
        authThunks.signOut.pending,
      ),
      extraReducers.pendingReducer,
    );

    builder.addMatcher(
      isAnyOf(
        authThunks.signIn.rejected,
        authThunks.userInfoRequest.rejected,
        authThunks.signOut.rejected,
      ),
      extraReducers.errorReducer,
    );
  },
});

const { reducer, actions } = authSlice;

export const authActions = {
  ...actions,
  ...authThunks,
};

export * as authSelectors from './selectors';

export default reducer;
