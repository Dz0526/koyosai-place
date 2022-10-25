import { ContentCard } from 'components/bingo/ContentCard';
import { prizeData } from 'mock/api/bingo';

const BingoPage = () => {
  return (
    <div>
      <div className='relative pb-6 pr-5'>
        <h1 className='fixed font-bold w-full text-lg backdrop-blur-sm ml-5 z-10'>
          残り数
        </h1>
        <div className='border-b border-slate-300 fixed w-full top-7 z-10' />
      </div>
      <main className='container mx-auto px-5 mt-5'>
        <div className='grid grid-cols-2 gap-5'>
          {prizeData.map(prize => (
            <ContentCard prize={prize} key={prize.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BingoPage;
