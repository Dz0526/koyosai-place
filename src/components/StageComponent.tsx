import { Stage, Layer } from 'react-konva';
import { MapImage } from './MapImage';
import { useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { MapPin } from './MapPin';
import { Club } from 'context/ClubContext';
import { usePosition } from 'hooks/usePosition';

export type Scale = {
  scaleX: number;
  scaleY: number;
};

type Props = {
  clubData: Club[];
};

const StageCompoent = ({ clubData }: Props) => {
  const [dis, setDis] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const { position, dispatch } = usePosition();

  const handleTouchMoveEvent = (e: KonvaEventObject<TouchEvent>) => {
    if (e.evt.changedTouches.length > 1) {
      setIsPinching(true);
      const disX =
        e.evt.changedTouches[1].clientX - e.evt.changedTouches[0].clientX;
      const disY =
        e.evt.changedTouches[1].clientY - e.evt.changedTouches[0].clientY;
      const curDis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

      let lastDis = dis;

      if (lastDis == 0) {
        lastDis = curDis;
      }

      const newScale: Scale = {
        scaleX: position.scale.scaleX * (curDis / lastDis),
        scaleY: position.scale.scaleY * (curDis / lastDis),
      };

      dispatch({ type: 'CHANGE_SCALE', payload: newScale });
      setDis(curDis);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onTouchMove={e => handleTouchMoveEvent(e)}
      onTouchEnd={() => {
        setDis(0);
        setIsPinching(false);
      }}
      scaleX={position.scale.scaleX}
      scaleY={position.scale.scaleY}
      draggable={isPinching ? false : true}
      x={position.search ? position.x + window.innerWidth / 2 : position.x}
      y={position.search ? position.y + window.innerHeight / 2 : position.y}
      onDragMove={e =>
        dispatch({
          type: 'CHANGE_COORDINATE',
          payload: { x: e.target.x(), y: e.target.y(), search: false },
        })
      }
      onDragStart={() => setIsDrag(true)}
      onDragEnd={() => setIsDrag(false)}
      className={`cursor-grab ${isDrag && 'cursor-grabbing'} z-auto`}
    >
      <Layer>
        {position.floor === 1 ? (
          <MapImage alt='map floor 1' imageName='/map1.png' />
        ) : position.floor === 2 ? (
          <MapImage alt='map floor 2' imageName='/map2.png' />
        ) : (
          <MapImage alt='map floor 3' imageName='/map3.png' />
        )}
        {clubData
          .filter(club => club.room.stair === position.floor)
          .map(club => (
            <MapPin
              x={club.room.positionX}
              y={club.room.positionY}
              name={club.name}
              key={club.name}
            />
          ))}
      </Layer>
    </Stage>
  );
};

export default StageCompoent;
