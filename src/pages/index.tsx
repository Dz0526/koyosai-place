import dynamic from 'next/dynamic';
import { FloorButton } from 'components/FloorButton';
import { useClub } from 'hooks/useClub';
import { koyosaiData } from 'mock/api/club';
import { ExihibitDrawer } from 'components/exihibit/ExihibitDrawer';
import { Header } from 'components/Header';
import { SearchButton } from 'components/SearchButton';

const StageCompoent = dynamic(() => import('../components/StageComponent'), {
  ssr: false,
});

const KonvaPage = () => {
  return (
    <>
      <Header title={'koyofes navi'}>
        <SearchButton />
      </Header>
      <main>
        <ExihibitDrawer />
        <StageCompoent clubData={koyosaiData} />
        <FloorButton />
      </main>
    </>
  );
};

export default KonvaPage;
