import { MMKV } from 'react-native-mmkv'
import { Storage } from 'redux-persist';

export const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}

export const setObject = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value);
  storage.set(key, stringifiedValue);
};

export const getObject = <T>(key: string) => {
  const value = storage.getString(key);

  if (!value) {
    return undefined;
  }

  return JSON.parse(value) as T;
};