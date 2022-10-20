import { Scale } from 'components/StageComponent';
import { Position, Floor } from 'types/position';
import { createContext, Dispatch, ReactNode, useReducer, Reducer } from 'react';

type Props = {
  children: ReactNode;
};

type ACTION =
  | {
      type: 'CHANGE_COORDINATE';
      payload: { x: number; y: number; search: boolean };
    }
  | {
      type: 'CHANGE_FLOOR';
      payload: Floor;
    }
  | {
      type: 'CHANGE_SCALE';
      payload: Scale;
    }
  | {
      type: 'SET_POSITION';
      payload: Position;
    };

const reducerFunc: Reducer<Position, ACTION> = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COORDINATE':
      return {
        ...state,
        x: action.payload.x,
        y: action.payload.y,
        search: action.payload.search,
      };
    case 'CHANGE_FLOOR':
      return { ...state, floor: action.payload };
    case 'CHANGE_SCALE':
      return { ...state, scale: action.payload };
    case 'SET_POSITION':
      return { ...action.payload };
  }
};

type PositionContextState = {
  position: Position;
  dispatch: Dispatch<ACTION>;
};

export const PositionContext = createContext<PositionContextState>({
  position: {
    x: 0,
    y: 0,
    floor: 1,
    search: false,
    scale: { scaleX: 1, scaleY: 1 },
    name: '',
  },
  dispatch: () => null,
});

export const PositionContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    x: 0,
    y: 0,
    floor: 1,
    search: false,
    scale: { scaleX: 1, scaleY: 1 },
    name: '',
  });

  return (
    <PositionContext.Provider value={{ position: state, dispatch: dispatch }}>
      {children}
    </PositionContext.Provider>
  );
};
