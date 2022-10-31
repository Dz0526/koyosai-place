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
  const [form, setForm] = useState<LoginRequest>({
    username: '',
    password: '',
  });
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
      params.append('username', form.username);
      params.append('password', form.password);

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
              {!validateUiState.isValidUsername && (
                <p className='text-sm text-red-500'>必須です！</p>
              )}
              <label>
                <span className='font-bold text-sm'>展示名</span>
                <input
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
                />
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
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
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
              disabled={
                !(form.username.length != 0 && form.password.length != 0)
              }
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
