import { Prize } from 'type/bingo';

type Props = {
  prize: Prize;
};

export const ContentCard = ({ prize }: Props) => {
  return (
    <div className='w-full aspect-square relative'>
      <img
        className='w-full h-full object-cover rounded-lg border border-slate-300'
        src={prize.url}
        alt='contents'
      />
      {prize.count != 0 ? (
        <>
          <div className='absolute bottom-0 w-full h-1/5 bg-white/75 rounded-b-lg' />
          <p className='absolute bottom-0 left-2'>残り{prize.count}個</p>
        </>
      ) : (
        <div className='absolute bottom-0 w-full h-full backdrop-blur-sm rounded-lg' />
      )}
    </div>
  );
};
