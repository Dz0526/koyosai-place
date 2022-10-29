import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: string;
};

export const Header = ({ children, title }: Props) => {
  return (
    <div className='fixed flex gap-3 justify-around z-10 backdrop-blur-sm w-full text-lg font-bold '>
      <h1 className='w-8/12'>{title}</h1>
      {children}
      <div className='border-b border-slate-300 fixed w-full top-7 z-10' />
    </div>
  );
};
