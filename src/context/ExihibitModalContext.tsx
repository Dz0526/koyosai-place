import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { ExihibitWithoutPlaces } from 'type/exihibit';

type Props = {
  children: ReactNode;
};

type ExihibtModal = {
  isOpen: boolean;
  exihibit: ExihibitWithoutPlaces;
};

type ExihibtModalContextState = {
  exihibitModal: ExihibtModal;
  setExihibitModal: Dispatch<SetStateAction<ExihibtModal>>;
};

export const ExihibitModalContext = createContext<ExihibtModalContextState>({
  exihibitModal: {
    isOpen: false,
    exihibit: {
      name: '',
      imageUrl: '',
      description: '',
      latestWatingTime: { type: '予約制', minutes: 0 },
    },
  },
  setExihibitModal: () => null,
});

export const ExihibitModalContextProvider = ({ children }: Props) => {
  const [exihibitModal, setExihibitModal] = useState<ExihibtModal>({
    isOpen: false,
    exihibit: {
      name: '',
      imageUrl: '',
      description: '',
      latestWatingTime: { type: '待ち時間あり', minutes: 0 },
    },
  });

  return (
    <ExihibitModalContext.Provider
      value={{
        exihibitModal: exihibitModal,
        setExihibitModal: setExihibitModal,
      }}
    >
      {children}
    </ExihibitModalContext.Provider>
  );
};
