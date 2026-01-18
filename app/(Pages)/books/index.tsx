import Background from '~/components/Background';
import Head from 'expo-router/head';
import { memo } from 'react';
import BookList from '~/components/Books/BookList';

import { useTranslation } from 'react-i18next';

const Books = () => {
  const { t } = useTranslation();
  return (
    <Background>
      <Head>
        <title>{t('books_title')}</title>
        <meta name="description" content={t('books_desc')} />
        <link rel="canonical" href="https://nawaia.net/Books" />
        <meta property="og:title" content={t('books_title')} />
        <meta property="og:description" content={t('books_desc')} />
      </Head>
      <BookList></BookList>
    </Background>
  );
};

export default memo(Books);
