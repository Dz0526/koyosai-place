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
        defaultTitle='Place 部活動の場所を知ろう'
        description='Place は豊田高専内の部活動の場所を見つけるための地図アプリです'
        openGraph={{
          title: 'Place 部活動の場所を知ろう',
          description:
            'Place は豊田高専内の部活動の場所を見つけるための地図アプリです',
          site_name: 'Place',
          url: '',
        }}
      />
      <ClubContextProvider>
        <PositionContextProvider>
          <FormUiContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FormUiContextProvider>
        </PositionContextProvider>
      </ClubContextProvider>
    </>
  );
}

export default MyApp;
