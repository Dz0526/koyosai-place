import { RadioGroup } from '@headlessui/react';
import { Header } from 'components/Header';
import { AuthGuard } from 'guard/AuthGuard';
import { clearToken, getToken } from 'lib/tokenStore';
import { adminExhibitData } from 'mock/api/exihibit';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { Exihibit, WaitingTimeType } from 'type/exihibit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { failSomethingToast, successSomethingToast } from 'lib/toastify';
import { post, put } from 'lib/client';

const waitingTimeType: WaitingTimeType[] = [
  '予約制',
  '待ち時間あり',
  '待ち時間なし',
];

type CreateWaitingTimeRequest = {
  type: WaitingTimeType;
  minutes: number;
};

type CreateWaitingTimeResponse = {
  type: WaitingTimeType;
  minutes: number;
};

type EditExhibitDescriptionRequest = {
  description: string;
};

type EditExhibitDescriptionResponse = Exihibit;

const AdminPage = () => {
  const [description, setDescription] = useState('');
  const [selectedWaitingTimeType, setSelectedWaitingTimeType] =
    useState<WaitingTimeType>(adminExhibitData.latestWatingTime.type);
  const [minutes, setMinutes] = useState<number>(0);
  const router = useRouter();

  const failUpdate = failSomethingToast('更新失敗');
  const successUpdate = successSomethingToast('更新成功！');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        router.push('login');
        return;
      }
      const waitingTime = post<
        CreateWaitingTimeRequest,
        CreateWaitingTimeResponse
      >(
        '/waiting-time',
        { type: selectedWaitingTimeType, minutes: minutes },
        token,
      );
      const exhibit = put<
        EditExhibitDescriptionRequest,
        EditExhibitDescriptionResponse
      >('/exhibit', { description: description }, token);
      successUpdate();
    } catch (e) {
      failUpdate();
    }
  };
  return (
    <AuthGuard>
      <Header title='展示情報更新'>
        <AiOutlineLogout
          className='self-center'
          onClick={() => {
            clearToken();
            router.push('/login');
          }}
        />
      </Header>
      <main className='container mx-auto px-4 pt-10 space-y-5'>
        <h1 className='font-bold text-2xl'>コンピュータ部</h1>
        <form className='flex flex-col space-y-10 text-lg'>
          <section>
            <p className='text-xl'>基本情報</p>
            <label className='block p-4 border rounded-md'>
              <span className='font-bold text-sm'>紹介文</span>
              <input
                className='block border-b focus:outline-none focus:outline-b focus:border-orange-500 w-full'
                defaultValue={adminExhibitData.description}
                value={description}
                placeholder='紹介文を入力'
                onChange={e => {
                  setDescription(e.target.value);
                }}
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
                  type={'number'}
                  defaultValue={adminExhibitData.latestWatingTime.minutes}
                  placeholder='分'
                  className='block border-b focus:outline-none focus:outline-b focus:border-orange-500'
                  required={selectedWaitingTimeType == '待ち時間あり'}
                  disabled={selectedWaitingTimeType != '待ち時間あり'}
                  value={minutes}
                  onChange={e => {
                    setMinutes(Number(e.target.value));
                  }}
                />
              </label>
            </div>
          </section>
          <button className='rounded-md bg-orange-500 text-white py-2'>
            更新
          </button>
        </form>
      </main>
      <ToastContainer />
    </AuthGuard>
  );
};

export default AdminPage;
