import { RadioGroup } from '@headlessui/react';
import { Header } from 'components/Header';
import { AuthGuard } from 'guard/AuthGuard';
import { clearToken, getToken } from 'lib/tokenStore';
import { adminExhibitData } from 'mock/api/exihibit';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import {
  Exihibit,
  reaturnWaitingTimeType,
  reaturnWaitingTimeTypeServer,
  WaitingTimeType,
  WaitingTimeTypeServer,
} from 'type/exihibit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { failSomethingToast, successSomethingToast } from 'lib/toastify';
import { post, put } from 'lib/client';
import Axios from 'axios';
import useSWR from 'swr';
import { generateAdminExhibitFetcher } from 'lib/fetcher';

const waitingTimeType: WaitingTimeType[] = [
  '予約制',
  '待ち時間あり',
  '待ち時間なし',
];

type CreateWaitingTimeRequest = {
  type: WaitingTimeTypeServer;
  minutes?: number;
};

type CreateWaitingTimeResponse = {
  type: WaitingTimeTypeServer;
  minutes: number | null;
};

type EditExhibitDescriptionRequest = {
  description: string;
};

type EditExhibitDescriptionResponse = Exihibit;

type Props = {
  data: Exihibit;
};

const WrapAdminPage = () => {
  const { data, error } = useSWR('/exhibit', generateAdminExhibitFetcher);
  const router = useRouter();

  if (error) router.push('/login');
  if (!data) return <>loading</>;

  return <AdminPage data={data} />;
};

const AdminPage = ({ data }: Props) => {
  const [description, setDescription] = useState('');
  const [selectedWaitingTimeType, setSelectedWaitingTimeType] =
    useState<WaitingTimeType>(adminExhibitData.latestWatingTime.type);
  const [minutes, setMinutes] = useState<number | null>(null);
  const router = useRouter();
  useEffect(() => {
    setDescription(data.description);
    setSelectedWaitingTimeType(data.latestWatingTime.type);
    setMinutes(data?.latestWatingTime.minutes);
  }, []);

  const failUpdate = failSomethingToast('更新失敗 ログインし直してください');
  const successUpdate = successSomethingToast('更新成功！');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();

      const waitingTimeTypeRequestBody =
        selectedWaitingTimeType == '待ち時間あり' && minutes != null
          ? {
              type: reaturnWaitingTimeTypeServer(selectedWaitingTimeType),
              minutes: minutes,
            }
          : { type: reaturnWaitingTimeTypeServer(selectedWaitingTimeType) };
      const waitingTime = await post<
        CreateWaitingTimeRequest,
        CreateWaitingTimeResponse
      >('/waiting-time', waitingTimeTypeRequestBody, token);
      setSelectedWaitingTimeType(reaturnWaitingTimeType(waitingTime.type));
      waitingTime.type == 'WAITING' && setMinutes(waitingTime.minutes);

      const exhibit = await put<
        EditExhibitDescriptionRequest,
        EditExhibitDescriptionResponse
      >('/exhibit', { description: description }, token);
      setDescription(exhibit.description);

      successUpdate();
      setTimeout(() => router.reload(), 4000);
    } catch (e) {
      if (
        (Axios.isAxiosError(e) && e.response && e.response.status == 400) ||
        401
      ) {
        if (getToken()) {
          clearToken();
        }
        failUpdate();
        setTimeout(() => {
          router.push('/login');
        }, 4000);
      }
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
        <h1 className='font-bold text-2xl'>{data.name}</h1>
        <form
          className='flex flex-col space-y-10 text-lg'
          onSubmit={async e => onSubmit(e)}
        >
          <section>
            <p className='text-xl'>基本情報</p>
            <label className='block p-4 border rounded-md'>
              <span className='font-bold text-sm'>紹介文</span>
              <input
                className='block border-b focus:outline-none focus:outline-b focus:border-orange-500 w-full'
                defaultValue={data.description}
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
                defaultValue={data.latestWatingTime.type}
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
                  type={'text'}
                  defaultValue={data.latestWatingTime.minutes ?? 0}
                  placeholder='分'
                  className='block border-b focus:outline-none focus:outline-b focus:border-orange-500'
                  required={selectedWaitingTimeType == '待ち時間あり'}
                  disabled={selectedWaitingTimeType != '待ち時間あり'}
                  value={minutes ?? 0}
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

export default WrapAdminPage;
