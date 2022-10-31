export type Exihibit = {
  name: string;
  imageUrl: string;
  description: string;
  places: Place[];
  latestWatingTime: WaitingTime;
};

export type ExihibitWithoutPlaces = Omit<Exihibit, 'places'>;

export type Place = {
  name: string;
  positionX: number;
  positionY: number;
  image: string;
};

export type WaitingTime = {
  type: WaitingTimeType;
  minutes: number | null;
};

export type WaitingTimeType = '待ち時間なし' | '待ち時間あり' | '予約制';

export type WaitingTimeTypeServer = 'RESERVATION' | 'WAITING' | 'IMMEDIATE';

export const reaturnWaitingTimeTypeServer = (
  type: WaitingTimeType,
): WaitingTimeTypeServer => {
  return type == '予約制'
    ? 'RESERVATION'
    : type == '待ち時間なし'
    ? 'IMMEDIATE'
    : 'WAITING';
};

export const reaturnWaitingTimeType = (
  type: WaitingTimeTypeServer,
): WaitingTimeType => {
  return type == 'RESERVATION'
    ? '予約制'
    : type == 'IMMEDIATE'
    ? '待ち時間なし'
    : '待ち時間あり';
};

export const requestWaitingTimeType = {
  予約制: 'RESEVERSATION',
  待ち時間あり: 'WAITING',
  待ち時間なし: 'IMMEDIATE',
};
