import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { store } from '../store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps, session }) {
  // useEffect(() => {
  //   const updateResetTimer = async () => {
  //     await axios.patch('/api/task/resetTimer');
  //   };

  //   updateResetTimer();
  // }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
