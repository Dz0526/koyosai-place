import dynamic from 'next/dynamic';
import { FloorButton } from 'components/FloorButton';
import { useClub } from 'hooks/useClub';

const StageCompoent = dynamic(() => import('../components/StageComponent'), {
  ssr: false,
});

const KonvaPage = () => {
  const { club } = useClub();
  return (
    <>
      <main>
        <StageCompoent clubData={club} />
        <FloorButton />
      </main>
    </>
  );
};

export default KonvaPage;
