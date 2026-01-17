import { View, Dimensions } from 'react-native';
import { supabaseClient } from '~/utils/supabase';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import CourseCard from '../Reusebales/CourseCard';
import { useQueryGetCourseList } from '~/HelperFunctions/Queries/GetCourseList';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Tables } from '~/utils/database.types';

export type Course = Tables<'courses'> & {
  courses_chapters: (Tables<'courses_chapters'> & {
    courses_lessons: (Tables<'courses_lessons'> & {
      courses_lessons_completed: Tables<'courses_lessons_completed'>[];
    })[];
  })[];
};

const getCompletedPercent = (item_Course: Course) => {
  const allLessons = item_Course.courses_chapters.flatMap((chapter) => chapter.courses_lessons);

  const allLessonsNum = allLessons.length;
  const completedLessonsNum = allLessons.filter(
    (lesson) => lesson.courses_lessons_completed[0] ?? false
  ).length;

  if (allLessonsNum === 0) return '0';

  const percentComplete = (completedLessonsNum / allLessonsNum) * 100;
  return percentComplete.toFixed(0);
};

const CourseList = () => {
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

  const [contWidth, setContWidth] = useState(() => Dimensions.get('window').width);
  const colNum = useMemo(
    () => (Math.floor(contWidth / 375) > 3 ? 3 : Math.floor(contWidth / 375)),
    [contWidth]
  );

  const sortedCourseList = useMemo(() => {
    if (!courseList) return [];
    return [...courseList].sort((a, b) => b.id - a.id);
  }, [courseList]);

  const renderItem: ListRenderItem<Course> = useCallback(
    ({ item }) => (
      <CourseCard
        // is_favourite={item.courses_user_favourites?.[0]?.is_favourite ?? false}
        percentCompleted={+getCompletedPercent(item)}
        courseItem={item}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Course) => item.id.toString(), []);

  return (
    <>
      {/** Loading Indicator */}
      <LoadingAnimation show={isLoading} />

      {sortedCourseList.length > 0 && (
        <View
          onLayout={(e) => setContWidth(e.nativeEvent.layout.width)}
          className="mx-auto w-[90%] md:w-2/3 ">
          <FlashList
            numColumns={colNum}
            // estimatedItemSize={450}
            estimatedItemSize={450}
            data={sortedCourseList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </View>
      )}
    </>
  );
};

export default memo(CourseList);
