import Background from '~/components/Background';
import  Head  from 'expo-router/head';
import CourseList from '~/components/Courses/CourseList';

const Courses = () => {
  return (
    <Background>
      <Head>
        <title>Courses | Nawaia</title>
        <meta name="description" content="Explore our available courses." />
        <meta property="og:title" content="Courses | Nawaia" />
        <meta property="og:description" content="Explore our available courses." />
      </Head>
      <CourseList></CourseList>
    </Background>
  );
};

export default Courses;
