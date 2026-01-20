import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Text, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { AlarmClock, DollarSign } from 'lucide-react-native';
import Background from '~/components/Background';
import MyImage from '../../../components/Reusebales/MyImage';
import Content from './_components/Content';
import TextAccordion from '../../../components/Pages/[id]/TextAccordion';
import { memo, useCallback, useEffect, useState } from 'react';
import FadeIn from '~/components/Animations/FadeIn';
import TelegramButton from './../../../components/Pages/[id]/TelegramButton';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { useQueryGetCourse } from '~/HelperFunctions/Queries/GetCourse';

const CoursePage = () => {
  const [allLessonNumber, setAllLessonNumber] = useState(0);
  const [completedLessonNumber, setCompletedLessonNumber] = useState(0);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const { id }: { id: string } = useLocalSearchParams();
  // Get Course Percent Completed
  const getCompletedPercent = useCallback((item_Course: typeof courseData) => {
    if (item_Course) {
      const allLessons = item_Course.courses_chapters.flatMap((chapter) => chapter.courses_lessons);

      const allLessonsNum = item_Course.courses_chapters.flatMap(
        (chapter) => chapter.courses_lessons
      ).length;
      const completedLessonsNum = allLessons.filter(
        (lesson) => lesson.courses_lessons_completed[0] ?? false
      ).length;
      const percentComplete = (completedLessonsNum / allLessonsNum) * 100;
      return percentComplete.toFixed(0);
    }
  }, []);
  // Course Query
  const { data: courseData, refetch, status, isLoading } = useQueryGetCourse(+id);

  // Track Percentage of Lessons Completed
  useEffect(() => {
    if (courseData) {
      const allLessons = [
        ...courseData.courses_chapters.map((chapters) => [
          ...chapters.courses_lessons.map((lessons) => [
            ...lessons.courses_lessons_completed.map((completed) => completed.is_completed),
          ]),
        ]),
      ].flat();

      const allLessonNumber = allLessons.length;
      setAllLessonNumber(allLessonNumber);
      const completedLessonNumber = allLessons.filter((lesson) => lesson[0] ?? false).length;
      setCompletedLessonNumber(completedLessonNumber);
      const percentCompleted = (completedLessonNumber / allLessonNumber) * 100;
      setPercentCompleted(+percentCompleted.toFixed(0));
    }
  }, [courseData]);

  // Realtime
  useFocusEffect(() => {
    const a = supabaseClient
      .channel('courses')
      .on('postgres_changes', { table: 'courses', schema: 'public', event: '*' }, () => refetch())
      .subscribe();
    const b = supabaseClient
      .channel('chapters')
      .on('postgres_changes', { table: 'courses_chapters', schema: 'public', event: '*' }, () =>
        refetch()
      )
      .subscribe();
    const c = supabaseClient
      .channel('lessons')
      .on('postgres_changes', { table: 'courses_lessons', schema: 'public', event: '*' }, () =>
        refetch()
      )
      .subscribe();
    const d = supabaseClient
      .channel('links')
      .on('postgres_changes', { table: 'courses_links', schema: 'public', event: '*' }, () =>
        refetch()
      )
      .subscribe();
    const e = supabaseClient
      .channel('notes')
      .on('postgres_changes', { table: 'courses_notes', schema: 'public', event: '*' }, () =>
        refetch()
      )
      .subscribe();
    const f = supabaseClient
      .channel('lesson_completed')
      .on(
        'postgres_changes',
        { table: 'courses_lessons_completed', schema: 'public', event: '*' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(a);
      supabaseClient.removeChannel(b);
      supabaseClient.removeChannel(c);
      supabaseClient.removeChannel(d);
      supabaseClient.removeChannel(e);
      supabaseClient.removeChannel(f);
    };
  });

  //Add to History
  useEffect(() => {
    const seenBefore = courseData?.courses_user_history.length !== 0;
    const addToHistory = async () => {
      !seenBefore &&
        (await supabaseClient.from('courses_user_history').insert({ course_id: courseData.id }));
    };
    addToHistory();
  }, [courseData?.id, courseData?.courses_user_history.length]);

  return (
    <>
      <Background>
        {courseData?.title && (
          <Head>
            <title>{courseData.title} | Nawaia</title>
            <meta
              name="description"
              content={courseData.short_description ?? `Course: ${courseData.title}`}
            />
            <link rel="canonical" href={`https://nawaia.net/course?id=${id}`} />
            <meta property="og:title" content={`${courseData.title} | Nawaia`} />
            <meta
              property="og:description"
              content={courseData.short_description ?? `Course: ${courseData.title}`}
            />
            <meta property="og:image" content={courseData.cover_image} />
            <meta property="og:type" content="video.course" />
            <meta property="og:url" content={`https://nawaia.net/course?id=${id}`} />
            <script type="application/ld+json">
              {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Course',
                name: courseData.title,
                description: courseData.short_description,
                provider: {
                  '@type': 'Organization',
                  name: 'Nawaia',
                  sameAs: 'https://nawaia.net',
                },
                image: courseData.cover_image,
                offers: {
                  '@type': 'Offer',
                  price: courseData.price,
                  priceCurrency: 'SAR',
                },
              })}
            </script>
          </Head>
        )}
        {/** Loading Indicator */}
        <LoadingAnimation show={isLoading}></LoadingAnimation>
        {courseData && id && status === 'success' && (
          <FadeIn>
            <View className="mx-auto w-full max-w-[1000px] flex-1 flex-col items-center justify-start ">
              <Text className="mt-4 font-Kufi text-2xl font-semibold">{courseData.title}</Text>
              {/**Image and Completion Container */}
              <View className="flex-col  items-center justify-center">
                <MyImage
                  className="m-2 mt-4 self-center overflow-hidden rounded-md shadow-md shadow-neutral-300"
                  source={{ uri: courseData.cover_image }}
                  accessibilityLabel={courseData.title}
                  style={{ aspectRatio: 1, width: 350, maxWidth: 600 }}
                  percentCompleted={+(getCompletedPercent(courseData) ?? 0)}></MyImage>
              </View>

              <View className="m-2 flex  flex-row-reverse items-center justify-center transition-all duration-200">
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl border-[1px] border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  <DollarSign size={18} color={'#404040'} />
                  <Text className=" mr-1 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {courseData.price} ر.س
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center rounded-xl  border-[1px] border-slate-400 px-4 py-2  transition-all duration-200 hover:scale-105 hover:bg-slate-200   ">
                  <AlarmClock size={18} color={'#404040'} />
                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600 ">
                    {courseData.duration}
                  </Text>
                </View>
                <View className="ml-2 size-fit flex-row-reverse items-center justify-center  rounded-xl border-[1px]   border-slate-400 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-slate-200 ">
                  {/* {GenreIcons[courseData.genre]} */}

                  <Text className=" mr-2 translate-y-[2px] font-Kufi text-xs font-semibold text-neutral-600  ">
                    {courseData.genre}
                  </Text>
                </View>
              </View>
              <TelegramButton
                telegramLink={courseData.courses_telegram_links?.telegram_link}></TelegramButton>
              <TextAccordion
                shortDescription={courseData.short_description}
                longDescription={courseData.long_description}></TextAccordion>

              <Content
                refetch={refetch}
                // courseId={courseData.id}
                chaptersData={courseData.courses_chapters}></Content>
            </View>
          </FadeIn>
        )}
      </Background>
    </>
  );
};

export default memo(CoursePage);
