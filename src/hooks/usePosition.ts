import { PositionContext } from 'context/PositionContext';
import { useContext } from 'react';

export const usePosition = () => {
  const context = useContext(PositionContext);

  return {
    position: context.position,
    dispatch: context.dispatch,
  };
};
