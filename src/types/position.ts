import { Club } from 'context/ClubContext';

export type Scale = {
  scaleX: number;
  scaleY: number;
};

export type Floor = 1 | 2 | 3;

export type Position = {
  x: number;
  y: number;
  floor: Floor;
  search: boolean;
  scale: Scale;
  name: string;
};

export const clubToPosition = (club: Club): Position => {
  return {
    x: -club.room.positionX,
    y: -club.room.positionY,
    floor: club.room.stair,
    search: true,
    scale: { scaleX: 1, scaleY: 1 },
    name: club.name,
  };
};

export const clubsToPosition = (clubs: Club[]): Position[] => {
  return clubs.map(club => {
    return {
      x: -club.room.positionX,
      y: -club.room.positionY,
      floor: club.room.stair,
      search: true,
      scale: { scaleX: 1, scaleY: 1 },
      name: club.name,
    };
  });
};
