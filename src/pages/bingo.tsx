import { ContentCard } from 'components/bingo/ContentCard';
import { Header } from 'components/Header';
import { prizeData } from 'mock/api/bingo';

const BingoPage = () => {
  return (
    <div>
      <Header title='残り数' />
      <main className='container mx-auto px-5 pt-10'>
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
