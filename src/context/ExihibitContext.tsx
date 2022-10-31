import { generateExhibitFetcher } from 'lib/fetcher';
import { createContext, ReactNode } from 'react';
import useSWR from 'swr';
import { Exihibit } from 'type/exihibit';

type Props = {
  children: ReactNode;
};

type ExihibitContextState = {
  exihibit: Exihibit[];
};

export const ExihibitContext = createContext<ExihibitContextState>({
  exihibit: [],
});

export const ExihibitContextProvider = ({ children }: Props) => {
  const { data, error } = useSWR<Exihibit[]>(
    '/exhibits',
    generateExhibitFetcher,
  );

  if (error) return <>error</>;
  if (!data) return <>loading</>;

  return (
    <ExihibitContext.Provider value={{ exihibit: data }}>
      {children}
    </ExihibitContext.Provider>
  );
};
