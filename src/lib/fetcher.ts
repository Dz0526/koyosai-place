import axios, { AxiosRequestConfig } from 'axios';

export const fetcher = (args: string) =>
  fetch(process.env.NEXT_PUBLIC_API_ORIGIN + args, { mode: 'no-cors' }).then(
    res => res.json(),
  );

export const generateFetcher = () => {
  return async (path: string) =>
    axios.get(path, requestConfig()).then(res => res.data);
};

const requestConfig = (): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  };
};
