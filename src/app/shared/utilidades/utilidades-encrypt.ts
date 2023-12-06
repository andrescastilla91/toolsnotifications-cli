
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(data, environment.KEY_ECRYPT).toString();
};

export const decrypt = (valueEncrypt: string) => {
  return CryptoJS.AES.decrypt(valueEncrypt, environment.KEY_ECRYPT).toString(CryptoJS.enc.Utf8);
};

export function getDataLocalStorage(keyStorage: string, obj: StorageObjectTypes, aplicaCifrado: boolean = true) {
  const getDataStorage = localStorage.getItem(keyStorage)!;
  if (!getDataStorage) return false;
  if (aplicaCifrado) {
    const dataCifrada: any = JSON.parse(decrypt(getDataStorage)); 
    return dataCifrada[obj];
  } else {
    const localStorageData: any = JSON.parse(getDataStorage);
    return localStorageData[obj];
  }
}

type StorageObjectTypes = "token" | "emailUser" | "entidad" | "accountVerfication" | "rbac";
