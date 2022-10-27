import { ReactNode } from 'react';
import { GiHamburgerMenu, GiCardRandom } from 'react-icons/gi';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { Menu } from '@headlessui/react';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  title: string;
};

export const Header = ({ children, title }: Props) => {
  return (
    <div className='fixed flex gap-3 justify-around z-10 backdrop-blur-sm w-full text-lg font-bold '>
      <h1 className='w-8/12'>{title}</h1>
      {children}
      <Menu as={'div'} className='relative inline-block text-left'>
        <Menu.Button className='focus:outline-none'>
          <GiHamburgerMenu className='self-center' />
        </Menu.Button>
        <Menu.Items className='absolute top-10 right-0 bg-white divide-y divide-slate-200 rounded-lg px-2 py-2 font-normal border border-slate-300 focus:outline-none'>
          <Menu.Item>
            <Link href={'/'} passHref>
              <button className='group flex w-full items-center rounded-md px-2 py-2'>
                <AiOutlineHome className='mr-2 h-5 w-5' />
                Home
              </button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href={'/bingo'} passHref>
              <button className='group flex w-full items-center rounded-md px-2 py-2'>
                <GiCardRandom className='mr-2 h-5 w-5' />
                Bingo
              </button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href={'/bingo'} passHref>
              <button className='group flex w-full items-center rounded-md px-2 py-2'>
                <AiOutlineInfoCircle className='mr-2 h-5 w-5' />
                Author
              </button>
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <div className='border-b border-slate-300 fixed w-full top-7 z-10' />
    </div>
  );
};
