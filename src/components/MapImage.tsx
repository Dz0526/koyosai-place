import { KonvaEventObject } from 'konva/lib/Node';
import { FC, useState } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

type Scale = {
  scaleX: number;
  scaleY: number;
};

type Props = {
  alt: string;
  imageName: string;
  width: number;
  height: number;
};

export const MapImage: FC<Props> = ({ alt, imageName, width, height }) => {
  const [image] = useImage(imageName);
  const [scale, setScale] = useState<Scale>({ scaleX: 1, scaleY: 1 });

  const handleWheelEvent = (e: KonvaEventObject<WheelEvent>) => {
    const scaleBy = 1.1;
    const newScale: Scale =
      e.evt.deltaY > 0
        ? { scaleX: scale.scaleX * scaleBy, scaleY: scale.scaleY * scaleBy }
        : { scaleX: scale.scaleX / scaleBy, scaleY: scale.scaleY / scaleBy };
    setScale(newScale);
  };

  return (
    <Image
      image={image}
      alt={alt}
      width={width}
      height={height}
      onWheel={e => handleWheelEvent(e)}
    />
  );
};
