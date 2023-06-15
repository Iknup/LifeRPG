import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import { useEffect } from 'react';
import axios from 'axios';
import { store } from '../store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   const updateResetTimer = async () => {
  //     await axios.patch('/api/task/resetTimer');
  //   };

  //   updateResetTimer();
  // }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
