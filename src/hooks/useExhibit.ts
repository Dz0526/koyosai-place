import { ExihibitContext } from 'context/ExihibitContext';
import { useContext } from 'react';

export const useExhibit = () => {
  const context = useContext(ExihibitContext);

  return { exhibit: context.exihibit };
};
