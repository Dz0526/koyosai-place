import dynamic from 'next/dynamic';
import { FloorButton } from 'components/FloorButton';
import { useExhibit } from 'hooks/useExhibit';
import { koyosaiData } from 'mock/api/club';
import { ExihibitDrawer } from 'components/exihibit/ExihibitDrawer';
import { Header } from 'components/Header';
import { SearchButton } from 'components/SearchButton';
import { generateExhibitFetcher } from 'lib/fetcher';
import { createContext, ReactNode, useEffect } from 'react';

const StageCompoent = dynamic(() => import('../components/StageComponent'), {
  ssr: false,
});

const KonvaPage = () => {
  const { exhibit } = useExhibit();
  return (
    <>
      <Header title={'koyofes navi'}>
        <SearchButton />
      </Header>
      <main>
        <ExihibitDrawer />
        <StageCompoent exhibitData={exhibit} />
        <FloorButton />
      </main>
    </>
  );
};

export default KonvaPage;
