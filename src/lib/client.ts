import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const formUrlEncodedPost = async <RequestInterface, ResponseInterface>(
  path: string,
  params: RequestInterface,
): Promise<ResponseInterface> => {
  return await axios
    .post<ResponseInterface>(path, params, formRequestConfig())
    .then(res => res.data);
};

const requestConfig = (): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  };
};

const formRequestConfig = (): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  };
};

const requestConfigWithAuth = (token: string): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  };
};
