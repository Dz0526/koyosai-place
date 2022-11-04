import { GiHamburgerMenu, GiCardRandom } from 'react-icons/gi';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';
import { Menu } from '@headlessui/react';
import Link from 'next/link';

export const HambugerMenu = () => {
  return (
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
      </Menu.Items>
    </Menu>
  );
};
