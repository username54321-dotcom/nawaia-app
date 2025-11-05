import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Tables } from '~/utils/database.types';
import FadeIn from '../Animations/FadeIn';
import MyImage from './MyImage';
import { useRouter } from 'expo-router';

const CourseCard = ({ courseItem }: { courseItem: Tables<'courses'> }) => {
  const router = useRouter();
  // Navigate to Course
  const HandleOnPress = (CourseId: number) => {
    router.push({ pathname: `/(drawer)/(Pages)/(CoursePage)/${CourseId}` });
  };
  return (
    <FadeIn>
      <View className="   m-4 size-fit max-w-fit flex-col items-center   justify-start rounded-2xl bg-neutral-200 shadow-md shadow-slate-400">
        <MyImage
          className="m-2 rounded-b-md rounded-t-2xl  shadow-md shadow-neutral-300"
          source={{ uri: courseItem.image }}
          style={{ aspectRatio: 1, width: 350, height: 350 }}></MyImage>

        <View className=" w-full  shrink-0">
          <Text className="m-2 mr-4 self-end font-Kufi  text-2xl font-bold text-slate-700">
            {courseItem.title}
          </Text>
          <Text className="  mb-4 mt-1 line-clamp-2 h-12 max-w-[345px] self-end pl-2 pr-[12px] text-right  font-Kufi text-sm font-semibold text-slate-500 ">
            {courseItem.short_description}
          </Text>
          <Pressable
            onPress={() => HandleOnPress(courseItem.id)}
            className="relative bottom-0 m-6 mt-auto flex  items-center justify-center rounded-md bg-[#BE1E2D]  px-12 py-2 shadow-md shadow-neutral-500 transition-all duration-200 hover:scale-105 ">
            <Text className="  font-Kufi text-base font-semibold text-slate-100  ">عرض</Text>
          </Pressable>
        </View>
      </View>
    </FadeIn>
  );
};

export default CourseCard;
