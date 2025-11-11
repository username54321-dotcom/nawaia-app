import { ScrollView, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';

import { memo, useCallback, useEffect } from 'react';
import CourseCard from '../Reusebales/CourseCard';

interface itemCourseTypes {
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
  const { data: courseList, refetch } = useQuery({
    queryKey: ['Public Courses List'],

    queryFn: async () => {
      const { data } = await supabaseClient
        .from('courses')
        .select('*,chapters(lessons(lesson_completed(is_completed)))');
      return data;
    },
    staleTime: Infinity,
  });
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
    courseList && (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center">
          {courseList
            .sort((a, b) => b.id - a.id)
            ?.map((itemCourse, index) => (
              <CourseCard
                key={index}
                percentCompleted={getCompletedPercent(itemCourse)}
                courseItem={itemCourse}></CourseCard>
            ))}
        </View>
      </ScrollView>
    )
  );
};

export default memo(CourseList);
