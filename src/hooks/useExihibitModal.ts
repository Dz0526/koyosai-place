import { ExihibitModalContext } from 'context/ExihibitModalContext';
import { useContext } from 'react';

export const useExihibitModal = () => {
  const context = useContext(ExihibitModalContext);

  return {
    exihibitModal: context.exihibitModal,
    setExihibitModal: context.setExihibitModal,
  };
};
