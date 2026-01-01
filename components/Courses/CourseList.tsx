import { View } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { memo, useCallback, useEffect, useState } from 'react';
import CourseCard from '../Reusebales/CourseCard';
import { useQueryGetCourseList } from '~/HelperFunctions/Queries/GetCourseList';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { FlashList } from '@shopify/flash-list';
import { Tables } from '~/utils/database.types';

// export interface itemCourseTypes {
//   created_at: string;
//   duration: string;
//   genre: string;
//   id: number;
//   image: string;
//   long_description: string;
//   price: number;
//   published: boolean;
//   short_description: string;
//   title: string;
//   chapters: {
//     lessons: {
//       lesson_completed: {
//         is_completed: boolean;
//       }[];
//     }[];
//   }[];
// }
export type Course = Tables<'courses'> & {
  courses_chapters: (Tables<'courses_chapters'> & {
    courses_lessons: (Tables<'courses_lessons'> & {
      courses_lessons_completed: Tables<'courses_lessons_completed'>[];
    })[];
  })[];
};

const CourseList = () => {
  const getCompletedPercent = useCallback((item_Course: Course) => {
    const allLessons = item_Course.courses_chapters.flatMap((chapter) => chapter.courses_lessons);

    const allLessonsNum = item_Course.courses_chapters.flatMap(
      (chapter) => chapter.courses_lessons
    ).length;
    const completedLessonsNum = allLessons.filter(
      (lesson) => lesson.courses_lessons_completed[0] ?? false
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

  const [contWidth, setContWidth] = useState(0);
  const colNum = Math.floor(contWidth / 375) > 3 ? 3 : Math.floor(contWidth / 375);
  return (
    <>
      {/** Loading Indicator */}
      <LoadingAnimation show={isLoading}></LoadingAnimation>

      {courseList && (
        <>
          <View
            onLayout={(e) => setContWidth(e.nativeEvent.layout.width)}
            className="mx-auto w-[90%] md:w-2/3 ">
            <FlashList
              numColumns={colNum}
              data={courseList.sort((a, b) => b.id - a.id)}
              renderItem={({ item, index }) => (
                <CourseCard
                  key={index}
                  is_favourite={item.courses_user_favourites[0]?.is_favourite ?? false}
                  percentCompleted={+getCompletedPercent(item)}
                  courseItem={item}></CourseCard>
              )}></FlashList>
          </View>
        </>
      )}
    </>
  );
};

export default memo(CourseList);
