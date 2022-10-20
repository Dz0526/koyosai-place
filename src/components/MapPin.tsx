import { Label, Tag, Text } from 'react-konva';

type Props = {
  x: number;
  y: number;
  name: string;
};

export const MapPin = ({ x, y, name }: Props) => {
  return (
    <>
      <Label x={x} y={y} opacity={0.75}>
        <Tag
          fill='black'
          pointerDirection='down'
          pointerWidth={10}
          pointerHeight={10}
          lineJoin='round'
          shadowColor='black'
          shadowBlur={10}
          shadowOffsetX={10}
          shadowOffsetY={10}
          shadowOpacity={0.5}
        />
        <Text text={name} fill='white' fontSize={18} />
      </Label>
    </>
  );
};
