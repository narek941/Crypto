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
};

export default BrowserStorageService;
