import { Image } from 'react-konva';
import useImage from 'use-image';

type Props = {
  imageUrl: string;
  x: number;
  y: number;
  onTouch: () => void;
};

export const ExihibitImage = ({ imageUrl, x, y, onTouch }: Props) => {
  const [image] = useImage(imageUrl);

  return (
    <Image
      image={image}
      alt={'exihibit image'}
      width={30}
      height={30}
      x={x - 15}
      y={y}
      onTap={() => {
        onTouch();
      }}
      onClick={() => {
        onTouch();
      }}
    />
  );
};
