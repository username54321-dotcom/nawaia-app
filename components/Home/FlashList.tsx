import { Text, Image, ScrollView, Pressable, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import { useRouter } from 'expo-router';
import FadeIn from './../Animations/FadeIn';
import MyImage1 from '../Reusebales/MyImage';
import { memo } from 'react';

const CourseList = () => {
  const router = useRouter();
  const HandleOnPress = (CourseId: number) => {
    router.push({ pathname: `/(drawer)/(Pages)/(CoursePage)/${CourseId}` });
  };
  const { data: courseList } = useQuery({
    queryKey: ['Public Courses List'],

    queryFn: async () => {
      const { data } = await supabaseClient
        .from('courses')
        .select('id,title, image, short_description ');
      return data;
    },
  });

  return (
    courseList && (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-center">
          {courseList?.map((item_course, index) => (
            <View key={index}>
              <FadeIn>
                <View className="   m-4 size-fit max-w-fit flex-col items-center   justify-start rounded-2xl bg-neutral-200 shadow-md shadow-slate-400">
                  <MyImage1
                    className="m-2 rounded-b-md rounded-t-2xl  shadow-md shadow-neutral-300"
                    source={{ uri: item_course.image }}
                    style={{ aspectRatio: 1, width: 350, height: 350 }}></MyImage1>

                  <View className=" w-full  shrink-0">
                    <Text className="m-2 mr-4 self-end font-Kufi  text-2xl font-bold text-slate-700">
                      {item_course.title}
                    </Text>
                    <Text className="  mb-4 mt-1 line-clamp-2 h-12 max-w-[345px] self-end pl-2 pr-[12px] text-right  font-Kufi text-sm font-semibold text-slate-500 ">
                      {item_course.short_description}
                    </Text>
                    <Pressable
                      onPress={() => HandleOnPress(item_course.id)}
                      className="relative bottom-0 m-6 mt-auto flex  items-center justify-center rounded-md bg-[#BE1E2D]  px-12 py-2 shadow-md shadow-neutral-500 transition-all duration-200 hover:scale-105 ">
                      <Text className="  font-Kufi text-base font-semibold text-slate-100  ">
                        عرض
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </FadeIn>
            </View>
          ))}
        </View>
      </ScrollView>
    )
  );
};

export default memo(CourseList);
