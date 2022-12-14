import { Scale } from 'components/StageComponent';
import { Floor } from 'types/position';
import { Club } from 'context/ClubContext';

export type Position = {
  x: number;
  y: number;
  floor: Floor;
  search: boolean;
  scale: Scale;
  name: string;
};

export type TmpClub = {
  name: string;
  x: number;
  y: number;
  floor: Floor;
};

export const koyosaiData: Club[] = [
  {
    id: 1,
    name: '茶道部',
    room: {
      id: 1,
      name: '和室',
      positionX: 10,
      positionY: 2,
      raspi: '1xx.xxx.xxx.xxx',
      stair: 1,
    },
  },
];

export const clubData: TmpClub[] = [
  { name: 'コンピュータ部', x: 1084, y: 499, floor: 1 },
  { name: '美術部', x: 1293, y: 501, floor: 1 },
  { name: '鉄道部', x: 1425, y: 807, floor: 1 },
  { name: '自動車部', x: 1025, y: 775, floor: 1 },
  { name: 'ロボコンA', x: 958, y: 782, floor: 1 },
  { name: 'ロボコンB', x: 1599, y: 528, floor: 1 },
];

export const positionData: Position = {
  name: 'コンピュータ部',
  x: -1084,
  y: -499,
  floor: 1,
  search: true,
  scale: { scaleX: 1, scaleY: 1 },
};

export const positionDataTwo: Position[] = [
  {
    name: '自動車部',
    x: -1025,
    y: -775,
    floor: 1,
    search: true,
    scale: { scaleX: 1, scaleY: 1 },
  },
  {
    name: '美術部',
    x: -1293,
    y: -501,
    floor: 1,
    search: true,
    scale: { scaleX: 1, scaleY: 1 },
  },
  {
    name: 'コンピュータ部',
    x: -1084,
    y: -499,
    floor: 1,
    search: true,
    scale: { scaleX: 1, scaleY: 1 },
  },
  {
    name: '鉄道部',
    x: -1425,
    y: -807,
    floor: 1,
    search: true,
    scale: { scaleX: 1, scaleY: 1 },
  },
  {
    name: 'ロボコンA',
    x: -958,
    y: -782,
    floor: 1,
    search: true,
    scale: { scaleX: 1, scaleY: 1 },
  },
  {
    name: 'ロボコンB',
    x: -1599,
    y: -528,
    floor: 1,
    search: true,
    scale: { scaleX: 1, scaleY: 1 },
  },
];
