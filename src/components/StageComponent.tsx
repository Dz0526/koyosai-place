import { Stage, Layer } from 'react-konva';
import { MapImage } from './MapImage';
import { useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { usePosition } from 'hooks/usePosition';
import { ExihibitImage } from './exihibit/ExihibitImage';
import { useExihibitModal } from 'hooks/useExihibitModal';
import { Exihibit } from 'type/exihibit';

export type Scale = {
  scaleX: number;
  scaleY: number;
};

type Props = {
  exhibitData: Exihibit[];
};

const StageCompoent = ({ exhibitData }: Props) => {
  const [lastDis, setLastDis] = useState<number | null>(null);
  const [lastCenter, setLastCenter] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isPinching, setIsPinching] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const { position, dispatch } = usePosition();
  const { exihibitModal, setExihibitModal } = useExihibitModal();

  const getDistance = (
    p1: { x: number; y: number },
    p2: { x: number; y: number },
  ) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const getCenter = (
    p1: { x: number; y: number },
    p2: { x: number; y: number },
  ) => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };

  const handleTouchMoveEvent = (e: KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault();
    if (e.evt.touches.length > 1) {
      setIsPinching(true);

      const touch1 = e.evt.touches[0];
      const touch2 = e.evt.touches[1];

      const p1 = { x: touch1.clientX, y: touch1.clientY };
      const p2 = { x: touch2.clientX, y: touch2.clientY };

      if (!lastCenter) {
        setLastCenter(getCenter(p1, p2));
        return;
      }
      const newCenter = getCenter(p1, p2);

      const dis = getDistance(p1, p2);
      const tmpLastDis = dis;
      if (!lastDis) {
        setLastDis(dis);
      }

      const pointTo = {
        x: (newCenter.x - position.x) / position.scale.scaleX,
        y: (newCenter.y - position.y) / position.scale.scaleY,
      };
      const scale = lastDis
        ? position.scale.scaleX * (dis / lastDis)
        : position.scale.scaleX * (dis / tmpLastDis);

      const dx = newCenter.x - lastCenter.x;
      const dy = newCenter.y - lastCenter.y;

      const newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };
      dispatch({
        type: 'SET_POSITION',
        payload: {
          ...position,
          x: newPos.x,
          y: newPos.y,
          scale: { scaleX: scale, scaleY: scale },
        },
      });
      setLastCenter(newCenter);
      setLastDis(dis);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onTouchMove={e => handleTouchMoveEvent(e)}
      onTouchEnd={() => {
        setLastDis(0);
        setLastCenter(null);
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
      onDragStart={() => {
        setIsDrag(true);
      }}
      onDragEnd={() => setIsDrag(false)}
      className={`cursor-grab ${isDrag && 'cursor-grabbing'} z-auto`}
    >
      <Layer>
        {position.floor === 1 ? (
          <MapImage
            alt='map floor 1'
            imageName={
              '/1F.png' /*process.env.NEXT_PUBLIC_API_ORIGIN + '/media/map/1F.png'*/
            }
            width={904}
            height={1295}
          />
        ) : position.floor === 2 ? (
          <MapImage
            alt='map floor 2'
            imageName={
              '/2F.png' /*process.env.NEXT_PUBLIC_API_ORIGIN + '/media/map/2F.png'*/
            }
            width={904}
            height={1187}
          />
        ) : (
          <MapImage
            alt='map floor 3'
            imageName={
              '/3F.png' /*process.env.NEXT_PUBLIC_API_ORIGIN + '/media/map/3F.png'*/
            }
            width={904}
            height={1187}
          />
        )}
        {exhibitData.map(exhibit =>
          exhibit.places
            .filter(
              place =>
                Number(place.image[place.image.length - 6]) == position.floor,
            )
            .map((place, i) => (
              <ExihibitImage
                key={i}
                imageUrl={exhibit.imageUrl}
                x={place.positionX}
                y={place.positionY}
                onTouch={() => {
                  setExihibitModal({
                    ...exihibitModal,
                    isOpen: true,
                    exihibit: {
                      ...exihibitModal.exihibit,
                      name: exhibit.name,
                      imageUrl: exhibit.imageUrl,
                      description: exhibit.description,
                      latestWatingTime: exhibit.latestWatingTime,
                    },
                  });
                }}
              />
            )),
        )}
      </Layer>
    </Stage>
  );
};

export default StageCompoent;
