export type Exihibit = {
  name: string;
  imageUrl: string;
  description: string;
  places: Place[];
  latestWatingTime: WaitingTime;
};

export type Place = {
  name: string;
  positionX: number;
  positionY: number;
};

export type WaitingTime = {
  type: WaitingTimeType;
  minutes: number;
};

export type WaitingTimeType = '待ち時間なし' | '待ち時間あり' | '予約制';
