import { Exihibit } from 'type/exihibit';

export const exihibitData: Exihibit[] = [
  {
    name: 'コンピュータ部',
    imageUrl: 'nord_starwars.jpg',
    description: '楽しいです',
    places: [{ name: '工作室', positionX: 0, positionY: 0 }],
    latestWatingTime: { type: '待ち時間あり', minutes: 30 },
  },
  {
    name: 'コンピュータ部',
    imageUrl:
      '/media/exhibits/%E3%82%B3%E3%83%B3%E3%83%92%E3%83%A5%E3%83%BC%E3%82%BF%E9%83%A8.jpg',
    description: '楽しいです',
    places: [{ name: '工作室', positionX: 0, positionY: 0 }],
    latestWatingTime: { type: '待ち時間あり', minutes: 30 },
  },
  {
    name: '茶道部',
    imageUrl: '/media/exhibits/%E8%8C%B6%E9%81%93%E9%83%A8.jpg',
    description: '楽しいです',
    places: [{ name: '111講義室', positionX: 0, positionY: 0 }],
    latestWatingTime: { type: '予約制', minutes: 0 },
  },
];
