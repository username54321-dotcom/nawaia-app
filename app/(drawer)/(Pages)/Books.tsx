import Background from '~/components/Background';
import Head from 'expo-router/head';
import { memo } from 'react';
import BookList from '~/components/Books/BookList';

const Books = () => {
  return (
    <Background>
      <Head>
        <title>Books | Nawaia</title>
        <meta name="description" content="Explore our collection of books." />
        <link rel="canonical" href="https://nawaia.net/Books" />
        <meta property="og:title" content="Books | Nawaia" />
        <meta property="og:description" content="Explore our collection of books." />
      </Head>
      <BookList></BookList>
    </Background>
  );
};

export default memo(Books);
