import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

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