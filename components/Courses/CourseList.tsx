import { ScrollView, View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { memo, useCallback, useEffect } from 'react';
import CourseCard from '../Reusebales/CourseCard';
import { useQueryGetCourseList } from '~/HelperFunctions/Queries/GetCourseList';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';

export interface itemCourseTypes {
  created_at: string;
  duration: string;
  genre: string;
  id: number;
  image: string;
  long_description: string;
  price: number;
  published: boolean;
  short_description: string;
  title: string;
  chapters: {
    lessons: {
      lesson_completed: {
        is_completed: boolean;
      }[];
    }[];
  }[];
}

const CourseList = () => {
  const getCompletedPercent = useCallback((item_Course: itemCourseTypes) => {
    const allLessons = item_Course.chapters.flatMap((chapter) => chapter.lessons);

    const allLessonsNum = item_Course.chapters.flatMap((chapter) => chapter.lessons).length;
    const completedLessonsNum = allLessons.filter(
      (lesson) => lesson.lesson_completed[0] ?? false
    ).length;
    const percentComplete = (completedLessonsNum / allLessonsNum) * 100;
    return percentComplete.toFixed(0);
  }, []);
  //Main Query
  const { data: courseList, refetch, isLoading } = useQueryGetCourseList();
  //Real Time
  useEffect(() => {
    const channel = supabaseClient.channel('refetch courses');
    channel
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
        refetch();
      })
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [refetch]);
  return (
    <>
      {/** Loading Indicator */}
      <LoadingAnimation show={isLoading}></LoadingAnimation>

      {courseList && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-center">
            {courseList
              .sort((a, b) => b.id - a.id)
              ?.map((itemCourse, index) => (
                <CourseCard
                  key={index}
                  is_favourite={itemCourse.user_favourites[0]?.is_favourite ?? false}
                  percentCompleted={+getCompletedPercent(itemCourse)}
                  courseItem={itemCourse}></CourseCard>
              ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default memo(CourseList);
