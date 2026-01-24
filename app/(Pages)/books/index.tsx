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
        <meta name="keywords" content={t('books_keywords')} />
        <link rel="canonical" href="https://nawaia.net/books" />
        <meta property="og:title" content={t('books_title')} />
        <meta property="og:description" content={t('books_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nawaia.net/books" />
        <meta property="og:image" content="https://nawaia.net/favicon.png" />
        <meta name="twitter:title" content={t('books_title')} />
        <meta name="twitter:description" content={t('books_desc')} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://nawaia.net/' },
              { '@type': 'ListItem', position: 2, name: 'كتب', item: 'https://nawaia.net/books' },
            ],
          })}
        </script>
      </Head>
      <BookList></BookList>
    </Background>
  );
};

export default memo(Books);
