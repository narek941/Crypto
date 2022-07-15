import { createSlice } from '@reduxjs/toolkit';

import { Slice } from 'types';

import { InitialState } from './types';
import { setDarkTheme, setLightTheme, setTheme } from './actions';

const initialState: InitialState = {
  isDarkMode: false,
};

export const themeSlice = createSlice({
  name: Slice.Theme,
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(setDarkTheme, (state) => {
      state.isDarkMode = true;
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
    });
    builder.addCase(setLightTheme, (state) => {
      state.isDarkMode = false;
      document.querySelector('body')?.setAttribute('data-theme', 'light');
    });
    builder.addCase(setTheme, (state) => {
      state.isDarkMode = !state.isDarkMode;
      const activeTheme = state.isDarkMode ? 'dark' : 'light';
      document.querySelector('body')?.setAttribute('data-theme', activeTheme);
      localStorage.setItem('mode', activeTheme);
    });
  },
});

export default themeSlice.reducer;
