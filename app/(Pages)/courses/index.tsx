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
        <link rel="canonical" href="https://nawaia.net/courses" />
        <meta property="og:title" content={t('courses_title')} />
        <meta property="og:description" content={t('courses_desc')} />
      </Head>
      <CourseList></CourseList>
    </Background>
  );
};

export default Courses;
