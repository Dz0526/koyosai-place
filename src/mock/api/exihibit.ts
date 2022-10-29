import { Exihibit } from 'type/exihibit';

export const exihibitData: Exihibit[] = [
  {
    name: 'コンピュータ部',
    imageUrl:
      'https://koyofes-navi.s3.amazonaws.com/media/exhibits/%E3%82%B3%E3%83%B3%E3%83%92%E3%83%A5%E3%83%BC%E3%82%BF%E9%83%A8.jpg',
    description: '楽しいです',
    places: [
      { name: '工作室', positionX: 488, positionY: 613, image: '1F.jpg' },
    ],
    latestWatingTime: { type: '待ち時間あり', minutes: 30 },
  },
  {
    name: '茶道部',
    imageUrl: '/茶道部.jpg',
    // process.env.NEXT_PUBLIC_API_ORIGIN +
    // '/media/exhibits/%E8%8C%B6%E9%81%93%E9%83%A8.jpg',
    description: '楽しいです',
    places: [
      { name: '111講義室', positionX: 754, positionY: 597, image: '1F.jpg' },
    ],
    latestWatingTime: { type: '予約制', minutes: 0 },
  },
];

export const adminExhibitData: Exihibit = {
  name: 'コンピュータ部',
  imageUrl:
    'https://koyofes-navi.s3.amazonaws.com/media/exhibits/%E3%82%B3%E3%83%B3%E3%83%92%E3%83%A5%E3%83%BC%E3%82%BF%E9%83%A8.jpg',
  description: '楽しいです',
  places: [{ name: '工作室', positionX: 488, positionY: 613, image: '1F.jpg' }],
  latestWatingTime: { type: '待ち時間あり', minutes: 30 },
};
