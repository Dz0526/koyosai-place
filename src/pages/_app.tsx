import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components/layouts/Layout';
import { DefaultSeo } from 'next-seo';
import { PositionContextProvider } from 'context/PositionContext';
import { FormUiContextProvider } from 'context/FormUiContext';
import { ClubContextProvider } from 'context/ClubContext';

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
          <Component {...pageProps} />
        </FormUiContextProvider>
      </PositionContextProvider>
    </>
  );
}

export default MyApp;
