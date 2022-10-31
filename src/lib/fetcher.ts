import axios, { AxiosRequestConfig } from 'axios';
import { Prize } from 'type/bingo';
import {
  Exihibit,
  reaturnWaitingTimeType,
  WaitingTimeTypeServer,
} from 'type/exihibit';
import { getToken } from './tokenStore';

type PlaceResponse = {
  name: string;
  position_x: number;
  position_y: number;
  image: string;
};

type WaitingTimeResponse = {
  type: WaitingTimeTypeServer;
  minutes: number | null;
};

type ExhibitResponse = {
  name: string;
  image_url: string;
  description: string;
  places: PlaceResponse[];
  latest_waiting_time: WaitingTimeResponse;
};

type PrizeResponse = {
  name: string;
  image_url: string;
  count: number;
};

export const fetcher = (args: string) =>
  fetch(process.env.NEXT_PUBLIC_API_ORIGIN + args, { mode: 'no-cors' }).then(
    res => res.json(),
  );

export const generateFetcher = () => {
  return async (path: string) =>
    axios.get(path, requestConfig()).then(res => res.data);
};

export const generateAdminExhibitFetcher: (
  path: string,
) => Promise<Exihibit> = async (path: string) => {
  return axios
    .get<ExhibitResponse>(path, requestConfigWithAuth())
    .then(res => res.data)
    .then(exhibitResponse => ({
      name: exhibitResponse.name,
      description: exhibitResponse.description,
      imageUrl: exhibitResponse.image_url,
      places: exhibitResponse.places.map(place => ({
        name: place.name,
        positionX: place.position_x,
        positionY: place.position_y,
        image: place.image,
      })),
      latestWatingTime: {
        type:
          exhibitResponse.latest_waiting_time &&
          reaturnWaitingTimeType(exhibitResponse.latest_waiting_time.type),
        minutes:
          exhibitResponse.latest_waiting_time &&
          exhibitResponse.latest_waiting_time.minutes,
      },
    }));
};

export const generateExhibitFetcher: (
  path: string,
) => Promise<Exihibit[]> = async (path: string) => {
  return axios
    .get<ExhibitResponse[]>(path, requestConfig())
    .then(res => res.data)
    .then(exhibitsResponse =>
      exhibitsResponse.map(exhibitResponse => ({
        name: exhibitResponse.name,
        imageUrl: exhibitResponse.image_url,
        description: exhibitResponse.description,
        places: exhibitResponse.places.map(place => ({
          name: place.name,
          positionX: place.position_x,
          positionY: place.position_y,
          image: place.image,
        })),
        latestWatingTime: {
          type:
            exhibitResponse.latest_waiting_time &&
            reaturnWaitingTimeType(exhibitResponse.latest_waiting_time.type),
          minutes:
            exhibitResponse.latest_waiting_time &&
            exhibitResponse.latest_waiting_time.minutes,
        },
      })),
    );
};

export const generateBingoFetcher: (path: string) => Promise<Prize[]> = async (
  path: string,
) => {
  return axios
    .get<PrizeResponse[]>(path, requestConfig())
    .then(res => res.data)
    .then(prizeResponse =>
      prizeResponse.map(prize => ({
        name: prize.name,
        count: prize.count,
        url: prize.image_url,
      })),
    );
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

const requestConfigWithAuth = (): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  };
};
