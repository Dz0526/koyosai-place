import dynamic from 'next/dynamic';
import { FloorButton } from 'components/FloorButton';
import { useClub } from 'hooks/useClub';
import { koyosaiData } from 'mock/api/club';

const StageCompoent = dynamic(() => import('../components/StageComponent'), {
  ssr: false,
});

const KonvaPage = () => {
  return (
    <>
      <main>
        <StageCompoent clubData={koyosaiData} />
        <FloorButton />
      </main>
    </>
  );
};

export default KonvaPage;
