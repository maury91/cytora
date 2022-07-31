import { SWAPI_ENDPOINT } from "const";

export type WithId<T> = Omit<T, "id"> & {
  id: string;
};

export type WithType<T, K> = Omit<T, "type"> & {
  type: K;
};

export type DataWrapped<T> = {
  data?: T;
};

export const extractId = (baseUrl: string, url: string): string =>
  url.substring(baseUrl.length + 1, url.length - 1);

export const getSimpleId = (simpleUrl: string): string =>
  simpleUrl.split("/")[1];

export const extractForeignerKey = (url: string) =>
  extractId(SWAPI_ENDPOINT, url);
