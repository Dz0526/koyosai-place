import { fetcher, generateFetcher } from 'lib/fetcher';
import { createContext, ReactNode } from 'react';
import useSWR from 'swr';

type Props = {
  children: ReactNode;
};

type Room = {
  id: number;
  name: string;
  positionX: number;
  positionY: number;
  raspi: string;
  stair: 1 | 2 | 3;
};

export type Club = {
  id: number;
  name: string;
  room: Room;
};

type ClubContextState = {
  club: Club[];
};

export const ClubContext = createContext<ClubContextState>({
  club: [],
});

export const ClubContextProvider = ({ children }: Props) => {
  const { data, error } = useSWR<Club[]>('/club', generateFetcher());

  if (error) return <>{error.message}</>;
  if (!data) return <>loading</>;

  return (
    <ClubContext.Provider
      value={{
        club: data,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};
