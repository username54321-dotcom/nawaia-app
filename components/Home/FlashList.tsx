import { Text, ScrollView, Pressable, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { useRouter } from 'expo-router';
import FadeIn from './../Animations/FadeIn';
import MyImage1 from '../Reusebales/MyImage';
import { memo, useEffect } from 'react';
import CourseCard from './../Reusebales/CourseCard';

const CourseList = () => {
  //Main Query
  const { data: courseList, refetch } = useQuery({
    queryKey: ['Public Courses List'],

    queryFn: async () => {
      const { data } = await supabaseClient.from('courses').select('*');
      return data;
    },
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
  }, []);
  return (
    courseList && (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center">
          {courseList
            .sort((a, b) => b.id - a.id)
            ?.map((itemCourse, index) => (
              <CourseCard key={index} courseItem={itemCourse}></CourseCard>
            ))}
        </View>
      </ScrollView>
    )
  );
};

export default memo(CourseList);
