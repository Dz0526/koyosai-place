import Axios from 'axios';
import { Header } from 'components/Header';
import { formUrlEncodedPost } from 'lib/client';
import { getToken, setToken } from 'lib/tokenStore';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { failSomethingToast, successSomethingToast } from 'lib/toastify';
import { Listbox } from '@headlessui/react';
import { useExhibit } from 'hooks/useExhibit';

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  token_type: string;
};

type ValidateUiState = {
  isValidUsername: boolean;
  isValidPassword: boolean;
};

const LoginPage = () => {
  const { exhibit } = useExhibit();
  const [userName, setUserName] = useState(exhibit[0].name);
  const [password, setPassword] = useState('');
  const [validateUiState, setValidateUiState] = useState<ValidateUiState>({
    isValidUsername: false,
    isValidPassword: false,
  });
  const router = useRouter();
  const loginFailure = failSomethingToast('ログイン失敗');
  const loginSuccess = successSomethingToast('ログイン成功！');

  useEffect(() => {
    if (getToken()) router.push('/admin');
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', userName);
      params.append('password', password);

      const res = await formUrlEncodedPost<URLSearchParams, LoginResponse>(
        '/auth/login',
        params,
      );
      setToken(res.access_token);

      loginSuccess();
      router.push('/admin');
    } catch (e) {
      if (Axios.isAxiosError(e) && e.response && e.response.status == 400) {
        loginFailure();
      }
    }
  };

  return (
    <>
      <Header title='ログイン' />
      <main className='container mx-auto px-10 pt-10 grid grid-cols-1 h-full'>
        <h1 className='text-2xl self-end justify-self-center'>
          展示アカウントログイン
        </h1>
        <div className='relative'>
          <form
            className='flex flex-col space-y-10 p-5 rounded-md bg-slate-50'
            onSubmit={async e => {
              await onSubmit(e);
            }}
          >
            <div>
              <label>
                <span className='font-bold text-sm block'>展示名</span>
                {/* <input
                  placeholder='展示名を入力'
                  className='block border-b focus:outline-none focus:outline-b focus:border-orange-500 w-full py-2'
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  onBlur={e =>
                    e.target.value.length != 0
                      ? setValidateUiState({
                          ...validateUiState,
                          isValidUsername: true,
                        })
                      : setValidateUiState({
                          ...validateUiState,
                          isValidUsername: false,
                        })
                  }
                  required
                /> */}
                <Listbox value={userName} onChange={setUserName}>
                  <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                    {userName}
                  </Listbox.Button>
                  <Listbox.Options className='className=absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {exhibit.map(exhibit => (
                      <Listbox.Option key={exhibit.name} value={exhibit.name}>
                        {exhibit.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </label>
            </div>
            <div>
              {!validateUiState.isValidPassword && (
                <p className='text-sm text-red-500'>必須です！</p>
              )}
              <label>
                <span className='font-bold text-sm'>パスワード</span>
                <input
                  type={'password'}
                  placeholder='パスワードを入力'
                  className='block border-b focus:outline-none focus:outline-b focus:border-orange-500 w-full py-2'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onBlur={e =>
                    e.target.value.length != 0
                      ? setValidateUiState({
                          ...validateUiState,
                          isValidPassword: true,
                        })
                      : setValidateUiState({
                          ...validateUiState,
                          isValidPassword: false,
                        })
                  }
                  required
                />
              </label>
            </div>
            <button
              className='rounded-md bg-orange-500 text-white py-2 disabled:opacity-50'
              disabled={!(userName.length != 0 && password.length != 0)}
            >
              ログイン
            </button>
          </form>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
