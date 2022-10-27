import { Exihibit } from 'type/exihibit';
import { Floor, Position } from 'types/position';

export const exihibitToPosition = (exihibit: Exihibit): Position => {
  return {
    ...exihibit,
    name: exihibit.name,
    x: -exihibit.places[0].positionX * 3,
    y: -exihibit.places[0].positionY * 3,
    floor: Number(
      exihibit.places[0].image[exihibit.places[0].image.length - 6],
    ) as Floor,
    search: true,
    scale: { scaleX: 3, scaleY: 3 },
  };
};
