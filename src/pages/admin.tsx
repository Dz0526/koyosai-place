import { RadioGroup } from '@headlessui/react';
import { Header } from 'components/Header';
import { adminExhibitData } from 'mock/api/exihibit';
import { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { WaitingTimeType } from 'type/exihibit';

const waitingTimeType: WaitingTimeType[] = [
  '予約制',
  '待ち時間あり',
  '待ち時間なし',
];

const AdminPage = () => {
  const [selectedWaitingTimeType, setSelectedWaitingTimeType] =
    useState<WaitingTimeType>(adminExhibitData.latestWatingTime.type);
  return (
    <>
      <Header title='展示情報更新'>
        <AiOutlineLogout
          className='self-center'
          onClick={() => {
            return;
          }}
        />
      </Header>
      <main className='container mx-auto px-4 pt-10 space-y-5'>
        <h1>コンピュータ部</h1>
        <form className='flex flex-col space-y-10 text-lg'>
          <section>
            <p className='text-xl'>基本情報</p>
            <label className='block p-4 border rounded-md'>
              <span className='font-bold text-sm'>紹介文</span>
              <input
                className='block border-b focus:outline-none focus:outline-b focus:border-orange-500 w-full'
                defaultValue={adminExhibitData.description}
                placeholder='紹介文を入力'
              />
            </label>
          </section>
          <section>
            <p className='text-xl'>待ち時間情報</p>
            <div className='border rounded-md p-4 space-y-4'>
              <RadioGroup
                value={selectedWaitingTimeType}
                onChange={setSelectedWaitingTimeType}
              >
                <RadioGroup.Label className='font-bold text-sm'>
                  待ち時間タイプ
                </RadioGroup.Label>
                <div className='space-y-2'>
                  {waitingTimeType.map(type => (
                    <RadioGroup.Option
                      key={type}
                      value={type}
                      className={({ checked }) =>
                        `${
                          checked ? 'bg-orange-500 text-white' : 'bg-slate-50'
                        } p-4 rounded-md`
                      }
                    >
                      <RadioGroup.Label as='p'>{type}</RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <label className='block'>
                <span className='font-bold text-sm'>待ち時間</span>
                <input
                  defaultValue={adminExhibitData.latestWatingTime.minutes}
                  placeholder='分'
                  className='block border-b focus:outline-none focus:outline-b focus:border-orange-500'
                  required
                  disabled={selectedWaitingTimeType != '待ち時間あり'}
                />
              </label>
            </div>
          </section>
          <button className='rounded-md bg-orange-500 text-white py-2'>
            更新
          </button>
        </form>
      </main>
    </>
  );
};

export default AdminPage;
