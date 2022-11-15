import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { AxiosError } from 'axios';

// import { authApi, client } from 'api';
import { Slice } from 'types';
import { errorConverter } from 'utils/errorConverter';
import { BrowserStorageKeys, BrowserStorageService } from 'services';
/////Fake data start

// export const signIn = createAsyncThunk(
//   `${Slice.Auth}/signIn`,
//   async (credentials: { email: string; password: string; rememberMe?: boolean }, thunkAPI) => {
//     const { rememberMe, ...restCredentials } = credentials;

//     try {
//       const response = await authApi.signInRequest(restCredentials);
//       console.log(response)
//       BrowserStorageService.set(BrowserStorageKeys.AccessToken, response.data.token, {
//         session: !rememberMe,
//       });
//       BrowserStorageService.set(BrowserStorageKeys.Role, response.data.role, {
//         session: !rememberMe,
//       });

//       return {
//         accessToken: response.data.token,
//         role: response.data.role,
//         twoFactorAuthEnabled: response.data.twoFactorAuthEnabled,
//       };
//     } catch (error) {
//       const err = error as AxiosError<any>;
//       return thunkAPI.rejectWithValue({
//         error: errorConverter(err.response?.data?.message),
//       });
//     }
//   },
// );

// export const signOut = createAsyncThunk(`${Slice.Auth}/signOut`, async (_, thunkAPI) => {
//   try {
//     BrowserStorageService.remove(BrowserStorageKeys.AccessToken);
//     BrowserStorageService.remove(BrowserStorageKeys.Role);
//     BrowserStorageService.remove(BrowserStorageKeys.AccessToken, {
//       session: true,
//     });
//     BrowserStorageService.remove(BrowserStorageKeys.Role, {
//       session: true,
//     });
//   } catch (error) {
//     const { message } = error as Error;

//     return thunkAPI.rejectWithValue({ error: message });
//   }
// });

// export const userInfoRequest = createAsyncThunk<any, any, { rejectValue: any }>(
//   `${Slice.Users}/me`,
//   async (data: any, thunkAPI) => {
//     try {
//       const response = await client.get('/users/me');
//       if (
//         response.data.role !==
//           BrowserStorageService.get(BrowserStorageKeys.Role, {
//             session: true,
//           }) ||
//         BrowserStorageService.get(BrowserStorageKeys.Role)
//       ) {
//         BrowserStorageService.remove(BrowserStorageKeys.Role);
//         BrowserStorageService.remove(BrowserStorageKeys.Role, {
//           session: true,
//         });
//         BrowserStorageService.set(BrowserStorageKeys.Role, response.data.role);
//       }
//       return { personalInfo: response.data };
//     } catch (error) {
//       return thunkAPI.rejectWithValue({
//         message: 'Get user info request failed',
//       });
//     }
//   },
// );
/////Fake data end

export const setDarkTheme = createAction('auth/setDarkTheme');
export const setLightTheme = createAction('auth/setLightTheme');
export const setTheme = createAction('auth/setTheme');
export const setLang = createAction('auth/setLang');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Fake Data Start
export const signIn = createAsyncThunk(
  `${Slice.Auth}/signIn`,
  async (credentials: { email: string; password: string; rememberMe?: boolean }, thunkAPI) => {
    const { rememberMe } = credentials;

    if (credentials.email !== '' || credentials.password !== '') {
      const response = {
        data: {
          token: '1234567890',
          role: 'ADMIN',
          twoFactorAuthEnabled: false,
        },
      };
      BrowserStorageService.set(BrowserStorageKeys.AccessToken, response.data.token, {
        session: !rememberMe,
      });
      BrowserStorageService.set(BrowserStorageKeys.Role, response.data.role, {
        session: !rememberMe,
      });

      return {
        accessToken: response.data.token,
        role: response.data.role,
        twoFactorAuthEnabled: response.data.twoFactorAuthEnabled,
      };
    } else {
      return thunkAPI.rejectWithValue({
        error: errorConverter('Wrong Login or password'),
      });
    }
  },
);

export const signOut = createAsyncThunk(`${Slice.Auth}/signOut`, async (_, thunkAPI) => {
  try {
    BrowserStorageService.remove(BrowserStorageKeys.AccessToken);
    BrowserStorageService.remove(BrowserStorageKeys.Role);
    BrowserStorageService.remove(BrowserStorageKeys.AccessToken, {
      session: true,
    });
    BrowserStorageService.remove(BrowserStorageKeys.Role, {
      session: true,
    });
  } catch (error) {
    const { message } = error as Error;

    return thunkAPI.rejectWithValue({ error: message });
  }
});

export const userInfoRequest = createAsyncThunk<any, any, { rejectValue: any }>(
  `${Slice.Users}/me`,
  async (data: any, thunkAPI) => {
    try {
      const response = {
        data: {
          role: 'ADMIN',
        },
      };

      if (
        response.data.role !==
          BrowserStorageService.get(BrowserStorageKeys.Role, {
            session: true,
          }) ||
        BrowserStorageService.get(BrowserStorageKeys.Role)
      ) {
        BrowserStorageService.remove(BrowserStorageKeys.Role);
        BrowserStorageService.remove(BrowserStorageKeys.Role, {
          session: true,
        });
        BrowserStorageService.set(BrowserStorageKeys.Role, response.data.role);
      }
      return { personalInfo: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: 'Get user info request failed',
      });
    }
  },
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Fake Data END
