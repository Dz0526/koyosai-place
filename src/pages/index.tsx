import dynamic from 'next/dynamic';
import { FloorButton } from 'components/FloorButton';
import { useExhibit } from 'hooks/useExhibit';
import { ExihibitDrawer } from 'components/exihibit/ExihibitDrawer';
import { Header } from 'components/Header';
import { SearchButton } from 'components/SearchButton';
import { HambugerMenu } from 'components/HambugerMenu';

const StageCompoent = dynamic(() => import('../components/StageComponent'), {
  ssr: false,
});

const KonvaPage = () => {
  const { exhibit } = useExhibit();
  return (
    <>
      <Header title={'koyofes navi'}>
        <SearchButton />
        <HambugerMenu />
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
