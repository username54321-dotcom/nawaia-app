import Background from '~/components/Background';
import Head from 'expo-router/head';
import CourseList from '~/components/Courses/CourseList';

import { useTranslation } from 'react-i18next';

const Courses = () => {
  const { t } = useTranslation();
  return (
    <Background>
      <Head>
        <title>{t('courses_title')}</title>
        <meta name="description" content={t('courses_desc')} />
        <meta name="keywords" content={t('courses_keywords')} />
        <link rel="canonical" href="https://nawaia.net/courses" />
        <meta property="og:title" content={t('courses_title')} />
        <meta property="og:description" content={t('courses_desc')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nawaia.net/courses" />
        <meta property="og:image" content="https://nawaia.net/favicon.png" />
        <meta name="twitter:title" content={t('courses_title')} />
        <meta name="twitter:description" content={t('courses_desc')} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://nawaia.net/' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'دورات',
                item: 'https://nawaia.net/courses',
              },
            ],
          })}
        </script>
      </Head>
      <CourseList></CourseList>
    </Background>
  );
};

export default Courses;
