import { ContentCard } from 'components/bingo/ContentCard';
import { HambugerMenu } from 'components/HambugerMenu';
import { Header } from 'components/Header';
import { generateBingoFetcher } from 'lib/fetcher';
import { prizeData } from 'mock/api/bingo';
import useSWR from 'swr';

const BingoPage = () => {
  const { data, error } = useSWR('/prize', generateBingoFetcher);

  if (error) return <>error</>;
  if (!data) return <>loading</>;

  console.log(data);
  // use mock data
  return (
    <div>
      <Header title='残り数'>
        <HambugerMenu />
      </Header>
      <main className='container mx-auto px-5 pt-10'>
        <div className='grid grid-cols-2 gap-5'>
          {prizeData.map((prize, i) => (
            <ContentCard prize={prize} key={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BingoPage;
