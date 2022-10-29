import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { PositionContextProvider } from 'context/PositionContext';
import { FormUiContextProvider } from 'context/FormUiContext';
import { ExihibitModalContextProvider } from 'context/ExihibitModalContext';
import { ExihibitContextProvider } from 'context/ExihibitContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        defaultTitle='KoyoFes Navi 展示の場所を知ろう'
        description='KoyoFes Navi は豊田高専こうよう祭の展示の場所を見つけるための地図アプリです'
        openGraph={{
          title: 'KoyoFes Navi 展示の場所を知ろう',
          description:
            'KoyoFes Navi は豊田高専こうよう祭の展示の場所を見つけるための地図アプリです',
          site_name: 'Place',
          url: '',
        }}
      />
      <PositionContextProvider>
        <FormUiContextProvider>
          <ExihibitModalContextProvider>
            <ExihibitContextProvider>
              <div className='flex flex-col h-full'>
                <div className='grow'>
                  <Component {...pageProps} />
                </div>
                <footer className='text-center border-t mt-3'>
                  <p>Copyright © Koyosai2022</p>
                </footer>
              </div>
            </ExihibitContextProvider>
          </ExihibitModalContextProvider>
        </FormUiContextProvider>
      </PositionContextProvider>
    </>
  );
}

export default MyApp;
