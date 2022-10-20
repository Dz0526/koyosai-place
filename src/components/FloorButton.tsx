import { usePosition } from 'hooks/usePosition';
import { Floor } from 'types/position';

export const FloorButton = () => {
  const floorNumbers: Floor[] = [1, 2, 3];
  const { position, dispatch } = usePosition();

  return (
    <p className='absolute bottom-0 right-0'>
      {floorNumbers.map(num => (
        <button
          className={`p-3 text-5xl ${
            position.floor !== num
              ? 'hover:text-blue-300 hover:text-7xl'
              : 'text-slate-200 cursor-not-allowed'
          }`}
          disabled={position.floor === num}
          key={num}
          value={num}
          onClick={e => dispatch({ type: 'CHANGE_FLOOR', payload: num })}
        >
          {num}
        </button>
      ))}
    </p>
  );
};
