import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { useEffect } from 'react';
import axios from 'axios';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const updateResetTimer = async () => {
      await axios.patch('/api/task/resetTimer');
    };

    updateResetTimer();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
