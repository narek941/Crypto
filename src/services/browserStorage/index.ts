import { BrowserStorageKeys, BrowserStorageOptions } from './types';

const BrowserStorageService = {
  get: (field: BrowserStorageKeys, options?: BrowserStorageOptions): string | null => {
    const storage = options?.session ? sessionStorage : localStorage;

    return storage.getItem(field);
  },

  set: (field: BrowserStorageKeys, value: string, options?: BrowserStorageOptions): void => {
    const storage = options?.session ? sessionStorage : localStorage;

    storage.setItem(field, value);
  },

  remove: (field: BrowserStorageKeys, options?: BrowserStorageOptions): void => {
    const storage = options?.session ? sessionStorage : localStorage;

    storage.removeItem(field);
  },
  update: (field: BrowserStorageKeys, value: string): void => {
    if (sessionStorage.getItem(field)) {
      sessionStorage.removeItem(field);
      sessionStorage.setItem(field, value);
    } else {
      localStorage.removeItem(field);
      localStorage.setItem(field, value);
    }
  },
};

export default BrowserStorageService;
